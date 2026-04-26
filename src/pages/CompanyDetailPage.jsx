import React, { useState, useEffect } from 'react';
import { 
  MapPin, Globe, Mail, Users, Calendar, Clock, DollarSign, Briefcase, 
  ChevronRight, CheckCircle, Star, Award, Shield, Zap, Sparkles, 
  Play, Instagram, Linkedin, Facebook, Twitter, Smartphone, ExternalLink,
  MessageSquare, UserCheck, FileText, Send, Crown
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getCompany, getJobs } from '../services/api';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyData, jobData] = await Promise.all([
          getCompany(id),
          getJobs({ companyId: id })
        ]);
        setCompany(companyData);
        setJobs(jobData.items || []);
      } catch (err) {
        setError(err.message || 'Không thể tải thông tin công ty.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Standard theme for all companies
  const activePlanId = 'basic';

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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải thông tin công ty...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!company) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy công ty.</div>;


  return (
    <div className={`min-h-screen pb-20 font-sans ${theme.mesh} transition-colors duration-1000`}>

      <div className="relative h-[480px] w-full overflow-hidden">
        <img 
          src={company.banner || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1950&q=80"} 
          alt="Company Banner" 
          className="w-full h-full object-cover scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent`}></div>
      </div>

      <div className="container mx-auto px-4 -mt-36 relative z-10 transition-all duration-700">
        <div className={`bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 border border-white/50 flex flex-col md:flex-row items-center md:items-end gap-8 mb-10 transition-all hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.15)] ${activePlanId === 'premium' ? 'animate-shine' : ''}`}>
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-[2rem] bg-white p-5 shadow-2xl flex-shrink-0 -mt-20 sm:-mt-28 border-8 transition-all hover:scale-105 duration-700 relative group border-white">
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
            <button className={`bg-${theme.primary} hover:opacity-90 text-white font-black py-5 px-12 rounded-[1.5rem] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group active:scale-95`}>
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
      </div>

      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
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
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/50 p-10 cascade-item transition-all hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
                            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                                <Sparkles className={`text-${theme.primary} animate-pulse`} size={28} />
                                Giới thiệu công ty
                            </h2>
                            <div className="text-gray-600 leading-loose text-justify whitespace-pre-line text-lg mb-12 opacity-90">
                                {company.description}
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'jobs' && (
                    <div className="space-y-8 cascade-item">
                        <div className="flex items-center justify-between px-6">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Vị trí đang tuyển</h2>
                            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-500">
                                <Zap size={16} /> {jobs.length} Cơ hội
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {jobs.map((job) => (
                            <div key={job.id} className="group relative">
                                <div className={`absolute -inset-1 bg-gradient-to-r from-${theme.primary}/20 to-${theme.secondary}-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
                                <div className="relative bg-white rounded-[2rem] p-8 border border-gray-100 group-hover:border-transparent transition-all shadow-sm hover:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`bg-${theme.bg} text-${theme.primary} text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest`}>
                                                Full-time
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <div className="flex items-center gap-2 text-ptit-red font-black text-sm">
                                                <DollarSign size={16} /> 
                                                {job.salaryMin} - {job.salaryMax} Triệu
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-ptit-red transition-colors tracking-tight">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500 mb-6">
                                            <div className="flex items-center gap-2 font-black text-gray-700">
                                                <MapPin size={18} className={`text-${theme.primary}`} />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-2 opacity-80">
                                                <Clock size={18} />
                                                Hạn nộp: {new Date(job.expiredAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <Link to={`/job/${job.id}`} className={`bg-gray-950 text-white font-black py-5 px-10 rounded-[1.5rem] hover:bg-${theme.primary} transition-all shadow-xl hover:shadow-2xl active:scale-95 whitespace-nowrap text-center animate-shine`}>
                                        Ứng tuyển ngay
                                    </Link>
                                </div>
                            </div>
                            ))}
                        </div>

                        {jobs.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                                <p className="text-gray-400 font-bold uppercase tracking-widest">Hiện chưa có vị trí đang tuyển</p>
                            </div>
                        )}
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
