import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Send, Paperclip, Smile, MoreVertical, 
  CheckCheck, Phone, Video, Search as SearchIcon,
  ImageIcon, FileText, User, Bot, Headphones,
  ArrowLeft, Filter, Circle, MessageSquare
} from 'lucide-react';
import { getConversations, getChatMessages, sendMessage } from '../services/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const MessagingPage = ({ role }) => {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tìm cuộc trò chuyện đang hoạt động (dùng String để so sánh ID an toàn)
  const activeChat = conversations.find(c => String(c.id) === String(activeId));

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations(); console.log('DEBUG_DATA:', data); const contactIdFromUrl = searchParams.get('contact'); console.log('DEBUG_URL_ID:', contactIdFromUrl);
        if (data && Array.isArray(data)) {
          const mapped = data.map(c => ({
            ...c,
            avatar: (c.name || "U").charAt(0),
            online: true,
            messages: []
          }));
          setConversations(mapped);
          
          // Xử lý contact từ URL ngay sau khi load xong danh sách
          const contactId = searchParams.get('contact');
          if (contactId) {
            const existing = mapped.find(c => String(c.id) === String(contactId));
            if (existing) {
              setActiveId(existing.id);
            } else {
              const newTemp = {
                id: contactId,
                name: "Ứng viên mới",
                avatar: "C",
                lastMessage: "Bắt đầu nhắn tin...",
                time: "Now",
                unread: 0,
                online: true,
                messages: []
              };
              setConversations(prev => [newTemp, ...mapped]);
              setActiveId(contactId);
            }
          } else if (mapped.length > 0) {
            setActiveId(mapped[0].id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [searchParams]);

  useEffect(() => {
    if (activeId) {
      const fetchMessages = async () => {
        try {
          const data = await getChatMessages(activeId);
          if (data && Array.isArray(data)) {
            setMessages(data);
          } else {
            setMessages([]);
          }
        } catch (err) {
          console.error(err);
          setMessages([]);
        }
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [activeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeId) return;

    try {
      const sentMsg = await sendMessage(activeId, message);
      setMessages([...messages, sentMsg]);
      setMessage("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-ptit-red border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Đang tải tin nhắn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-slate-50 to-blue-50 p-4 md:p-6 lg:p-10 font-sans">
      <div className="container mx-auto h-[800px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-white/60 flex relative">
        {/* Sidebar */}
        <div className="w-full md:w-[380px] lg:w-[420px] border-r border-white/40 flex flex-col bg-white/40 relative z-10">
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight font-heading">Messages</h1>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ptit-red transition-all duration-300" size={18} />
              <input 
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border border-gray-100 focus:border-red-200 focus:ring-4 focus:ring-red-50/50 outline-none text-sm font-medium transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8 space-y-2 mt-4">
            {conversations
              .filter(c => (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chat) => {
                const isActive = String(activeId) === String(chat.id);
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveId(chat.id)}
                    className={`w-full p-4 flex gap-4 rounded-3xl transition-all duration-500 relative group ${
                      isActive 
                        ? 'bg-white shadow-[0_10px_40px_-10px_rgba(239,68,68,0.15)] border border-red-50/50' 
                        : 'hover:bg-white/60 hover:shadow-sm'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 ${
                        isActive ? 'from-ptit-red to-red-400 shadow-red-200' : 'from-gray-700 to-gray-500 shadow-gray-200'
                      }`}>
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 text-left min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-bold text-gray-900 truncate font-heading transition-colors ${isActive ? 'text-ptit-red' : ''}`}>
                          {chat.name}
                        </h3>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                          {chat.time || 'NOW'}
                        </span>
                      </div>
                      <p className={`text-xs truncate font-medium ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                    {isActive && (
                      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-10 bg-ptit-red rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-transparent relative z-10">
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-ptit-red border border-gray-50 animate-bounce-slow">
                <MessageSquare size={50} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 font-heading mb-2">Your Conversations</h2>
                <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">Select a candidate or recruiter from the left to start a professional conversation.</p>
              </div>
              <button className="px-8 py-3 bg-white text-gray-600 font-bold rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95">
                New Message
              </button>
            </div>
          ) : (
            <>
              {/* Top Bar */}
              <div className="h-28 bg-white/60 backdrop-blur-md border-b border-white/50 px-10 flex items-center justify-between z-20">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg bg-gradient-to-br ${
                    String(activeChat.id).length > 5 ? 'from-ptit-red to-red-400 shadow-red-100' : 'from-gray-700 to-gray-500 shadow-gray-200'
                  }`}>
                    {activeChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl font-heading leading-tight">{activeChat.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
              >
                {messages.map((msg, index) => {
                  const myEmail = sessionStorage.getItem('userEmail');
                  const myId = sessionStorage.getItem('userId');
                  const finalIsMine = myEmail 
                    ? msg.senderEmail === myEmail 
                    : myId 
                      ? String(msg.senderId) === String(myId)
                      : String(msg.senderId) !== String(activeId);
                  
                  const showTime = true; // Could optimize to show only if time difference is large

                  return (
                    <div key={msg.id} className={`flex ${finalIsMine ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                      <div className={`max-w-[75%] group ${finalIsMine ? 'items-end' : 'items-start'} flex flex-col gap-3`}>
                        <div className={`relative px-7 py-4 rounded-[2rem] text-[15px] leading-relaxed shadow-md transition-all group-hover:shadow-lg ${
                          finalIsMine 
                            ? 'bg-gradient-to-br from-ptit-red to-red-500 text-white rounded-tr-none shadow-red-100' 
                            : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-gray-100'
                        }`}>
                          {msg.message}
                          {finalIsMine && (
                            <div className="absolute bottom-1 right-2 text-[10px] text-white/50">
                              <CheckCheck size={12} />
                            </div>
                          )}
                        </div>
                        {showTime && (
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white/60 backdrop-blur-md border-t border-white/50">
                <form onSubmit={handleSend} className="flex items-center gap-4">
                  <div className="flex-1 relative group">
                    <input 
                      type="text"
                      placeholder="Write your message..."
                      className="w-full pl-6 pr-16 py-5 bg-white rounded-3xl border border-gray-100 focus:border-red-200 focus:ring-8 focus:ring-red-50/30 outline-none text-[15px] font-medium transition-all shadow-sm"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!message.trim()}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all active:scale-90 ${
                        message.trim() 
                          ? 'bg-ptit-red text-white shadow-xl shadow-red-200' 
                          : 'bg-gray-100 text-gray-300'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
