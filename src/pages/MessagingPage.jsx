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
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex ring-1 ring-black/5">
        
        {/* Sidebar */}
        <div className="w-full md:w-[350px] lg:w-[400px] border-r border-gray-100 flex flex-col bg-white">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Messages</h1>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ptit-red transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations
              .filter(c => (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveId(chat.id)}
                className={`w-full p-4 flex gap-4 transition-all duration-300 relative ${
                  String(activeId) === String(chat.id) 
                    ? 'bg-red-50/50 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-ptit-red' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-100 bg-gradient-to-br ${
                    String(chat.id).length > 5 ? 'from-ptit-red to-red-400' : 'from-gray-700 to-gray-500'
                  }`}>
                    {chat.avatar}
                  </div>
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-gray-900 truncate ${String(activeId) === String(chat.id) ? 'text-ptit-red' : ''}`}>
                      {chat.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 truncate font-medium">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-gray-50/30">
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare size={40} />
              </div>
              <p className="font-medium">Chọn một cuộc trò chuyện để bắt đầu</p>
            </div>
          ) : (
            <>
              {/* Top Bar */}
              <div className="h-24 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md bg-gradient-to-br ${
                    String(activeChat.id).length > 5 ? 'from-ptit-red to-red-400' : 'from-gray-700 to-gray-500'
                  }`}>
                    {activeChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{activeChat.name}</h3>
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"
              >
                {messages.map((msg, index) => {
                  const myEmail = sessionStorage.getItem('userEmail');
                  const myId = sessionStorage.getItem('userId');
                  // Ưu tiên so sánh senderEmail (từ DTO mới), fallback sang senderId
                  const finalIsMine = myEmail 
                    ? msg.senderEmail === myEmail 
                    : myId 
                      ? String(msg.senderId) === String(myId)
                      : String(msg.senderId) !== String(activeId);
                  return (
                    <div key={msg.id} className={`flex ${finalIsMine ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                      <div className={`max-w-[70%] group ${finalIsMine ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                        <div className={`relative px-6 py-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                          finalIsMine 
                            ? 'bg-ptit-red text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}>
                          {msg.message}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex items-center gap-4">
                  <div className="flex-1 relative group">
                    <input 
                      type="text"
                      placeholder="Type your message here..."
                      className="w-full pl-6 pr-14 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium transition-all"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!message.trim()}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                        message.trim() ? 'bg-ptit-red text-white shadow-lg shadow-red-100' : 'text-gray-300'
                      }`}
                    >
                      <Send size={18} />
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
