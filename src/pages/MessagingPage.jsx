import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Send, Paperclip, Smile, MoreVertical, 
  CheckCheck, Search as SearchIcon,
  ImageIcon, FileText, User, MessageSquare,
  FileDown, Calendar, Mic, Plus, File as FileIcon, X, Video, BarChart, Sparkles
} from 'lucide-react';
import { getConversations, getChatMessages, sendMessage, sendChatAttachment, getMediaUrl, saveInterviewReport } from '../services/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './MessagingPage.css';

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

  // New states for input actions
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😂', '😍', '👍', '🔥', '👏', '🙌', '💯', '❤️', '😎', '🤔', '😢'];

  // Application stages for the summary panel
  const stages = [
    { id: 'applied', label: 'Applied' },
    { id: 'screening', label: 'Screening' },
    { id: 'interview', label: 'Interview' },
    { id: 'offered', label: 'Offered' }
  ];

  // For demo purposes, we'll assume the candidate is at 'screening' stage
  const currentStageIndex = 1; 

  const activeChat = conversations.find(c => String(c.id) === String(activeId));

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations(); 
        if (data && Array.isArray(data)) {
          const mapped = data.map(c => ({
            ...c,
            avatar: (c.name || "U").charAt(0),
            online: true,
            role: role === 'recruiter' ? 'Back-end Candidate' : 'Recruiter',
            messages: []
          }));
          setConversations(mapped);
          
          const contactId = searchParams.get('contactId') || searchParams.get('contact');
          const contactName = searchParams.get('name');
          if (contactId) {
            const existing = mapped.find(c => String(c.id) === String(contactId));
            if (existing) {
              setActiveId(existing.id);
            } else {
              const newTemp = {
                id: contactId,
                name: contactName || (role === 'recruiter' ? "Nguyễn Văn Tín" : "HR Dept."),
                avatar: (contactName || (role === 'recruiter' ? "N" : "H")).charAt(0),
                lastMessage: "Bắt đầu nhắn tin...",
                time: "5 phút trước",
                unread: 0,
                online: true,
                role: role === 'recruiter' ? 'Back-end Candidate' : 'Recruiter',
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
  }, [searchParams, role]);

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
      setShowEmojiPicker(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    // Keep focus on input
    document.querySelector('.chat-input')?.focus();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && activeId) {
      try {
        const sentMsg = await sendChatAttachment(activeId, file, 'image');
        setMessages(prev => [...prev, sentMsg]);
      } catch (err) {
        alert("Upload failed: " + err.message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && activeId) {
      try {
        const sentMsg = await sendChatAttachment(activeId, file, 'file');
        setMessages(prev => [...prev, sentMsg]);
      } catch (err) {
        alert("Upload failed: " + err.message);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        
        // Auto upload voice
        try {
          const file = new File([blob], "voice_message.webm", { type: 'audio/webm' });
          const sentMsg = await sendChatAttachment(activeId, file, 'voice');
          setMessages(prev => [...prev, sentMsg]);
        } catch (err) {
          console.error("Voice upload failed", err);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not available");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  if (loading) {
    return (
      <div className="messaging-container items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-accent-red border-t-transparent rounded-full animate-spin shadow-2xl shadow-red-500/20"></div>
          <p className="text-text-secondary font-bold tracking-widest uppercase text-sm">Initializing Secure Connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messaging-container">
      {/* Sidebar - Conversations */}
      <div className="messaging-glass-panel messaging-sidebar">
        <div className="sidebar-header">
          <h1>Messages</h1>
          <div className="search-wrapper">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text"
              placeholder="Search conversations..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="conversation-list custom-scrollbar">
          {conversations
            .filter(c => (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
            .map((chat) => {
              const isActive = String(activeId) === String(chat.id);
              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveId(chat.id)}
                  className={`conversation-item ${isActive ? 'active' : ''}`}
                >
                  <div className="avatar-wrapper">
                    <div className={`avatar-circle ${isActive ? 'active-gradient' : ''}`}>
                      {chat.avatar}
                    </div>
                    {chat.online && <div className="online-indicator"></div>}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`font-bold truncate text-sm uppercase tracking-wide ${isActive ? 'text-white' : 'text-text-primary'}`}>
                        {chat.name}
                      </h3>
                      <span className="text-[10px] font-bold text-text-secondary whitespace-nowrap">
                        {chat.time || '5 phút trước'}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${isActive ? 'text-text-primary/80' : 'text-text-secondary'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-accent-red rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-red-500/40">
                      {chat.unread}
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="messaging-glass-panel chat-main-panel">
        {!activeChat ? (
          <div className="empty-state">
            <div className="empty-icon-box animate-float">
              <MessageSquare size={60} />
            </div>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Command Center</h2>
            <p className="text-text-secondary max-w-sm mx-auto text-sm leading-relaxed mb-8">
              Select a secure communication channel to start coordinating with candidates or recruiters.
            </p>
            <button className="action-btn px-10">Start New Thread</button>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <div className="header-user-info">
                <div className="avatar-wrapper">
                  <div className="avatar-circle active-gradient">
                    {activeChat.avatar}
                  </div>
                  <div className="online-indicator"></div>
                </div>
                <div>
                  <h3>{activeChat.name}</h3>
                  <div className="header-status">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    ACTIVE NOW | {activeChat.role || 'Back-end Candidate'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={async () => {
                    const myId = sessionStorage.getItem('userId') || '';
                    const ids = [myId, activeId].sort();
                    const sharedRoomId = `${ids[0]}_${ids[1]}`;
                    
                    alert("🤖 AI (Llama 3 Local via Kaggle) đang tiến hành phân tích kịch bản phỏng vấn giả lập...\n\nQuá trình này mất khoảng 10-20 giây. Vui lòng không tắt trình duyệt!");
                    
                    try {
                      const response = await fetch('http://127.0.0.1:8000/api/interview/simulate-analysis', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ room_id: sharedRoomId })
                      });
                      
                      if (!response.ok) throw new Error("Không thể kết nối AI Service local.");
                      const result = await response.json();
                      
                      // 1. Lưu vào Database C# qua saveInterviewReport
                      try {
                        await saveInterviewReport({
                          roomId: sharedRoomId,
                          communicationScore: result.communication_score,
                          technicalScore: result.technical_score,
                          confidenceScore: result.confidence_score,
                          feedbackStrengths: JSON.stringify(result.feedback_strengths),
                          feedbackWeaknesses: JSON.stringify(result.feedback_weaknesses),
                          transcriptSummary: result.transcript_summary
                        });
                      } catch (dbErr) {
                        console.error("Lỗi khi lưu báo cáo vào Database C#:", dbErr);
                        // Dự phòng bằng localStorage nếu có lỗi
                        localStorage.setItem(`simulated_report_${sharedRoomId}`, JSON.stringify(result));
                      }
                      
                      alert("🎉 Chúc mừng! AI đã chấm điểm và lưu vào C# Database thành công!\nĐang chuyển hướng bạn sang trang Báo cáo phỏng vấn...");
                      navigate(`/interview-report/${sharedRoomId}`);
                    } catch (err) {
                      console.error(err);
                      alert("⚠️ Thất bại: Hãy đảm bảo bạn đã bật local AI Python Service (cổng 8000) và đường hầm Kaggle đang hoạt động nhé!");
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/20 border border-purple-500/20"
                >
                  <Sparkles size={18} className="text-yellow-300 animate-pulse" />
                  <span>AI Test</span>
                </button>
                <button 
                  onClick={() => {
                    const myId = sessionStorage.getItem('userId') || '';
                    const ids = [myId, activeId].sort();
                    const sharedRoomId = `${ids[0]}_${ids[1]}`;
                    navigate(`/interview-report/${sharedRoomId}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
                >
                  <BarChart size={18} className="text-blue-400" />
                  <span>Report</span>
                </button>
                <button 
                  onClick={() => {
                    const myId = sessionStorage.getItem('userId') || '';
                    const ids = [myId, activeId].sort();
                    const sharedRoomId = `${ids[0]}_${ids[1]}`;
                    navigate(`/interview/${sharedRoomId}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-red hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  <Video size={18} />
                  <span>{role === 'recruiter' ? 'Start Mock Interview' : 'Join Call'}</span>
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="messages-viewport custom-scrollbar">
              {messages.map((msg, index) => {
                const myEmail = sessionStorage.getItem('userEmail');
                const myId = sessionStorage.getItem('userId');
                const isMine = myEmail 
                  ? msg.senderEmail === myEmail 
                  : myId 
                    ? String(msg.senderId) === String(myId)
                    : String(msg.senderId) !== String(activeId);
                
                return (
                  <div key={msg.id || index} className="message-bubble-wrapper">
                    <div className={`message-bubble ${isMine ? 'message-mine' : 'message-others'} animate-fade-in-up`}>
                      {msg.message && <p>{msg.message}</p>}
                      
                      {msg.attachmentUrl && (
                        <div className="mt-3">
                          {msg.attachmentType === 'image' ? (
                            <img 
                              src={getMediaUrl(msg.attachmentUrl)} 
                              alt="attachment" 
                              className="rounded-xl max-w-full border border-white/10 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(getMediaUrl(msg.attachmentUrl), '_blank')}
                            />
                          ) : msg.attachmentType === 'voice' ? (
                            <audio controls className="max-w-full">
                              <source src={getMediaUrl(msg.attachmentUrl)} type="audio/webm" />
                              Your browser does not support the audio element.
                            </audio>
                          ) : (
                            <div className="file-attachment">
                              <div className="file-icon">
                                <FileIcon size={20} />
                              </div>
                              <div className="file-info">
                                <div className="file-name truncate max-w-[150px]">
                                  {msg.attachmentUrl.split('/').pop()}
                                </div>
                                <div className="file-actions">
                                  <a href={getMediaUrl(msg.attachmentUrl)} download target="_blank" rel="noreferrer" className="hover:underline">Download</a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <span className="message-time">
                          {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMine && <CheckCheck size={14} className="text-white/60" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Demo attachment bubbles removed as we have real ones now */}
            </div>

            <div className="chat-input-area">
              <form onSubmit={handleSend} className="flex items-center gap-4">
                <div className="input-container flex-1 relative">
                  {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 mb-4 p-4 bg-gray-800 border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-wrap gap-2 w-64">
                      {emojis.map(e => (
                        <button 
                          key={e} 
                          type="button"
                          onClick={() => handleEmojiClick(e)}
                          className="text-xl hover:scale-125 transition-transform p-1"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  )}

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={imageInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />

                  <button 
                    type="button" 
                    className="input-icon-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus size={20} />
                  </button>
                  <button 
                    type="button" 
                    className="input-icon-btn"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button 
                    type="button" 
                    className={`input-icon-btn ${showEmojiPicker ? 'text-accent-red' : ''}`}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile size={20} />
                  </button>
                  <button 
                    type="button" 
                    className={`input-icon-btn ${isRecording ? 'text-accent-red animate-pulse' : ''}`}
                    onClick={toggleRecording}
                  >
                    <Mic size={20} />
                  </button>
                  <input 
                    type="text"
                    placeholder={isRecording ? "Listening..." : "Write your message..."}
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setShowEmojiPicker(false)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="send-btn"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;

