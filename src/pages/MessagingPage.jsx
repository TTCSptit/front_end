import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Send, Paperclip, Smile, MoreVertical, 
  CheckCheck, Phone, Video, Search as SearchIcon,
  Image as ImageIcon, FileText, User, Bot, Headphones,
  ArrowLeft, Filter, Circle
} from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const mockConversations = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    role: "Candidate",
    avatar: "A",
    lastMessage: "Em đã nhận được lịch phỏng vấn, em cảm ơn ạ!",
    time: "10:30 AM",
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: "Chào An, công ty đã xem CV của em và rất ấn tượng.", sender: 'recruiter', time: "Yesterday" },
      { id: 2, text: "Dạ em cảm ơn quý công ty ạ.", sender: 'user', time: "Yesterday" },
      { id: 3, text: "Bên anh muốn mời em phỏng vấn vào sáng thứ 5 tới, lúc 9:00.", sender: 'recruiter', time: "09:15 AM" },
      { id: 4, text: "Em đã nhận được lịch phỏng vấn, em cảm ơn ạ!", sender: 'user', time: "10:30 AM" },
    ]
  },
  {
    id: 2,
    name: "Công ty CP ABC",
    role: "Recruiter",
    avatar: "ABC",
    lastMessage: "Bạn vui lòng xác nhận thông tin tuyển dụng nhé.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Chào bạn, cảm ơn bạn đã quan tâm đến vị trí Senior Frontend.", sender: 'recruiter', time: "2 days ago" },
      { id: 2, text: "Bạn vui lòng xác nhận thông tin tuyển dụng nhé.", sender: 'recruiter', time: "Yesterday" },
    ]
  },
  {
    id: 3,
    name: "Lê Thị Bình",
    role: "Candidate",
    avatar: "B",
    lastMessage: "Hồ sơ của em đã đủ chưa ạ?",
    time: "Monday",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Chào Bình, hồ sơ của em còn thiếu bảng điểm kì cuối.", sender: 'recruiter', time: "Monday" },
      { id: 2, text: "Hồ sơ của em đã đủ chưa ạ?", sender: 'user', time: "Monday" },
    ]
  }
];

const MessagingPage = ({ role }) => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeChat = conversations.find(c => c.id === activeId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, activeChat.messages]);

  useEffect(() => {
    const contactId = searchParams.get('contact');
    if (contactId) {
      const id = parseInt(contactId);
      if (conversations.find(c => c.id === id)) {
        setActiveId(id);
      }
    }
  }, [searchParams]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: activeChat.messages.length + 1,
      text: message,
      sender: role === 'recruiter' ? 'recruiter' : 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: message,
          time: "Just now"
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    setMessage("");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex ring-1 ring-black/5">
        
        {/* Sidebar */}
        <div className="w-full md:w-[350px] lg:w-[400px] border-r border-gray-100 flex flex-col bg-white">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Messages</h1>
              <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-500">
                <Filter size={20} />
              </button>
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
              .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveId(chat.id)}
                className={`w-full p-4 flex gap-4 transition-all duration-300 relative ${
                  activeId === chat.id 
                    ? 'bg-red-50/50 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-ptit-red' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-100 bg-gradient-to-br ${
                    chat.avatar.length > 2 ? 'from-ptit-red to-red-400' : 'from-gray-700 to-gray-500'
                  }`}>
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-gray-900 truncate ${activeId === chat.id ? 'text-ptit-red' : ''}`}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate font-medium">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="mt-1">
                    <span className="bg-ptit-red text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg shadow-red-200">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-gray-50/30">
          {/* Top Bar */}
          <div className="h-24 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md bg-gradient-to-br ${
                  activeChat.avatar.length > 2 ? 'from-ptit-red to-red-400' : 'from-gray-700 to-gray-500'
                }`}>
                  {activeChat.avatar}
                </div>
                {activeChat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{activeChat.name}</h3>
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                  {activeChat.online ? 'Active Now' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-ptit-red border border-transparent hover:border-red-100">
                <Phone size={20} />
              </button>
              <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-ptit-red border border-transparent hover:border-red-100">
                <Video size={20} />
              </button>
              <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-ptit-red border border-transparent hover:border-red-100">
                <SearchIcon size={20} />
              </button>
              <div className="w-px h-8 bg-gray-100 mx-2"></div>
              <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"
          >
            {activeChat.messages.map((msg, index) => {
              const isMine = role === 'recruiter' ? msg.sender === 'recruiter' : msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${index * 50}ms` }}>
                  <div className={`max-w-[70%] group ${isMine ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <div className={`relative px-6 py-4 rounded-3xl text-sm leading-relaxed shadow-sm transition-transform hover:scale-[1.01] ${
                      isMine 
                        ? 'bg-ptit-red text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                      {isMine && (
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCheck size={14} className="text-ptit-red" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-center gap-4">
              <div className="flex gap-2">
                <button type="button" className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-ptit-red transition-all">
                  <Smile size={22} />
                </button>
                <button type="button" className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-ptit-red transition-all">
                  <Paperclip size={22} />
                </button>
              </div>

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
                    message.trim() 
                      ? 'bg-ptit-red text-white shadow-lg shadow-red-100 hover:scale-105 active:scale-95' 
                      : 'text-gray-300'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Panel */}
        <div className="hidden lg:flex w-[300px] border-l border-gray-100 flex-col bg-white">
          <div className="p-10 text-center">
            <div className="relative inline-block mb-6">
              <div className={`w-28 h-28 rounded-3xl flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-red-100 mx-auto bg-gradient-to-br ${
                activeChat.avatar.length > 2 ? 'from-ptit-red to-red-400' : 'from-gray-700 to-gray-500'
              }`}>
                {activeChat.avatar}
              </div>
              {activeChat.online && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                   <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                </div>
              )}
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-1">{activeChat.name}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{activeChat.role}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-10">
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <User size={20} className="text-gray-400 group-hover:text-ptit-red" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Profile</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <ImageIcon size={20} className="text-gray-400 group-hover:text-ptit-red" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Media</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <FileText size={20} className="text-gray-400 group-hover:text-ptit-red" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Files</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <Circle size={20} className="text-gray-400 group-hover:text-ptit-red" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Status</span>
              </button>
            </div>

            <div className="text-left">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Privacy & Support</h4>
               <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-ptit-red transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    Smart Assistant
                  </button>
                  <button className="w-full flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-ptit-red transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Headphones size={16} />
                    </div>
                    Help Center
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
