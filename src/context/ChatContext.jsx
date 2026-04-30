import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getAiSkills, createAiWebSocket, getAiChatHistory } from '../services/aiService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => "SESSION-" + Math.random().toString(36).substr(2, 9));
  const [cvId, setCvId] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    candidate_info: { name: "Chưa rõ", email: "Chưa rõ" },
    matching_score: 0,
    extracted_skills: [],
    missing_skills: []
  });
  const [radarData, setRadarData] = useState({
    labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Soft Skills'],
    datasets: [{
      label: 'Cấp độ kỹ năng',
      data: [0, 0, 0, 0, 0],
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: '#ef4444',
      pointBackgroundColor: '#ef4444',
    }]
  });

  const socketRef = useRef(null);
  const currentBotMsgIdRef = useRef(null);
  const currentBotContentRef = useRef("");
  const retryCountRef = useRef(0);
  const maxRetries = 5;

  // Initialize socket and load history once on mount
  useEffect(() => {
    loadHistory();
    initWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const loadHistory = async () => {
    const userId = sessionStorage.getItem('userEmail') || 'guest';
    try {
      const history = await getAiChatHistory(userId);
      if (history && Array.isArray(history) && history.length > 0) {
        const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const mappedHistory = sortedHistory.map(m => ({
          id: `hist-${m.id}`,
          text: m.message,
          sender: m.role === 'user' ? 'user' : 'bot',
          timestamp: new Date(m.timestamp),
          aiData: m.aiDataJson ? JSON.parse(m.aiDataJson) : null
        }));

        const lastDataMsg = [...mappedHistory].reverse().find(m => m.aiData && (m.aiData.matching_score !== undefined || m.aiData.skill_matrix));
        if (lastDataMsg) {
          const aiData = lastDataMsg.aiData;
          setDashboardData(aiData);
          updateSkillChart(aiData);
        }

        setMessages(mappedHistory);
      }
    } catch (err) {
      console.error("Failed to load AI chat history:", err);
    }
  };

  const initWebSocket = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;
    
    const userId = sessionStorage.getItem('userEmail') || 'guest';
    const ws = createAiWebSocket(userId);

    ws.onopen = () => {
      console.log("Global AI WebSocket Connected");
      retryCountRef.current = 0;
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action) {
        if (data.action === 'job_hunt') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: `🔔 ${data.message}`,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }
        return;
      }

      if (data.type === 'status' || data.status) {
        const statusText = data.status || data.message || '';
        if (currentBotMsgIdRef.current) {
          setMessages(prev => prev.map(m =>
            m.id === currentBotMsgIdRef.current ? { ...m, statusText, text: '' } : m
          ));
        }
        return;
      }

      if (data.type === 'content' || data.chunk !== undefined) {
        const chunk = data.content ?? data.chunk ?? '';
        currentBotContentRef.current += chunk;
        setMessages(prev => prev.map(m =>
          m.id === currentBotMsgIdRef.current
            ? { ...m, text: currentBotContentRef.current, statusText: null }
            : m
        ));
        return;
      }

      if (data.type === 'end' || data.done) {
        setIsTyping(false);
        const aiData = data.data ?? data.ai_data_json;
        if (aiData) {
          const parsed = typeof aiData === 'string' ? JSON.parse(aiData) : aiData;
          if (parsed?.matching_score !== undefined) {
            setDashboardData(parsed);
            updateSkillChart(parsed);
          }
        }
        currentBotContentRef.current = '';
        currentBotMsgIdRef.current = null;
        return;
      }
    };

    ws.onclose = () => {
      console.log("Global AI WebSocket Disconnected");
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000);
        setTimeout(initWebSocket, delay);
      }
    };

    socketRef.current = ws;
  };

  const updateSkillChart = (aiData) => {
    if (aiData.skill_matrix) {
      const labels = Object.keys(aiData.skill_matrix);
      const dataValues = Object.values(aiData.skill_matrix);
      setRadarData({
        labels: labels,
        datasets: [{
          label: 'Cấp độ kỹ năng',
          data: dataValues,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: '#ef4444',
          pointBackgroundColor: '#ef4444',
        }]
      });
    }
  };

  const sendMessage = (textMessage, overrideCvId = null) => {
    if (!textMessage?.trim()) return;
    
    const currentCvId = overrideCvId || cvId;
    const newUserMessage = {
      id: Date.now(),
      text: textMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const botMsgId = Date.now() + 1;
      currentBotMsgIdRef.current = botMsgId;
      currentBotContentRef.current = '';
      setMessages(prev => [...prev, { id: botMsgId, text: '', statusText: 'AI đang suy nghĩ...', sender: 'bot', timestamp: new Date() }]);
      
      socketRef.current.send(JSON.stringify({
        message: textMessage,
        session_id: sessionId,
        ...(currentCvId ? { cv_id: currentCvId } : {})
      }));
    } else {
      setIsTyping(false);
      initWebSocket();
      // Optionally queue message or show error
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, setMessages, isTyping, setIsTyping, 
      sendMessage, dashboardData, setDashboardData, 
      radarData, setRadarData, cvId, setCvId 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
