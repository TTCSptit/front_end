import React, { useState, useEffect, useRef } from 'react';
import { 
    ArrowLeft, Save, Download, User, Briefcase, GraduationCap, 
    Code, Plus, Trash2, Mail, Phone, MapPin, Globe, Camera,
    ChevronRight, Layout, Type, Palette, Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMyProfile, updateProfile } from '../services/api';

const CVEditorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const templateId = parseInt(queryParams.get('template')) || 1;

    const [activeTab, setActiveTab] = useState('personal');
    const [cvData, setCvData] = useState({
        fullName: 'Nguyễn Văn A',
        title: 'Software Engineer',
        email: 'nguyenvana@example.com',
        phone: '0987 654 321',
        address: 'Hà Nội, Việt Nam',
        website: 'www.nguyenvana.me',
        profileImage: '',
        summary: 'Lập trình viên nhiệt huyết với hơn 3 năm kinh nghiệm trong phát triển ứng dụng web sử dụng ReactJS, NodeJS. Luôn học hỏi và cập nhật các công nghệ mới.',
        experience: [
            { id: 1, company: 'Công ty Tech PTIT', position: 'Senior Developer', period: '2022 - Hiện tại', desc: 'Phát triển hệ thống quản lý sinh viên. Tối ưu hóa hiệu năng ứng dụng.' },
            { id: 2, company: 'Startup XYZ', position: 'Junior Developer', period: '2020 - 2022', desc: 'Tham gia xây dựng giao diện người dùng cho ứng dụng di động.' }
        ],
        education: [
            { id: 1, school: 'Học viện Công nghệ Bưu chính Viễn thông', degree: 'Kỹ sư Công nghệ thông tin', period: '2016 - 2020', desc: 'GPA: 3.6/4.0. Giải nhất lập trình PTIT.' }
        ],
        skills: ['JavaScript', 'ReactJS', 'NodeJS', 'SQL', 'Git', 'AWS']
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Load html2pdf library with high priority
        if (!window.html2pdf) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.async = true;
            document.body.appendChild(script);
        }

        const fetchProfile = async () => {
            try {
                const data = await getMyProfile();
                if (data) {
                    setCvData(prev => ({
                        ...prev,
                        fullName: data.fullName || prev.fullName,
                        email: data.email || prev.email,
                    }));
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCvData({ ...cvData, [name]: value });
    };

    const handleArrayChange = (index, type, field, value) => {
        const newData = { ...cvData };
        newData[type][index][field] = value;
        setCvData(newData);
    };

    const addItem = (type) => {
        const newItem = type === 'experience' 
            ? { id: Date.now(), company: '', position: '', period: '', desc: '' }
            : { id: Date.now(), school: '', degree: '', period: '', desc: '' };
        setCvData({ ...cvData, [type]: [...cvData[type], newItem] });
    };

    const removeItem = (type, index) => {
        const newData = { ...cvData };
        newData[type].splice(index, 1);
        setCvData(newData);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCvData({...cvData, profileImage: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        const element = document.getElementById('cv-print-area');
        
        if (!window.html2pdf) {
            alert('Công cụ tạo PDF đang được tải, vui lòng thử lại sau 2 giây.');
            return;
        }

        const btn = document.activeElement;
        const originalText = btn?.innerHTML;
        if (btn) {
            btn.innerHTML = '<span style="margin-right:8px">◌</span> Đang tạo PDF...';
            btn.disabled = true;
        }

        // ========== ULTIMATE FIX: MONKEY PATCH + DIRECT EXPORT ==========
        const originalGetComputedStyle = window.getComputedStyle;
        
        // Monkey patch using Proxy to hide oklch from html2canvas
        window.getComputedStyle = function(el, pseudo) {
            const style = originalGetComputedStyle(el, pseudo);
            
            return new Proxy(style, {
                get(target, prop) {
                    if (prop === 'getPropertyValue') {
                        return (p) => {
                            const val = target.getPropertyValue(p);
                            return (val && typeof val === 'string' && val.includes('oklch')) ? 'rgb(0, 0, 0)' : val;
                        };
                    }
                    const val = target[prop];
                    if (typeof val === 'string' && val.includes('oklch')) {
                        return 'rgb(0, 0, 0)';
                    }
                    if (typeof val === 'function') {
                        return val.bind(target);
                    }
                    return val;
                }
            });
        };

        const opt = {
            margin: 0,
            filename: `CV_${cvData.fullName.replace(/\s+/g, '_') || 'Member'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                letterRendering: true, 
                logging: false, 
                backgroundColor: '#ffffff' 
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        window.html2pdf().from(element).set(opt).save().then(() => {
            window.getComputedStyle = originalGetComputedStyle;
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }).catch(err => {
            console.error('PDF generation error:', err);
            window.getComputedStyle = originalGetComputedStyle;
            alert('Lỗi khi tạo file PDF. Vui lòng thử lại.');
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    };

    // Safe color constants to avoid oklch issues
    const COLORS = {
        black: '#111827',
        gray900: '#111827',
        gray800: '#1f2937',
        gray700: '#374151',
        gray600: '#4b5563',
        gray500: '#6b7280',
        gray400: '#9ca3af',
        gray300: '#d1d5db',
        gray200: '#e5e7eb',
        gray100: '#f3f4f6',
        gray50: '#f9fafb',
        white: '#ffffff',
        ptitRed: '#ce1212',
        ptitDarkRed: '#a00e0e'
    };

    const renderTemplate = () => {
        switch(templateId) {
            case 2: // Professional (Modern Tech)
                return (
                    <div id="cv-print-area" className="bg-white min-h-[1120px] w-full shadow-2xl flex font-sans" style={{ backgroundColor: COLORS.white }}>
                        {/* Left Sidebar */}
                        <div className="w-1/3 p-8 text-white" style={{ backgroundColor: COLORS.black }}>
                            <div className="mb-10 text-center">
                                {cvData.profileImage ? (
                                    <img src={cvData.profileImage} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 object-cover" style={{ borderColor: COLORS.gray700 }} />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center border-4" style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                                        <User size={64} />
                                    </div>
                                )}
                                <h2 className="text-xl font-bold uppercase tracking-wider">{cvData.fullName}</h2>
                                <p className="text-gray-400 text-sm" style={{ color: COLORS.gray400 }}>{cvData.title}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold uppercase border-b pb-2 mb-3" style={{ borderColor: COLORS.gray700 }}>Thông tin</h3>
                                    <div className="space-y-3 text-xs opacity-90">
                                        <div className="flex items-center gap-2"><Mail size={12} /> {cvData.email}</div>
                                        <div className="flex items-center gap-2"><Phone size={12} /> {cvData.phone}</div>
                                        <div className="flex items-center gap-2"><MapPin size={12} /> {cvData.address}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase border-b pb-2 mb-3" style={{ borderColor: COLORS.gray700 }}>Kỹ năng</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cvData.skills.map(s => (
                                            <span key={s} className="px-2 py-1 rounded text-[10px]" style={{ backgroundColor: COLORS.gray700 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Content */}
                        <div className="w-2/3 p-10 bg-white" style={{ backgroundColor: COLORS.white }}>
                            <div className="mb-10">
                                <h3 className="text-lg font-bold uppercase mb-3 flex items-center gap-2" style={{ color: COLORS.black }}>
                                    <User size={18} /> Giới thiệu
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>{cvData.summary}</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2" style={{ color: COLORS.black }}>
                                    <Briefcase size={18} /> Kinh nghiệm
                                </h3>
                                <div className="space-y-6">
                                    {cvData.experience.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-bold text-sm" style={{ color: COLORS.gray800 }}>{exp.position}</h4>
                                                <span className="text-xs" style={{ color: COLORS.gray400 }}>{exp.period}</span>
                                            </div>
                                            <p className="text-xs font-bold mb-1" style={{ color: COLORS.ptitRed }}>{exp.company}</p>
                                            <p className="text-xs opacity-80" style={{ color: COLORS.gray600 }}>{exp.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2" style={{ color: COLORS.black }}>
                                    <GraduationCap size={18} /> Học vấn
                                </h3>
                                <div className="space-y-4">
                                    {cvData.education.map(edu => (
                                        <div key={edu.id}>
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-bold text-sm" style={{ color: COLORS.gray800 }}>{edu.degree}</h4>
                                                <span className="text-xs" style={{ color: COLORS.gray400 }}>{edu.period}</span>
                                            </div>
                                            <p className="text-xs opacity-90" style={{ color: COLORS.gray600 }}>{edu.school}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3: // Creative (PTIT Style)
                return (
                    <div id="cv-print-area" className="bg-white min-h-[1120px] w-full p-12 font-sans" style={{ backgroundColor: COLORS.white }}>
                        <div className="border-l-8 pl-8 mb-12" style={{ borderColor: COLORS.ptitRed }}>
                            <h1 className="text-5xl font-black mb-2 tracking-tight" style={{ color: COLORS.black }}>{cvData.fullName}</h1>
                            <p className="text-xl font-bold uppercase tracking-widest" style={{ color: COLORS.ptitRed }}>{cvData.title}</p>
                        </div>

                        <div className="grid grid-cols-12 gap-10">
                            <div className="col-span-8">
                                <section className="mb-10">
                                    <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3" style={{ color: COLORS.black }}>
                                        <span className="w-8 h-1" style={{ backgroundColor: COLORS.ptitRed }}></span> Kinh nghiệm
                                    </h2>
                                    <div className="space-y-8">
                                        {cvData.experience.map(exp => (
                                            <div key={exp.id} className="relative pl-6 border-l" style={{ borderColor: COLORS.gray200 }}>
                                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.ptitRed }}></div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-black text-base" style={{ color: COLORS.gray800 }}>{exp.position}</h3>
                                                        <p className="text-sm font-bold" style={{ color: COLORS.ptitRed }}>{exp.company}</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold" style={{ backgroundColor: COLORS.gray100, color: COLORS.gray500 }}>{exp.period}</span>
                                                </div>
                                                <p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>{exp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="col-span-4">
                                <div className="bg-gray-50 p-6 rounded-3xl mb-8" style={{ backgroundColor: COLORS.gray50 }}>
                                    <h3 className="font-black text-sm uppercase mb-4 tracking-wider" style={{ color: COLORS.black }}>Liên hệ</h3>
                                    <div className="space-y-4 text-xs">
                                        <div className="flex items-center gap-3" style={{ color: COLORS.gray600 }}><Mail size={14} style={{ color: COLORS.ptitRed }} /> {cvData.email}</div>
                                        <div className="flex items-center gap-3" style={{ color: COLORS.gray600 }}><Phone size={14} style={{ color: COLORS.ptitRed }} /> {cvData.phone}</div>
                                        <div className="flex items-center gap-3" style={{ color: COLORS.gray600 }}><MapPin size={14} style={{ color: COLORS.ptitRed }} /> {cvData.address}</div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="font-black text-sm uppercase mb-4 tracking-wider" style={{ color: COLORS.black }}>Kỹ năng</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cvData.skills.map(s => (
                                            <span key={s} className="px-3 py-1.5 bg-white border font-bold text-[10px] rounded-lg" style={{ backgroundColor: COLORS.white, borderColor: COLORS.gray200, color: COLORS.gray800 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default: // Minimalist (Academic)
                return (
                    <div id="cv-print-area" className="bg-white min-h-[1120px] w-full p-16 font-serif" style={{ backgroundColor: COLORS.white }}>
                        <div className="text-center border-b-2 pb-10 mb-10" style={{ borderColor: COLORS.black }}>
                            <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.black }}>{cvData.fullName}</h1>
                            <div className="flex justify-center gap-4 text-sm" style={{ color: COLORS.gray600 }}>
                                <span>{cvData.email}</span>
                                <span>•</span>
                                <span>{cvData.phone}</span>
                                <span>•</span>
                                <span>{cvData.address}</span>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <section>
                                <h2 className="text-lg font-bold border-b mb-4 uppercase tracking-widest" style={{ color: COLORS.black, borderColor: COLORS.gray200 }}>Tóm tắt</h2>
                                <p className="text-sm leading-relaxed text-justify" style={{ color: COLORS.gray700 }}>{cvData.summary}</p>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold border-b mb-4 uppercase tracking-widest" style={{ color: COLORS.black, borderColor: COLORS.gray200 }}>Kinh nghiệm</h2>
                                <div className="space-y-6">
                                    {cvData.experience.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-base" style={{ color: COLORS.black }}>{exp.company}</h3>
                                                <span className="text-sm italic" style={{ color: COLORS.gray500 }}>{exp.period}</span>
                                            </div>
                                            <p className="text-sm italic mb-2" style={{ color: COLORS.gray600 }}>{exp.position}</p>
                                            <p className="text-sm leading-relaxed" style={{ color: COLORS.gray700 }}>{exp.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold border-b mb-4 uppercase tracking-widest" style={{ color: COLORS.black, borderColor: COLORS.gray200 }}>Học vấn</h2>
                                {cvData.education.map(edu => (
                                    <div key={edu.id} className="mb-4">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-base" style={{ color: COLORS.black }}>{edu.school}</h3>
                                            <span className="text-sm italic" style={{ color: COLORS.gray500 }}>{edu.period}</span>
                                        </div>
                                        <p className="text-sm" style={{ color: COLORS.gray700 }}>{edu.degree}</p>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="bg-[#f1f5f9] min-h-screen flex flex-col md:flex-row">
            {/* Left Panel: Form */}
            <div className="w-full md:w-[450px] bg-white h-screen overflow-y-auto shadow-2xl z-20 no-scrollbar custom-scrollbar">
                <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b flex items-center justify-between z-30">
                    <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-xl transition text-gray-400">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-black text-xl text-gray-900 tracking-tight">Thiết kế CV</h1>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleDownload} 
                            className="flex items-center gap-2 px-6 py-2.5 bg-ptit-red text-white rounded-xl hover:bg-ptit-darkred transition shadow-lg shadow-ptit-red/20 active:scale-95 font-black uppercase text-xs tracking-widest"
                        >
                            <Download size={18} />
                            Tải PDF
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8 pb-32">
                    {/* Image Upload Area */}
                    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-center relative overflow-hidden group">
                        {cvData.profileImage ? (
                            <div className="relative inline-block">
                                <img src={cvData.profileImage} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                                <button onClick={() => setCvData({...cvData, profileImage: ''})} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-white mx-auto flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-400">
                                <Camera size={32} strokeWidth={1.5} />
                                <span className="text-[10px] mt-2 font-bold uppercase tracking-widest">Ảnh 3x4</span>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                        <button onClick={() => fileInputRef.current.click()} className="mt-4 px-6 py-2 bg-white text-gray-900 text-xs font-black rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition uppercase tracking-widest">
                            Tải ảnh lên
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-2xl">
                        {[
                            { id: 'personal', icon: <User size={16} /> },
                            { id: 'exp', icon: <Briefcase size={16} /> },
                            { id: 'edu', icon: <GraduationCap size={16} /> },
                            { id: 'skills', icon: <Code size={16} /> }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center py-2.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white text-ptit-red shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab.icon}
                            </button>
                        ))}
                    </div>

                    {/* Personal Info Form */}
                    {activeTab === 'personal' && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-6 h-1 bg-ptit-red rounded-full"></span> Thông tin cá nhân
                            </h3>
                            <div className="grid gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Họ và tên</label>
                                    <input name="fullName" value={cvData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red outline-none transition text-sm font-bold" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Vị trí ứng tuyển</label>
                                    <input name="title" value={cvData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red outline-none transition text-sm font-bold" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Email</label>
                                        <input name="email" value={cvData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red outline-none transition text-sm font-bold" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Số điện thoại</label>
                                        <input name="phone" value={cvData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red outline-none transition text-sm font-bold" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Giới thiệu ngắn</label>
                                    <textarea name="summary" value={cvData.summary} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red outline-none transition text-sm font-bold resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experience Form */}
                    {activeTab === 'exp' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="w-6 h-1 bg-ptit-red rounded-full"></span> Kinh nghiệm làm việc
                                </h3>
                                <button onClick={() => addItem('experience')} className="p-2 bg-gray-100 hover:bg-ptit-red hover:text-white rounded-lg transition text-gray-600">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {cvData.experience.map((exp, index) => (
                                    <div key={exp.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                                        <button onClick={() => removeItem('experience', index)} className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                                            <Trash2 size={14} />
                                        </button>
                                        <input placeholder="Công ty" value={exp.company} onChange={(e) => handleArrayChange(index, 'experience', 'company', e.target.value)} className="w-full bg-transparent font-black text-sm mb-2 outline-none" />
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input placeholder="Vị trí" value={exp.position} onChange={(e) => handleArrayChange(index, 'experience', 'position', e.target.value)} className="bg-transparent text-xs outline-none" />
                                            <input placeholder="Thời gian" value={exp.period} onChange={(e) => handleArrayChange(index, 'experience', 'period', e.target.value)} className="bg-transparent text-[10px] text-right outline-none" />
                                        </div>
                                        <textarea placeholder="Mô tả công việc" value={exp.desc} onChange={(e) => handleArrayChange(index, 'experience', 'desc', e.target.value)} rows={2} className="w-full bg-transparent text-xs outline-none resize-none" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education Form */}
                    {activeTab === 'edu' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="w-6 h-1 bg-ptit-red rounded-full"></span> Học vấn
                                </h3>
                                <button onClick={() => addItem('education')} className="p-2 bg-gray-100 hover:bg-ptit-red hover:text-white rounded-lg transition text-gray-600">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {cvData.education.map((edu, index) => (
                                    <div key={edu.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                                        <button onClick={() => removeItem('education', index)} className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                                            <Trash2 size={14} />
                                        </button>
                                        <input placeholder="Trường học" value={edu.school} onChange={(e) => handleArrayChange(index, 'education', 'school', e.target.value)} className="w-full bg-transparent font-black text-sm mb-2 outline-none" />
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input placeholder="Bằng cấp" value={edu.degree} onChange={(e) => handleArrayChange(index, 'education', 'degree', e.target.value)} className="bg-transparent text-xs outline-none" />
                                            <input placeholder="Thời gian" value={edu.period} onChange={(e) => handleArrayChange(index, 'education', 'period', e.target.value)} className="bg-transparent text-[10px] text-right outline-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills Form */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-6 h-1 bg-ptit-red rounded-full"></span> Kỹ năng chuyên môn
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cvData.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl group">
                                        <input 
                                            value={skill} 
                                            onChange={(e) => {
                                                const newSkills = [...cvData.skills];
                                                newSkills[index] = e.target.value;
                                                setCvData({...cvData, skills: newSkills});
                                            }}
                                            className="bg-transparent text-xs font-bold outline-none w-20"
                                        />
                                        <button 
                                            onClick={() => {
                                                const newSkills = cvData.skills.filter((_, i) => i !== index);
                                                setCvData({...cvData, skills: newSkills});
                                            }}
                                            className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => setCvData({...cvData, skills: [...cvData.skills, 'Skill']})}
                                    className="px-4 py-2 bg-ptit-red/5 border border-ptit-red/10 text-ptit-red rounded-xl text-xs font-bold hover:bg-ptit-red/10 transition"
                                >
                                    + Thêm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Preview */}
            <div className="flex-1 bg-gray-200 h-screen overflow-y-auto p-12 custom-scrollbar">
                <div className="max-w-[794px] mx-auto scale-90 md:scale-100 origin-top shadow-2xl transition-transform duration-500">
                    {renderTemplate()}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; margin: 0 !important; }
                    .preview-container { padding: 0 !important; background: white !important; overflow: visible !important; }
                    #cv-print-area { box-shadow: none !important; margin: 0 !important; width: 100% !important; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                #cv-print-area * {
                    /* Fix for html2canvas oklch error */
                    color-scheme: light;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
};

export default CVEditorPage;
