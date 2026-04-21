import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Briefcase, Minus, Headphones, Paperclip, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ChatBot = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const isRecruiter = location.pathname.startsWith('/recruiter');
  
  const getInitialMessage = () => {
    if (isRecruiter) {
      return { id: 1, text: "Xin chào! Tôi là Admin hỗ trợ nhà tuyển dụng. Bạn cần hỗ trợ về đăng tin, hay quản lý ứng viên?", sender: 'bot', timestamp: new Date() };
    }
    return { id: 1, text: "Xin chào! Tôi là trợ lý ảo PTIT Jobs. Tôi có thể giúp gì cho bạn hôm nay?", sender: 'bot', timestamp: new Date() };
  };

  const [messages, setMessages] = useState([getInitialMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = ''; // Reset input

    const newUserMessage = {
      id: messages.length + 1,
      text: `${file.name}`,
      sender: 'user',
      isFile: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Mock analysis response
    setTimeout(() => {
      const botResponseText = `Cảm ơn bạn đã tải lên CV: **${file.name}**!\n\nDựa trên phân tích kỹ năng, tôi thấy bạn rất tiềm năng. Đây là lộ trình học tập & phát triển tôi thiết kế riêng cho định hướng Web Developer của bạn:\n\n[ROADMAP] Nâng cao ReactJS, Học thêm Node.js cốt lõi, Tìm hiểu Kiến trúc Microservices, Luyện tập thuật toán phỏng vấn [/ROADMAP]\n\nBạn có muốn tôi tìm một số việc làm phù hợp với lộ trình này không?`;
      
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      scrollToBottom();
      setIsTyping(false);
    }, 2500);
  };

  // const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitProgrammaticMessage = (textMessage) => {
    const newUserMessage = {
      id: messages.length + 1,
      text: textMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponseText = "Tuyệt vời, hệ thống đã nộp kết quả của bạn thành công!";
      const newBotMessage = { id: messages.length + 2, text: botResponseText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, newBotMessage]);
      scrollToBottom();
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Mock response logic
    setTimeout(() => {
      let botResponseText = "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể thử hỏi về 'tìm việc', 'lương', hoặc 'liên hệ' không?";
      const lowerInput = newUserMessage.text.toLowerCase();

      if (isRecruiter) {
        // Recruiter-specific responses
        if (lowerInput.includes('đăng tin') || lowerInput.includes('post')) {
          botResponseText = "Để đăng tin, bạn có thể vào Quản lý tin → Đăng tin mới. Tin sẽ được duyệt trong 24h. Cần hỗ trợ thêm không?";
        } else if (lowerInput.includes('ứng viên') || lowerInput.includes('cv')) {
          botResponseText = "Bạn có thể xem danh sách ứng viên trong mục Quản lý tin → chọn tin → Xem ứng viên. Có thể lọc theo trạng thái!";
        } else if (lowerInput.includes('liên hệ') || lowerInput.includes('hotline')) {
          botResponseText = "Hotline hỗ trợ NTD: 1900 9999. Email: recruiter@ptitjobs.vn. Thời gian: 8h-22h hàng ngày.";
        } else if (lowerInput.includes('xin chào') || lowerInput.includes('hi') || lowerInput.includes('hello')) {
          botResponseText = "Chào bạn! Tôi sẵn sàng hỗ trợ bạn về tuyển dụng. Bạn cần tư vấn gì?";
        } else {
          botResponseText = "Tôi có thể hỗ trợ về: đăng tin, quản lý ứng viên, hoặc liên hệ hotline. Bạn cần gì?";
        }
      } else {
        // Candidate responses
        if (lowerInput.includes('tìm việc') || lowerInput.includes('job') || lowerInput.includes('công việc')) {
          botResponseText = "Tôi có thể giúp bạn tìm việc! Bạn đang quan tâm đến vị trí nào? (Developer, Designer, Marketing...)";
        } else if (lowerInput.includes('lộ trình') || lowerInput.includes('roadmap') || lowerInput.includes('học')) {
          botResponseText = "Đây là lộ trình mẫu tôi thiết kế tự động cho bạn bằng Generative UI:\n\n[ROADMAP] JavaScript Cơ bản, ReactJS & Tailwind, Tối ưu Web Performance, Giải thuật & Phỏng vấn [/ROADMAP]\n\nBạn muốn bắt đầu từ mốc nào?";
        } else if (lowerInput.includes('lương') || lowerInput.includes('salary')) {
          botResponseText = "Mức lương cho các vị trí phổ biến hiện tại dao động từ 10 - 30 triệu VNĐ tùy vào kinh nghiệm.";
        } else if (lowerInput.includes('liên hệ') || lowerInput.includes('contact')) {
          botResponseText = "Bạn có thể liên hệ với chúng tôi qua email: contact@ptitjobs.vn hoặc hotline: 1900 1234.";
        } else if (lowerInput.includes('xin chào') || lowerInput.includes('hi') || lowerInput.includes('hello')) {
          botResponseText = "Chào bạn! Gõ chữ 'lộ trình', 'quiz', hoặc 'code' để trải nghiệm các Component React trực tiếp trong chat nhé!";
        } else if (lowerInput.includes('quiz') || lowerInput.includes('trắc nghiệm')) {
          botResponseText = "Được thôi, cùng khởi động với câu hỏi này nhé:\n\n[QUIZ] Trong React, Hook nào được dùng để quản lý State? | useEffect | useMemo | useState | useContext [/QUIZ]";
        } else if (lowerInput.includes('code') || lowerInput.includes('thử thách') || lowerInput.includes('bài tập')) {
          botResponseText = "Tuyệt. Hãy hoàn thành bài tập ngay trong khung giao diện dưới đây:\n\n[CODE_EDITOR] Viết hàm isPalindrome(str) trả về true nếu chuỗi đối xứng. | javascript [/CODE_EDITOR]";
        }
      }

      const newBotMessage = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
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
                 <button key={i} onClick={() => submitProgrammaticMessage(`Tôi chọn phương án ${letter}:\n${opt}`)} className="text-left w-full items-center gap-3 p-2 bg-white border border-green-100 rounded-lg cursor-pointer hover:bg-green-100 hover:border-green-300 transition-all font-sans">
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
                 submitProgrammaticMessage(`Bài giải của tôi bằng ${lang}:\n\n${textarea.value.trim()}`);
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
               <button onClick={onToggle} className="p-1 hover:bg-white/20 rounded-full transition-colors" title="Minimize">
                <Minus size={18} />
              </button>
              <button onClick={onToggle} className="p-1 hover:bg-white/20 rounded-full transition-colors" title="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
                    <div className="text-sm leading-relaxed whitespace-pre-line break-words">{renderMessageContent(msg.text)}</div>
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
