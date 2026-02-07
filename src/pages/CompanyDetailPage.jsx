import React, { useState } from 'react';
import { 
  MapPin, Globe, Mail, Users, Calendar, Clock, DollarSign, Briefcase, 
  ChevronRight, CheckCircle, Star, Award, Shield, Zap, Sparkles, 
  Play, Instagram, Linkedin, Facebook, Twitter, Smartphone, ExternalLink,
  MessageSquare, UserCheck, FileText, Send, Crown
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  // Get active plan from storage for testing dynamic themes
  const activePlanId = sessionStorage.getItem('recruiter_plan') || 'basic';

  const themes = {
    basic: {
      primary: 'ptit-red',
      secondary: 'red',
      bg: 'bg-red-50',
      mesh: '',
      border: 'border-red-100',
      shadow: 'shadow-red-100',
      badge: 'Xác thực',
      badgeColor: 'bg-blue-100 text-blue-600',
      icon: CheckCircle
    },
    pro: {
      primary: 'blue-600',
      secondary: 'blue',
      bg: 'bg-blue-50',
      mesh: 'mesh-gradient-pro',
      border: 'border-blue-100',
      shadow: 'shadow-blue-200',
      badge: 'Đối tác Bạc',
      badgeColor: 'bg-blue-600 text-white',
      icon: Award
    },
    premium: {
      primary: 'amber-500',
      secondary: 'amber',
      bg: 'bg-amber-50',
      mesh: 'mesh-gradient-premium',
      border: 'border-amber-200',
      shadow: 'shadow-amber-300',
      badge: 'Đối tác Kim cương',
      badgeColor: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-xl',
      icon: Crown
    }
  };

  const theme = themes[activePlanId] || themes.basic;

  // Mock Data
  const company = {
    name: "Tập đoàn ABC Technology",
    logo: "https://ui-avatars.com/api/?name=ABC+Tech&background=0D8ABC&color=fff&size=128",
    banner: activePlanId === 'premium' 
        ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
        : "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1950&q=80",
    slogan: activePlanId === 'premium' ? "Định nghĩa lại chuẩn mực công nghệ toàn cầu" : "Tiên phong công nghệ - Dẫn lối tương lai",
    description: "ABC Technology là tập đoàn công nghệ đa quốc gia hàng đầu Việt Nam, chuyên cung cấp các giải pháp phần mềm toàn diện và dịch vụ tư vấn chuyển đổi số. Với hơn 10 năm kinh nghiệm và mạng lưới khách hàng toàn cầu, chúng tôi tự hào mang đến những sản phẩm đột phá công nghệ, giúp đối nghiệp tối ưu hóa quy trình vận hành.\n\nTại ABC Tech, chúng tôi không chỉ xây dựng phần mềm, chúng tôi kiến tạo tương lai. Môi trường tại đây đề cao văn hóa minh bạch, thúc đẩy sự sáng tạo không giới hạn và hỗ trợ mọi cá nhân phát triển tối đa tiềm năng của mình thông qua các dự án tầm cỡ quốc tế.",
    founded: "2010",
    size: "500-1000 nhân viên",
    industry: "Công nghệ thông tin",
    website: "https://abc-tech.com",
    email: "hr@abc-tech.com",
    address: "Tầng 12, Tòa nhà Innovation, Quận Cầu Giấy, Hà Nội",
    social: {
      fb: "facebook.com/abctech",
      linkedin: "linkedin.com/company/abc-tech",
      insta: "@abctech_life"
    },
    benefits: [
      { icon: DollarSign, title: "Lương thưởng", text: "Mức lương cạnh tranh, thưởng dự án hấp dẫn (tháng 13, 14, 15)" },
      { icon: Shield, title: "Sức khỏe", text: "Bảo hiểm sức khỏe toàn diện (PVI) cho nhân viên và người thân" },
      { icon: Zap, title: "Onsite", text: "Cơ hội onsite tại Nhật Bản, Mỹ, Singapore và Châu Âu" },
      { icon: Award, title: "Phát triển", text: "Lộ trình thăng tiến rõ ràng, hỗ trợ 100% chi phí thi chứng chỉ quốc tế" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&q=80&w=600"
    ],
    products: [
      { name: "ABC One", desc: "Nền tảng quản lý doanh nghiệp ERP thế hệ mới", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
      { name: "ABC AI Lab", desc: "Giải pháp trí tuệ nhân tạo chuyên sâu cho y tế", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400" }
    ],
    testimonials: [
      { name: "Nguyễn Văn A", role: "Senior Developer", content: "Môi trường ở đây cực kỳ cởi mở. Tôi được tự do thử nghiệm các công nghệ mới nhất mà không sợ sai.", avatar: "https://i.pravatar.cc/150?u=1" },
      { name: "Lê Thị B", role: "Product Manager", content: "Sếp tâm lý, đồng nghiệp thân thiện. Buffet trưa tại công ty là điều tôi thích nhất mỗi ngày!", avatar: "https://i.pravatar.cc/150?u=2" }
    ],
    process: [
      { step: "Ứng tuyển", desc: "Gửi CV và Portfolio thông qua hệ thống", icon: FileText },
      { step: "Sàng lọc", desc: "Phỏng vấn sơ vấn với HR qua điện thoại", icon: UserCheck },
      { step: "Kỹ thuật", desc: "Làm bài test online và phỏng vấn chuyên môn", icon: Smartphone },
      { step: "Thoả thuận", desc: "Thảo luận về phúc lợi và nhận Offer", icon: Send }
    ]
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer (React/Vue)",
      salary: "20 - 35 Triệu",
      location: "Hà Nội",
      deadline: "30/04/2026",
      tags: ["ReactJS", "VueJS", "JavaScript"],
      isNew: true
    },
    {
      id: 2,
      title: "Backend Developer (NodeJS/Go)",
      salary: "25 - 40 Triệu",
      location: "Hà Nội",
      deadline: "15/05/2026",
      tags: ["NodeJS", "GoLang", "MySQL"],
      isNew: false
    }
  ];

  return (
    <div className={`min-h-screen pb-20 font-sans ${theme.mesh} transition-colors duration-1000`}>
      {/* Decorative Blobs for Premium/Pro */}
      {activePlanId !== 'basic' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className={`absolute -top-24 -left-20 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-${theme.secondary}-400 animate-float`}></div>
            <div className={`absolute top-1/2 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-15 bg-${activePlanId === 'premium' ? 'indigo-400' : 'sky-400'} animate-float`} style={{animationDelay: '1s'}}></div>
        </div>
      )}

      {/* Hero Section with Glassmorphism Header Overlay */}
      <div className="relative h-[480px] w-full overflow-hidden">
        <img 
          src={company.banner} 
          alt="Company Banner" 
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ${activePlanId === 'premium' ? 'scale-110 hover:scale-115' : 'scale-105'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent`}></div>
        
        {/* Floating Stats or Badge */}
        <div className="absolute top-24 right-10 hidden md:block animate-fade-in">
            <div className={`backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] text-white shadow-2xl ${activePlanId === 'premium' ? 'bg-amber-500/10' : 'bg-white/10'}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl ${
                        activePlanId === 'premium' ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/40 animate-shine' : 'bg-ptit-red shadow-black/20'
                    }`}>
                        <Award size={28} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-0.5">
                            {activePlanId === 'premium' ? 'Platinum Employer' : 'Top Employer'}
                        </div>
                        <div className="text-xl font-black tracking-tight underline decoration-theme-primary/30 underline-offset-4">2026 Winner</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-36 relative z-10 transition-all duration-700">
        {/* Company Identity Card */}
        <div className={`bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 border border-white/50 flex flex-col md:flex-row items-center md:items-end gap-8 mb-10 transition-all hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.15)] ${activePlanId === 'premium' ? 'animate-shine' : ''}`}>
          <div className={`w-44 h-44 md:w-56 md:h-56 rounded-[2rem] bg-white p-5 shadow-2xl flex-shrink-0 -mt-20 sm:-mt-28 border-8 transition-all hover:scale-105 duration-700 relative group ${
              activePlanId === 'premium' ? 'border-amber-400 animate-border-glow' : 'border-white'
          }`}>
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-full h-full object-contain rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left pb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                <h1 className="text-5xl font-black text-gray-900 tracking-tight">{company.name}</h1>
                <span className={`${theme.badgeColor} px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] w-fit mx-auto md:mx-0 flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default shadow-lg border border-white/20`}>
                    <theme.icon size={16} /> {theme.badge}
                </span>
            </div>
            <p className="text-2xl text-gray-400 font-bold mb-8 italic opacity-80 leading-relaxed font-serif">"{company.slogan}"</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/50 rounded-2xl text-gray-800 font-black border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow">
                <Users size={18} className={`text-${theme.primary}`} />
                <span>{company.size}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white/50 rounded-2xl text-gray-800 font-black border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow">
                <Briefcase size={18} className={`text-${theme.primary}`} />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white/50 rounded-2xl text-gray-800 font-black border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow">
                <Globe size={18} className={`text-${theme.primary}`} />
                <span>Global HQ: Việt Nam</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto pb-4">
            <button className={`bg-${theme.primary} hover:opacity-90 text-white font-black py-5 px-12 rounded-[1.5rem] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group active:scale-95 animate-shine`}>
              <Star size={22} className="group-hover:fill-current group-hover:rotate-12 transition-transform" />
              Theo dõi công ty
            </button>
            <div className="flex gap-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={18} /> Website
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all">
                    <Linkedin size={18} />
                </button>
            </div>
          </div>
        </div>
      </div> {/* Closing div for the container starting at line 119 */}

      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">
                {/* Tab Navigation */}
                <div className="flex gap-10 mb-2 border-b border-gray-100 px-6 overflow-x-auto scrollbar-hide cascade-item">
                    {[
                        {id: 'about', label: 'Thông tin chung'},
                        {id: 'culture', label: 'Văn hóa & Sản phẩm'},
                        {id: 'jobs', label: `Tuyển dụng (${jobs.length})`}
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-5 px-4 font-black transition-all relative whitespace-nowrap text-sm tracking-tight ${
                                activeTab === tab.id ? `text-${theme.primary}` : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-${theme.primary} rounded-full`}></div>
                            )}
                        </button>
                    ))}
                </div>

                {activeTab === 'about' && (
                    <>
                        {/* About Section */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                                <Sparkles className={`text-${theme.primary} animate-pulse`} size={28} />
                                Giới thiệu công ty
                            </h2>
                            <div className="text-gray-600 leading-loose text-justify whitespace-pre-line text-lg mb-12 opacity-90">
                                {company.description}
                            </div>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className={`p-8 ${theme.bg} rounded-[2rem] border-2 ${theme.border} text-center group hover:scale-105 transition-transform`}>
                                    <div className={`text-3xl font-black text-${theme.primary} mb-2`}>10+</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Năm kinh nghiệm</div>
                                </div>
                                <div className={`p-8 ${activePlanId === 'premium' ? 'bg-amber-50' : 'bg-blue-50'} rounded-[2rem] border-2 ${activePlanId === 'premium' ? 'border-amber-100' : 'border-blue-100'} text-center group hover:scale-105 transition-transform`}>
                                    <div className={`text-3xl font-black ${activePlanId === 'premium' ? 'text-amber-600' : 'text-blue-600'} mb-2`}>200+</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Dự án thành công</div>
                                </div>
                                <div className="p-8 bg-green-50 rounded-[2rem] border-2 border-green-100 text-center group hover:scale-105 transition-transform">
                                    <div className="text-3xl font-black text-green-600 mb-2">15</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Quốc gia</div>
                                </div>
                                <div className="p-8 bg-purple-50 rounded-[2rem] border-2 border-purple-100 text-center group hover:scale-105 transition-transform">
                                    <div className="text-3xl font-black text-purple-600 mb-2">Top 5</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">IT Outsourcing</div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                                <Zap className={`text-${theme.primary} animate-bounce`} size={28} />
                                Phúc lợi dành cho bạn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {company.benefits.map((benefit, index) => (
                                    <div key={index} className={`flex items-start gap-6 p-6 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:border-${theme.primary} transition-all border-2 border-transparent group`}>
                                        <div className={`w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-${theme.primary} group-hover:bg-${theme.primary} group-hover:text-white transition-all transform group-hover:rotate-6`}>
                                            <benefit.icon size={26} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 text-lg mb-2">{benefit.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{benefit.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                                <MessageSquare className={`text-${theme.primary}`} size={28} />
                                Gương mặt tiêu biểu
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {company.testimonials.map((t, i) => (
                                    <div key={i} className="bg-gray-50/50 rounded-[2.5rem] p-8 relative border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                                        <div className={`absolute -top-5 -right-5 w-14 h-14 ${theme.bg} text-${theme.primary} rounded-full flex items-center justify-center font-black text-4xl opacity-40 group-hover:opacity-100 transition-opacity shadow-lg`}>"</div>
                                        <p className="text-gray-600 italic mb-8 text-base leading-loose relative z-10">"{t.content}"</p>
                                        <div className="flex items-center gap-5">
                                            <div className="p-1 bg-white rounded-full shadow-md">
                                                <img src={t.avatar} className="w-14 h-14 rounded-full object-cover" alt={t.name} />
                                            </div>
                                            <div>
                                                <div className="font-black text-gray-900 text-lg">{t.name}</div>
                                                <div className={`text-xs text-${theme.primary} font-black uppercase tracking-widest`}>{t.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'culture' && (
                    <>
                        {/* Culture Gallery Grid */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                                <Play className={`text-${theme.primary}`} fill="currentColor" size={24} />
                                Bộ sưu tập Văn hóa
                            </h2>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className={`aspect-video rounded-[2rem] overflow-hidden shadow-xl group border-2 ${activePlanId === 'premium' ? 'border-amber-200 shadow-amber-500/10' : 'border-transparent'}`}>
                                    <img src={company.gallery[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Office 1" />
                                </div>
                                <div className={`aspect-video rounded-[2rem] overflow-hidden shadow-xl group border-2 ${activePlanId === 'premium' ? 'border-amber-200 shadow-amber-500/10' : 'border-transparent'}`}>
                                    <img src={company.gallery[1]} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Office 2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className={`aspect-square rounded-[2rem] overflow-hidden shadow-xl group border-2 ${activePlanId === 'premium' ? 'border-amber-200 shadow-amber-500/10' : 'border-transparent'}`}>
                                    <img src={company.gallery[2]} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Activity 1" />
                                </div>
                                <div className={`aspect-square rounded-[2rem] overflow-hidden shadow-xl group border-2 ${activePlanId === 'premium' ? 'border-amber-200 shadow-amber-500/10' : 'border-transparent'}`}>
                                    <img src={company.gallery[3]} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Activity 2" />
                                </div>
                                <div className="aspect-square rounded-[2rem] bg-gray-950 flex flex-col items-center justify-center text-white p-6 text-center cursor-pointer hover:bg-gray-900 transition-all group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Instagram size={40} className={`mb-3 group-hover:animate-bounce group-hover:text-${theme.primary} transition-colors`} />
                                    <div className="text-xs font-black uppercase tracking-[0.2em]">Khám phá thêm</div>
                                    <div className="text-[10px] opacity-60 mt-2 font-bold tracking-widest">@abctech_life</div>
                                </div>
                            </div>
                        </div>

                        {/* Products Showcase */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                                <Sparkles className={`text-${theme.primary}`} size={28} />
                                Sản phẩm nổi bật
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {company.products.map((p, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className={`relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border-2 ${activePlanId === 'premium' ? 'border-amber-100' : 'border-transparent hover:border-white/50'} transition-all`}>
                                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={p.name} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                                <button className={`bg-white text-gray-900 font-black py-4 px-8 rounded-2xl flex items-center gap-3 text-sm shadow-2xl transition-all hover:bg-${theme.primary} hover:text-white group/btn animate-shine`}>
                                                    Chi tiết dự án <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <h4 className={`font-black text-2xl text-gray-900 group-hover:text-${theme.primary} transition-colors tracking-tight`}>{p.name}</h4>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed font-medium">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recruitment Process */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-12 flex items-center gap-4">
                                <Calendar className={`text-${theme.primary}`} size={28} />
                                Quy trình tuyển dụng
                            </h2>
                            <div className="relative pt-6">
                                <div className="absolute top-[60px] left-0 w-full h-1 bg-gray-100 hidden md:block rounded-full"></div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                                    {company.process.map((p, i) => (
                                        <div key={i} className="flex md:flex-col items-center gap-6 text-center group">
                                            <div className={`w-20 h-20 bg-white border-4 ${theme.bg} rounded-[2rem] flex items-center justify-center text-${theme.primary} shadow-xl z-10 transition-all duration-500 group-hover:border-${theme.primary} group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:rotate-3`}>
                                                <p.icon size={32} />
                                            </div>
                                            <div className="text-left md:text-center">
                                                <div className={`text-[10px] font-black text-${theme.primary} uppercase tracking-[0.2em] mb-2`}>Bước {i+1}</div>
                                                <h4 className="font-black text-gray-900 text-lg mb-2">{p.step}</h4>
                                                <p className="text-xs text-gray-500 font-medium leading-relaxed opacity-80">{p.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'jobs' && (
                    <div className="cascade-item" style={{animationDelay: '0.1s'}}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Vị trí đang tuyển dụng</h2>
                            <div className="text-sm font-bold text-gray-400">{jobs.length} jobs Available</div>
                        </div>

                        <div className="space-y-6">
                            {jobs.map((job, idx) => (
                            <div key={job.id} className={`group p-8 bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-[2.5rem] hover:border-${theme.primary} hover:shadow-2xl hover:shadow-${theme.secondary}-500/10 transition-all duration-500 cascade-item shadow-xl ${activePlanId === 'premium' ? 'animate-shine' : ''}`} style={{animationDelay: `${0.2 + idx * 0.1}s`}}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className={`font-black text-2xl text-gray-900 group-hover:text-${theme.primary} transition-colors tracking-tight`}>
                                                {job.title}
                                            </h3>
                                            {job.isNew && (
                                                <span className={`bg-${theme.primary}/10 text-${theme.primary} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-${theme.primary}/20 shadow-sm`}>New</span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500 mb-6 font-medium">
                                            <div className="flex items-center gap-2 text-green-600 font-black px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
                                                <DollarSign size={18} />
                                                {job.salary}
                                            </div>
                                            <div className="flex items-center gap-2 font-black text-gray-700">
                                                <MapPin size={18} className={`text-${theme.primary}`} />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Clock size={18} />
                                                Hạn nộp: {job.deadline}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                        {job.tags.map((tag, idx) => (
                                            <span key={idx} className={`bg-white text-gray-400 text-[11px] px-4 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] border border-gray-100 group-hover:border-${theme.primary}/30 group-hover:text-${theme.primary} transition-all shadow-sm`}>
                                            {tag}
                                            </span>
                                        ))}
                                        </div>
                                    </div>

                                    <Link to={`/job/${job.id}`} className={`bg-gray-950 text-white font-black py-5 px-10 rounded-[1.5rem] hover:bg-${theme.primary} transition-all shadow-xl hover:shadow-2xl hover:shadow-${theme.secondary}-500/40 active:scale-95 whitespace-nowrap text-center animate-shine`}>
                                        Ứng tuyển ngay
                                    </Link>
                                </div>
                            </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center py-12 border-2 border-dashed border-gray-200 rounded-[3rem] bg-gray-50/30">
                            <h3 className="text-xl font-black text-gray-900 mb-3">Bạn chưa tìm thấy vị trí phù hợp?</h3>
                            <p className="text-gray-400 text-sm font-bold mb-8 opacity-80 uppercase tracking-widest">Chúng tôi luôn đón chào những tài năng mới</p>
                            <button className={`text-${theme.primary} font-black hover:scale-110 transition-transform flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-white rounded-2xl shadow-xl border border-${theme.primary}/20`}>
                                Gửi hồ sơ dự tuyển (CV) <ChevronRight size={22} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar with Glassmorphism */}
            <div className="space-y-10">
                {/* Contact Info Card */}
                <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item group transition-all hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
                    <h3 className="text-2xl font-black text-gray-900 mb-10 tracking-tight flex items-center gap-3">
                        <Smartphone size={24} className={`text-${theme.primary}`} />
                        Thông tin liên hệ
                    </h3>

                    <div className="space-y-10">
                        <div className="group/item">
                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 opacity-60">Trụ sở chính</span>
                            <div className="flex items-start gap-5">
                                <div className={`${theme.bg} p-4 rounded-2xl text-${theme.primary} group-hover/item:bg-${theme.primary} group-hover/item:text-white transition-all transform group-hover/item:rotate-6 shadow-md shadow-${theme.secondary}-100`}>
                                    <MapPin size={22} />
                                </div>
                                <p className="text-gray-900 font-black text-base leading-relaxed tracking-tight">{company.address}</p>
                            </div>
                        </div>

                        <div className="group/item">
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 opacity-60">Website Doanh nghiệp</span>
                            <div className="flex items-center gap-5">
                                <div className={`bg-${activePlanId === 'premium' ? 'amber-100' : 'blue-100'} p-4 rounded-2xl ${activePlanId === 'premium' ? 'text-amber-600' : 'text-blue-600'} group-hover/item:${activePlanId === 'premium' ? 'bg-amber-600' : 'bg-blue-600'} group-hover/item:text-white transition-all transform group-hover/item:rotate-6 shadow-md`}>
                                    <Globe size={22} />
                                </div>
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className={`text-gray-900 font-black text-base hover:text-${theme.primary} block truncate underline decoration-${theme.primary}/20 underline-offset-8 decoration-2`}>
                                    {company.website}
                                </a>
                            </div>
                        </div>

                        <div className="group/item">
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-3 opacity-60">Email Tuyển dụng</span>
                            <div className="flex items-center gap-5">
                                <div className="bg-green-100 p-4 rounded-2xl text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-all transform group-hover/item:rotate-6 shadow-md">
                                    <Mail size={22} />
                                </div>
                                <a href={`mailto:${company.email}`} className={`text-gray-900 font-black text-base hover:text-${theme.primary} underline decoration-green-300/30 underline-offset-8 decoration-2`}>
                                    {company.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-6 opacity-60">Kết nối mạng xã hội</span>
                        <div className="flex gap-4">
                            {[Linkedin, Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-${theme.primary} hover:text-white hover:shadow-lg hover:shadow-${theme.secondary}-500/20 transition-all transform hover:-translate-y-2`}>
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Culture Hint Card with Shine and Mesh */}
                <div className={`bg-gradient-to-br ${activePlanId === 'premium' ? 'from-gray-900 to-amber-950 shadow-amber-500/20' : 'from-gray-950 to-red-950 shadow-red-500/20'} rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl cascade-item animate-shine`} style={{animationDelay: '0.5s'}}>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000 blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-1000 blur-3xl"></div>

                    <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center ${activePlanId === 'premium' ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-white/10 border border-white/20'}`}>
                        <Sparkles size={28} className={activePlanId === 'premium' ? 'text-amber-400' : 'text-white'} />
                    </div>

                    <h3 className="text-3xl font-black mb-6 relative z-10 tracking-tight leading-tight">Bạn muốn kiến tạo tương lai tại đây?</h3>
                    <p className="text-base opacity-70 mb-10 relative z-10 leading-relaxed font-bold tracking-tight">Gia nhập đội ngũ nhân sự tài năng và cùng nhau chinh phục những đỉnh cao công nghệ mới toàn cầu.</p>

                    <Link to="/" className={`w-full bg-white text-gray-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-${theme.primary} hover:text-white transition-all transform active:scale-95 relative z-10 shadow-2xl group/link overflow-hidden`}>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover/link:opacity-10 transition-opacity"></div>
                        Ứng tuyển ngay <ChevronRight size={22} className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Verified Footer */}
                <div className="text-center px-10 cascade-item opacity-50" style={{animationDelay: '0.6s'}}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield size={14} className={`text-${theme.primary}`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hồ sơ đã xác minh</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase">Mọi thông tin được cam kết bởi PTIT Job Partner Program 2026</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
