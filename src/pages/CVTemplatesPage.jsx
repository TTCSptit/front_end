import React, { useState, useEffect } from 'react';
import { Download, Eye, Star, Filter, X, ChevronRight, CheckCircle, TrendingUp, Zap, Clock, Edit3, Briefcase, Layout as LayoutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
const CVTemplatesPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const categories = ['Tất cả', 'Công nghệ (IT)', 'Kinh doanh', 'Marketing', 'Sinh viên', 'Thiết kế', 'Quản lý'];

    const templates = [
        { 
            id: 1, 
            name: 'Minimalist Student', 
            category: 'Sinh viên',
            image: '/cv-templates/cv1.png', 
            downloads: 12500,
            rating: 4.8,
            badge: 'Phổ biến',
            description: 'Mẫu CV tối giản, tập trung vào học vấn và hoạt động ngoại khóa. Phù hợp cho sinh viên mới ra trường.'
        },
        { 
            id: 2, 
            name: 'Modern Tech Stack', 
            category: 'Công nghệ (IT)',
            image: '/cv-templates/cv2.png', 
            downloads: 45200,
            rating: 4.9,
            badge: 'Pro',
            description: 'Thiết kế chuẩn kỹ thuật, hiển thị kỹ năng lập trình và dự án cá nhân một cách nổi bật.'
        },
        { 
            id: 3, 
            name: 'Creative Agency', 
            category: 'Thiết kế',
            image: '/cv-templates/cv3.png', 
            downloads: 21000,
            rating: 4.7,
            badge: 'Hot',
            description: 'Sử dụng màu sắc và bố cục sáng tạo, giúp bạn nổi bật trong mắt các nhà tuyển dụng agency.'
        },
        { 
            id: 4, 
            name: 'Executive Leader', 
            category: 'Quản lý',
            image: '/cv-templates/cv1.png', 
            downloads: 8900,
            rating: 4.9,
            badge: 'Premium',
            description: 'Mẫu CV sang trọng dành cho vị trí quản lý cao cấp, tập trung vào kinh nghiệm và thành tựu.'
        },
        { 
            id: 5, 
            name: 'Global Business', 
            category: 'Kinh doanh',
            image: '/cv-templates/cv2.png', 
            downloads: 15400,
            rating: 4.8,
            badge: 'Mới',
            description: 'Thiết kế chuyên nghiệp theo tiêu chuẩn quốc tế, phù hợp cho các tập đoàn đa quốc gia.'
        },
        { 
            id: 6, 
            name: 'Visual Artist', 
            category: 'Thiết kế',
            image: '/cv-templates/cv3.png', 
            downloads: 11200,
            rating: 4.6,
            badge: 'Creative',
            description: 'Dành riêng cho thiết kế đồ họa với không gian cho portfolio và kỹ năng hình ảnh.'
        },
    ];

    const filteredTemplates = selectedCategory === 'Tất cả' 
        ? templates 
        : templates.filter(t => t.category === selectedCategory);

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-white to-gray-50"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                            Chọn <span className="text-ptit-red">Phong Cách</span> Thiết Kế
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                            Chúng tôi đã chuẩn bị sẵn các ngôn ngữ thiết kế tối ưu nhất. Bạn chỉ cần chọn phong cách mình thích và bắt đầu.
                        </p>
                        
                        {/* Categories List */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${
                                        selectedCategory === cat 
                                        ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 scale-105' 
                                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Carousel Section */}
            <div className="container mx-auto px-4 pb-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900">Mẫu CV Nổi Bật</h2>
                    <p className="text-gray-500 mt-2">Lướt để xem các mẫu CV được yêu thích nhất</p>
                </div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 20,
                        stretch: 0,
                        depth: 300,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-full max-w-5xl py-12"
                    style={{
                        '--swiper-pagination-color': '#b91c1c',
                    }}
                >
                    {filteredTemplates.map((template) => (
                        <SwiperSlide key={`carousel-${template.id}`} className="w-[300px] sm:w-[350px] md:w-[400px]">
                            <div 
                                className="bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer relative group border border-gray-100"
                                onClick={() => setPreviewTemplate(template)}
                            >
                                <img 
                                    src={template.image} 
                                    alt={template.name} 
                                    className="w-full h-[450px] md:h-[550px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="px-3 py-1 bg-ptit-red text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-wider">{template.category}</span>
                                    <h3 className="text-2xl font-black mb-1">{template.name}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
                                        <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-current"/> {template.rating}</div>
                                        <div className="flex items-center gap-1"><Download size={14} /> {(template.downloads/1000).toFixed(1)}k</div>
                                    </div>
                                    <button 
                                        className="mt-4 w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/cv-editor?template=${template.id}`);
                                        }}
                                    >
                                        <Edit3 size={16} /> Dùng mẫu này
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900">Danh Sách Mẫu CV</h2>
                </div>
                {/* Styles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredTemplates.map((template, i) => {
                        const isProfessional = template.id === 2 || template.id === 4;
                        const isCreative = template.id === 3 || template.id === 6;
                        
                        const styleConfig = isProfessional 
                            ? { label: 'Professional', icon: <Briefcase size={48} />, gradient: 'from-[#323b4c] to-[#1a202c]', color: 'text-white' }
                            : isCreative 
                            ? { label: 'Creative', icon: <Zap size={48} />, gradient: 'from-ptit-red to-[#b91c1c]', color: 'text-white' }
                            : { label: 'Minimalist', icon: <LayoutIcon size={48} />, gradient: 'from-gray-100 to-gray-200', color: 'text-gray-900' };

                        return (
                            <div 
                                key={template.id} 
                                className="group"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full active:scale-[0.98]">
                                    {/* Abstract Style Header (No Image) */}
                                    <div className={`relative h-64 bg-gradient-to-br ${styleConfig.gradient} flex items-center justify-center`}>
                                        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                                            <div className="scale-[6] transform rotate-12">{styleConfig.icon}</div>
                                        </div>
                                        <div className={`relative z-10 flex flex-col items-center gap-5 ${styleConfig.color}`}>
                                            <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                                {styleConfig.icon}
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-1">Phong cách</span>
                                                <span className="text-2xl font-black uppercase tracking-widest">{styleConfig.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Info Section */}
                                    <div className="p-10 flex flex-col items-center text-center flex-grow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ptit-red animate-pulse"></span>
                                            <span className="text-ptit-red text-[10px] font-black uppercase tracking-widest">{template.category}</span>
                                        </div>
                                        
                                        <h3 className="font-black text-2xl text-gray-900 mb-4 group-hover:text-ptit-red transition-colors tracking-tight">{template.name}</h3>
                                        
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 opacity-80">
                                            {template.description}
                                        </p>

                                        <div className="mt-auto w-full space-y-3">
                                            <button 
                                                onClick={() => navigate(`/cv-editor?template=${template.id}`)}
                                                className="w-full py-4.5 bg-gray-900 text-white font-black rounded-2xl hover:bg-ptit-red transition-all shadow-lg hover:shadow-ptit-red/20 flex items-center justify-center gap-3 active:scale-95"
                                            >
                                                <Edit3 size={18} />
                                                Sử dụng mẫu này
                                            </button>
                                            <button 
                                                onClick={() => setPreviewTemplate(template)}
                                                className="w-full py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all text-xs uppercase tracking-widest"
                                            >
                                                Xem chi tiết mẫu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={() => setPreviewTemplate(null)}></div>
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row animate-scale-up">
                        <button 
                            onClick={() => setPreviewTemplate(null)}
                            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all z-20 backdrop-blur-md"
                        >
                            <X size={24} />
                        </button>

                        {/* Left: Image Preview */}
                        <div className="md:w-1/2 bg-gray-100 relative group overflow-hidden">
                            <img 
                                src={previewTemplate.image} 
                                alt={previewTemplate.name} 
                                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        {/* Right: Info */}
                        <div className="md:w-1/2 p-12 flex flex-col overflow-y-auto custom-scrollbar">
                            <div className="mb-10">
                                <span className="text-ptit-red font-black text-sm uppercase tracking-widest mb-2 block">{previewTemplate.category}</span>
                                <h2 className="text-4xl font-black text-gray-900 mb-4">{previewTemplate.name}</h2>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star size={18} fill="#f59e0b" className="text-yellow-500" />
                                        <span className="font-black text-lg">{previewTemplate.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Download size={18} />
                                        <span className="font-bold">{(previewTemplate.downloads / 1000).toFixed(1)}K sử dụng</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium italic">
                                "{previewTemplate.description}"
                            </p>

                            <div className="space-y-6 mb-10">
                                <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm border-l-4 border-ptit-red pl-4">Đặc điểm nổi bật</h4>
                                <ul className="space-y-4">
                                    {[
                                        'Tối ưu hóa cho hệ thống ATS',
                                        'Dễ dàng tùy chỉnh màu sắc và font chữ',
                                        'Bố cục chuyên nghiệp, khoa học',
                                        'Xuất file PDF chất lượng cao'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600 font-bold">
                                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                                <CheckCircle size={14} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-8 border-t border-gray-100 flex gap-4">
                                <button 
                                    onClick={() => navigate(`/cv-editor?template=${previewTemplate.id}`)}
                                    className="flex-1 bg-ptit-red text-white font-black py-5 rounded-2xl hover:bg-ptit-darkred transition-all shadow-xl shadow-ptit-red/20 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Edit3 size={20} />
                                    Dùng mẫu này ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}} />
        </div>
    );
};

export default CVTemplatesPage;
