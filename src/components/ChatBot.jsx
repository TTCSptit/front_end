import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, Bot, User, Briefcase, Minus, Headphones, Paperclip, FileText, Github, BarChart2, MessageCircle, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getAiSkills, createAiWebSocket, uploadCvForWs, getAiChatHistory } from '../services/aiService';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

import { useChat } from '../context/ChatContext';

const ChatBot = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const isRecruiter = location.pathname.startsWith('/recruiter');
  
  const { 
    messages, setMessages, isTyping, setIsTyping, 
    sendMessage, dashboardData, setDashboardData, 
    radarData, setRadarData, cvId, setCvId 
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState('chat'); 

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
    
    const handleOpenChat = (e) => {
      if (!isOpen) onToggle();
      if (e.detail?.message) {
        setTimeout(() => {
          sendMessage(e.detail.message);
        }, 500);
      }
    };

    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, [isOpen, onToggle]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    const fileUserMsg = {
      id: Date.now(),
      text: `📎 ${file.name}`,
      sender: 'user',
      isFile: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fileUserMsg]);
    setIsTyping(true);

    try {
      const result = await uploadCvForWs(file);
      setCvId(result.cv_id);
      sendMessage("Hãy phân tích file CV tôi vừa gửi và cho tôi lời khuyên về sự nghiệp.", result.cv_id);
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: `❌ Lỗi tải CV: ${err.message}`, 
        sender: 'bot', 
        timestamp: new Date() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const messageText = inputValue;
    setInputValue('');
    sendMessage(messageText);
  };

  const promptGithub = () => {
    const gh_url = prompt('Nhập link Github hoặc username của bạn (vd: microsoft):');
    if (gh_url) {
      processChatMessage(`Review giúp mình profile github này với: ${gh_url}`);
    }
  };

  const renderMessageContent = (text) => {
    const regex = /\[ROADMAP\]([\s\S]*?)\[\/ROADMAP\]|\[QUIZ\]([\s\S]*?)\[\/QUIZ\]|\[CODE_EDITOR\]([\s\S]*?)\[\/CODE_EDITOR\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`txt-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
      }
      
      const rmMatch = match[1];
      const qzMatch = match[2];
      const cdMatch = match[3];

      if (rmMatch) {
        const nodes = rmMatch.split(',').map(n => n.trim()).filter(Boolean);
        parts.push(
          <div key={`rm-${match.index}`} className="mt-3 mb-2 p-3 bg-red-50 border border-red-100 rounded-xl overflow-hidden shadow-sm font-sans block w-[280px]">
            <strong className="text-red-700 flex items-center gap-2 mb-2 text-sm">
               ⚡ Lộ trình cá nhân hóa:
            </strong>
            <div className="flex flex-col gap-2">
              {nodes.map((node, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-white border border-red-100 rounded-lg cursor-pointer hover:border-red-400 hover:shadow-sm transition-all" onClick={() => alert(`Tương tác: ${node}`)}>
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                  <span className="text-[13px] font-medium text-gray-700 leading-tight">{node}</span>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (qzMatch) {
         const elements = qzMatch.split('|').map(n => n.trim());
         const question = elements[0];
         const options = elements.slice(1);
         parts.push(
           <div key={`qz-${match.index}`} className="mt-3 mb-2 p-3 bg-green-50 border border-green-200 rounded-xl overflow-hidden shadow-sm font-sans block w-[280px]">
             <strong className="text-green-700 flex items-center gap-2 mb-2 text-sm">⚡ Trắc nghiệm Nhanh:</strong>
             <p className="text-sm font-medium mb-3 text-gray-800 break-words">{question}</p>
             <div className="flex flex-col gap-2">
               {options.map((opt, i) => {
                 const letter = String.fromCharCode(65 + i);
                 return (
                 <button key={i} onClick={() => sendMessage(`Tôi chọn phương án ${letter}:\n${opt}`)} className="text-left w-full items-center gap-3 p-2 bg-white border border-green-100 rounded-lg cursor-pointer hover:bg-green-100 hover:border-green-300 transition-all font-sans">
                   <span className="text-green-600 font-bold mr-2">{letter}.</span>
                   <span className="text-[13px] font-medium text-gray-700">{opt}</span>
                 </button>
               )})}
             </div>
           </div>
         );
      } else if (cdMatch) {
         const elements = cdMatch.split('|').map(n => n.trim());
         const promptText = elements[0];
         const lang = elements[1] || 'python';
         parts.push(
           <div key={`cd-${match.index}`} className="mt-3 mb-2 p-3 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-xl font-sans block w-[280px]">
             <strong className="text-gray-100 flex items-center gap-2 mb-2 text-sm">⚡ Thử thách Code ({lang})</strong>
             <p className="text-xs font-medium mb-3 text-gray-300 break-words">{promptText}</p>
             <textarea id={`code-editor-${match.index}`} className="w-full h-24 bg-black text-green-400 p-2 rounded-md text-xs font-mono outline-none border border-gray-700 mb-2 resize-none" placeholder="// Code here..."></textarea>
             <button onClick={() => {
                 const textarea = document.getElementById(`code-editor-${match.index}`);
                 if(!textarea.value.trim()) return alert('Bạn chưa viết code!');
                 sendMessage(`Bài giải của tôi bằng ${lang}:\n\n${textarea.value.trim()}`);
                 textarea.value = '';
             }} className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs font-bold transition-all shadow-md">
                Chạy Code & Nộp bài
             </button>
           </div>
         );
      }
      
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={`txt-${lastIndex}`}>{text.substring(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-100 animate-fade-in-up transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                {isRecruiter ? <Headphones size={24} className="text-white" /> : <Bot size={24} className="text-white" />}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{isRecruiter ? 'Admin Hỗ trợ' : 'PTIT Bot'}</h3>
                <span className="text-xs text-red-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="flex gap-2">
               {!isRecruiter && (
                 <button onClick={() => setActiveTab(activeTab === 'chat' ? 'dashboard' : 'chat')} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold bg-white/10">
                   {activeTab === 'chat' ? <BarChart2 size={16} /> : <MessageCircle size={16} />}
                   {activeTab === 'chat' ? 'Dashboard' : 'Chat'}
                 </button>
               )}
               <button onClick={onToggle} className="p-1 hover:bg-white/20 rounded-full transition-colors" title="Minimize">
                <Minus size={18} />
              </button>
              <button onClick={onToggle} className="p-1 hover:bg-white/20 rounded-full transition-colors" title="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
            {activeTab === 'chat' ? (
              /* Messages Area */
              <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-red-500 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                      }`}
                    >
                      {msg.isFile ? (
                        <div className="flex items-center gap-2">
                           <FileText size={16} className="text-white" />
                           <span className="text-sm font-medium underline underline-offset-2">CV: {msg.text}</span>
                        </div>
                      ) : (
                        <div className="text-sm leading-relaxed whitespace-pre-line break-words">
                          {msg.statusText && !msg.text ? (
                            <span className="text-gray-400 italic text-xs">{msg.statusText}</span>
                          ) : renderMessageContent(msg.text)}
                        </div>
                      )}
                      <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-red-100' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                 {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              /* Dashboard Area */
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 animate-fade-in">
                {/* Score Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-center gap-2">
                    <BarChart2 size={14} /> Matching Score
                  </h4>
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - dashboardData.matching_score / 100)} className="text-red-500 transition-all duration-1000" />
                    </svg>
                    <span className="absolute text-2xl font-black text-gray-800">{dashboardData.matching_score}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Tên</span>
                      <span className="text-xs font-bold truncate block">{dashboardData.candidate_info.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Email</span>
                      <span className="text-xs font-bold truncate block">{dashboardData.candidate_info.email}</span>
                    </div>
                  </div>
                </div>

                {/* Radar Chart Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[220px]">
                   <h4 className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                    <Sparkles size={14} className="text-yellow-500" /> Ma Trận Kỹ Năng
                  </h4>
                  <div className="h-full">
                    <Radar 
                      data={radarData} 
                      options={{ 
                        scales: { r: { min: 0, max: 5, ticks: { display: false } } },
                        plugins: { legend: { display: false } },
                        maintainAspectRatio: false
                      }} 
                    />
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Kỹ năng hiện có</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dashboardData.extracted_skills.length > 0 ? dashboardData.extracted_skills.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold border border-green-100">{s}</span>
                    )) : <span className="text-[10px] text-gray-400 italic">Chưa có dữ liệu</span>}
                  </div>
                  
                  <h4 className="text-xs font-bold text-gray-400 uppercase mt-4 mb-3">Cần cải thiện</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dashboardData.missing_skills.length > 0 ? dashboardData.missing_skills.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold border border-red-100">{s}</span>
                    )) : <span className="text-[10px] text-gray-400 italic">Chưa có dữ liệu</span>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-red-100 transition-all">
              {!isRecruiter && (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                    title="Đính kèm CV để phân tích"
                  >
                    <Paperclip size={18} />
                  </button>
                  <button 
                    type="button"
                    onClick={promptGithub}
                    className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                    title="Đánh giá Github"
                  >
                    <Github size={18} />
                  </button>
                </>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className={`p-2 rounded-full transition-all ${
                  inputValue.trim() 
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-md transform hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button (FAB) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="group relative flex items-center justify-center w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95 z-50"
        >
          <div className="absolute -top-3 -right-3">
             <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white"></span>
            </span>
          </div>
          <MessageSquare size={32} className="group-hover:rotate-12 transition-transform duration-300" />
          
           {/* Tooltip */}
           <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isRecruiter ? 'Chat với Admin' : 'Chat với chúng tôi'}
             <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white transform -translate-y-1/2 rotate-45"></div>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
