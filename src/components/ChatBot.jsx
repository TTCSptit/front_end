import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Briefcase, Minus, Headphones } from 'lucide-react';
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

  // const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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
        } else if (lowerInput.includes('lương') || lowerInput.includes('salary')) {
          botResponseText = "Mức lương cho các vị trí phổ biến hiện tại dao động từ 10 - 30 triệu VNĐ tùy vào kinh nghiệm.";
        } else if (lowerInput.includes('liên hệ') || lowerInput.includes('contact')) {
          botResponseText = "Bạn có thể liên hệ với chúng tôi qua email: contact@ptitjobs.vn hoặc hotline: 1900 1234.";
        } else if (lowerInput.includes('xin chào') || lowerInput.includes('hi') || lowerInput.includes('hello')) {
          botResponseText = "Chào bạn! Chúc bạn một ngày tốt lành. Cần tôi giúp tìm job ngon không?";
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
                  <p className="text-sm leading-relaxed">{msg.text}</p>
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
