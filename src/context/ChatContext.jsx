import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { chatWithAiStream, getAiChatHistory } from '../services/aiService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Persistence helpers
  const getStored = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) { return fallback; }
  };

  const [messages, setMessages] = useState(() => getStored('chat_messages', []));
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => "SESSION-" + Math.random().toString(36).substr(2, 9));
  const [cvId, setCvId] = useState(null);
  
  const [dashboardData, setDashboardData] = useState(() => getStored('chat_dashboard', {
    candidate_info: { name: "Chưa rõ", email: "Chưa rõ" },
    matching_score: 0,
    extracted_skills: [],
    missing_skills: []
  }));

  const [radarData, setRadarData] = useState(() => getStored('chat_radar', {
    labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Soft Skills'],
    datasets: [{
      label: 'Cấp độ kỹ năng',
      data: [0, 0, 0, 0, 0],
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: '#ef4444',
      pointBackgroundColor: '#ef4444',
    }]
  }));

  const currentBotMsgIdRef = useRef(null);
  const currentBotContentRef = useRef("");

  // Load history once on mount
  useEffect(() => {
    loadHistory();

    const handleAuthChange = () => {
      console.log("Auth changed, reloading history...");
      const userId = sessionStorage.getItem('userEmail');
      if (!userId) {
        // User logged out, clear local cache
        localStorage.removeItem('chat_messages');
        localStorage.removeItem('chat_dashboard');
        localStorage.removeItem('chat_radar');
        setMessages([]);
        setDashboardData({
          candidate_info: { name: "Chưa rõ", email: "Chưa rõ" },
          matching_score: 0,
          extracted_skills: [],
          missing_skills: []
        });
        setRadarData({
          labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Soft Skills'],
          datasets: [{
            label: 'Cấp độ kỹ năng',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: '#ef4444',
            pointBackgroundColor: '#ef4444',
          }]
        });
      }
      loadHistory();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chat_dashboard', JSON.stringify(dashboardData));
  }, [dashboardData]);

  useEffect(() => {
    localStorage.setItem('chat_radar', JSON.stringify(radarData));
  }, [radarData]);

  const loadHistory = async () => {
    const userId = sessionStorage.getItem('userEmail') || 'guest';
    try {
      const history = await getAiChatHistory(userId);
      if (history && Array.isArray(history) && history.length > 0) {
        const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const mappedHistory = sortedHistory.map(m => {
          // Xử lý linh hoạt các case của thuộc tính JSON từ Backend
          const rawData = m.aiDataJson || m.AiDataJson || m.ai_data_json;
          let parsedData = null;
          try {
            parsedData = rawData ? (typeof rawData === 'string' ? JSON.parse(rawData) : rawData) : null;
          } catch (e) {
            console.error("Failed to parse AI data JSON:", e);
          }

          return {
            id: `hist-${m.id}`,
            text: m.message,
            sender: m.role === 'user' ? 'user' : 'bot',
            timestamp: new Date(m.timestamp),
            aiData: parsedData
          };
        });

        // Tìm tin nhắn cuối cùng có chứa dữ liệu AI để hiển thị Dashboard
        const lastDataMsg = [...mappedHistory].reverse().find(m => 
          m.aiData && (m.aiData.matching_score !== undefined || m.aiData.skill_matrix || m.aiData.matchingScore)
        );
        
        if (lastDataMsg) {
          updateDashboard(lastDataMsg.aiData);
        }

        setMessages(mappedHistory);
      }
    } catch (err) {
      console.error("Failed to load AI chat history:", err);
    }
  };

  const updateDashboard = (newAiData) => {
    if (!newAiData) return;
    
    // Đồng bộ xử lý cả object và chuỗi JSON
    const data = typeof newAiData === 'string' ? JSON.parse(newAiData) : newAiData;
    
    // Chuẩn hóa tên trường giữa các phiên bản model
    const info = data.candidate_info || data.candidateInfo || {};
    const score = data.matching_score !== undefined ? data.matching_score : (data.matchingScore || 0);
    const extracted = data.extracted_skills || data.extractedSkills || [];
    const missing = data.missing_skills || data.missingSkills || [];
    const skills = data.skill_matrix || data.skillMatrix;

    setDashboardData(prev => ({
      ...prev,
      matching_score: score,
      candidate_info: {
        name: info.name || prev.candidate_info.name,
        email: info.email || prev.candidate_info.email
      },
      extracted_skills: extracted,
      missing_skills: missing
    }));

    if (skills) {
      const labels = Object.keys(skills);
      const dataValues = Object.values(skills);
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

  const sendMessage = async (textMessage, overrideCvId = null) => {
    if (!textMessage?.trim()) return;
    
    const currentCvId = overrideCvId || cvId;
    const userId = sessionStorage.getItem('userEmail') || 'guest';

    const newUserMessage = {
      id: Date.now(),
      text: textMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    const botMsgId = Date.now() + 1;
    currentBotMsgIdRef.current = botMsgId;
    currentBotContentRef.current = '';
    
    setMessages(prev => [...prev, { 
      id: botMsgId, 
      text: '', 
      statusText: 'Đang kết nối AI...', 
      sender: 'bot', 
      timestamp: new Date() 
    }]);
    
    try {
      const stream = await chatWithAiStream(textMessage, sessionId, userId, null, currentCvId);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';
      
      let isReadingData = false;
      let aiDataJsonString = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          
          const lines = buffer.split('\n');
          // Giữ lại phần chưa hoàn chỉnh
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const rawDataStr = line.substring(6);
              const dataStrTrimmed = rawDataStr.trim();
              
              if (dataStrTrimmed === '[DONE]') {
                done = true;
                break;
              }
              if (dataStrTrimmed === '---DATA---') {
                isReadingData = true;
                continue;
              }
              
              if (isReadingData) {
                aiDataJsonString += rawDataStr;
              } else {
                // Parse newline từ chuỗi thoát
                const textChunk = rawDataStr.replace(/\\n/g, '\n');
                currentBotContentRef.current += textChunk;
                
                setMessages(prev => prev.map(m =>
                  m.id === currentBotMsgIdRef.current
                    ? { ...m, text: currentBotContentRef.current, statusText: null }
                    : m
                ));
              }
            }
          }
        }
      }
      
      // Sau khi đọc xong stream, cập nhật dashboard nếu có dữ liệu json
      if (aiDataJsonString) {
        try {
          const parsed = JSON.parse(aiDataJsonString);
          updateDashboard(parsed);
        } catch (e) {
          console.error("Failed to parse ai_data_json from SSE", e);
        }
      }
      
    } catch (err) {
      console.error("Lỗi khi stream tin nhắn:", err);
      setMessages(prev => prev.map(m =>
        m.id === currentBotMsgIdRef.current
          ? { ...m, text: m.text + `\n\n(Lỗi kết nối: ${err.message})`, statusText: null }
          : m
      ));
    } finally {
      setIsTyping(false);
      currentBotMsgIdRef.current = null;
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
