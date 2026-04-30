import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Clock, User, Sparkles, TrendingUp } from 'lucide-react';
import { getNews } from '../services/api';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNews(data || []);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Hardcoded high-quality articles with full content
    const featuredArticles = [
        {
            id: 'h1',
            title: "PTIT Career Day 2026: Kết nối hơn 50 doanh nghiệp công nghệ hàng đầu",
            summary: "Sự kiện lớn nhất trong năm dành cho sinh viên PTIT với sự góp mặt của các 'ông lớn' như Viettel, FPT, Samsung và các tập đoàn đa quốc gia.",
            content: `
                <p>Ngày hội việc làm PTIT Career Day 2026 đã diễn ra thành công rực rỡ tại cơ sở Hà Đông, thu hút hơn 3000 lượt sinh viên tham dự. Sự kiện năm nay ghi nhận con số kỷ lục với hơn 50 doanh nghiệp đăng ký tham gia đặt gian hàng tuyển dụng.</p>
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop" class="w-full rounded-2xl my-6" />
                <h3>Cơ hội nghề nghiệp đa dạng</h3>
                <p>Từ các vị trí Software Engineer, Data Analyst đến các mảng Marketing, Design, các doanh nghiệp mang đến hàng trăm cơ hội thực tập và việc làm chính thức cho sinh viên khóa cuối và cả các bạn sinh viên năm 2, năm 3 muốn trải nghiệm thực tế.</p>
                <blockquote class="border-l-4 border-ptit-red pl-4 italic my-6 text-gray-600">
                    "PTIT Career Day không chỉ là nơi tìm việc, mà còn là nơi định hướng tương lai cho các bạn trẻ." - PGS.TS Đặng Hoài Bắc, Giám đốc Học viện.
                </blockquote>
            `,
            imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad0582373f2?q=80&w=2070&auto=format&fit=crop",
            author: "Ban Truyền thông PTIT",
            createdAt: new Date().toISOString(),
            category: "Sự kiện",
            readTime: "5 phút đọc"
        },
        {
            id: 'h2',
            title: "Xu hướng tuyển dụng ngành IT năm 2026: AI và Cloud Computing lên ngôi",
            summary: "Thị trường lao động ngành công nghệ đang thay đổi chóng mặt. Bài viết phân tích các kỹ năng quan trọng nhất mà sinh viên cần chuẩn bị.",
            content: `
                <p>Năm 2026 đánh dấu bước chuyển mình mạnh mẽ của thị trường CNTT. Việc biết lập trình đơn thuần không còn là lợi thế cạnh tranh duy nhất.</p>
                <h3>Sự thống trị của AI tạo thức (Generative AI)</h3>
                <p>Hầu hết các doanh nghiệp hiện nay đều yêu cầu ứng viên có khả năng sử dụng các công cụ AI để tối ưu hóa quy trình làm việc. Việc hiểu về Prompt Engineering và cách tích hợp AI vào sản phẩm là bắt buộc.</p>
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" class="w-full rounded-2xl my-6" />
            `,
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            author: "Chuyên gia Tuyển dụng",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            category: "Xu hướng",
            readTime: "8 phút đọc"
        }
    ];

    const openNews = (item) => {
        setSelectedNews(item);
        document.body.style.overflow = 'hidden';
    };

    const closeNews = () => {
        setSelectedNews(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen pt-24">
            {/* News Detail Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={closeNews}></div>
                    <div className="bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-[2.5rem] relative z-10 shadow-2xl custom-scrollbar animate-in zoom-in-95 duration-300">
                        <div className="h-[250px] md:h-[400px] relative">
                            <img src={selectedNews.imageUrl} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                        </div>

                        <div className="p-6 md:p-12 -mt-24 relative z-10">
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-50">
                                <span className="px-4 py-1.5 bg-ptit-red/10 text-ptit-red text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 inline-block">
                                    {selectedNews.category || "Tin tức"}
                                </span>
                                <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
                                    {selectedNews.title}
                                </h2>
                                
                                <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-gray-100 text-sm text-gray-400 font-bold">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-ptit-red" /> {selectedNews.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-ptit-red" /> {new Date(selectedNews.createdAt).toLocaleDateString('vi-VN')}
                                    </div>
                                </div>

                                <div 
                                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6"
                                    dangerouslySetInnerHTML={{ __html: selectedNews.content || selectedNews.summary }}
                                />

                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                                    <button 
                                        onClick={closeNews}
                                        className="px-10 py-4 bg-gray-900 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-ptit-red transition-all shadow-lg active:scale-95"
                                    >
                                        Đóng lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Hero Section */}
            <div className="relative bg-[#1e293b] py-16 overflow-hidden rounded-[3rem] mx-6">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-ptit-red rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-8">
                            <Sparkles size={14} className="text-yellow-400" />
                            Tin tức & Sự kiện PTIT
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Nhịp đập <span className="text-transparent bg-clip-text bg-gradient-to-r from-ptit-red to-red-400">Việc làm</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Cập nhật xu hướng tuyển dụng và hoạt động kết nối doanh nghiệp mới nhất.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-12 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* Featured Article */}
                        <div 
                            onClick={() => openNews(featuredArticles[0])}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-white transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="relative h-[450px]">
                                <img 
                                    src={featuredArticles[0].imageUrl} 
                                    alt="Featured" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 p-10 md:p-12 w-full">
                                    <span className="px-4 py-1.5 bg-ptit-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block">
                                        {featuredArticles[0].category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-red-400 transition-colors leading-tight">
                                        {featuredArticles[0].title}
                                    </h2>
                                    <div className="flex items-center gap-6 text-gray-300 text-xs font-bold tracking-widest uppercase">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-ptit-red" />
                                            {featuredArticles[0].author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-ptit-red" />
                                            {new Date(featuredArticles[0].createdAt).toLocaleDateString('vi-VN')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List Area Header */}
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                            <TrendingUp className="text-ptit-red" />
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Mới cập nhật</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Article 2 */}
                            <div 
                                onClick={() => openNews(featuredArticles[1])}
                                className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-50 group hover:border-ptit-red/20 transition-all cursor-pointer flex flex-col"
                            >
                                <div className="h-52 rounded-2xl overflow-hidden mb-6">
                                    <img 
                                        src={featuredArticles[1].imageUrl} 
                                        alt="Article" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-ptit-red transition-colors line-clamp-2">
                                    {featuredArticles[1].title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {featuredArticles[1].summary}
                                </p>
                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {new Date(featuredArticles[1].createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                    <ChevronRight size={18} className="text-ptit-red group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            {/* API Driven */}
                            {news.slice(0, 4).map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => openNews(item)}
                                    className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-50 group hover:border-ptit-red/20 transition-all cursor-pointer flex flex-col"
                                >
                                    <div className="h-52 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                        <img 
                                            src={item.imageUrl || "https://ptit.edu.vn/wp-content/uploads/2021/07/bg-header.png"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-ptit-red transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                        {item.summary}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                        <ChevronRight size={18} className="text-ptit-red group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Chủ đề HOT</h3>
                            <div className="flex flex-wrap gap-2">
                                {['AI', 'Career', 'Startup', 'Scholarship', 'Event'].map(tag => (
                                    <button key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase hover:bg-ptit-red hover:text-white transition-all">
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1e293b] rounded-[2.5rem] p-12 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ptit-red/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h3 className="text-2xl font-black text-white mb-4 relative z-10">Newsletter</h3>
                            <p className="text-gray-400 text-xs mb-10 relative z-10">Đừng bỏ lỡ các cơ hội thực tập tốt nhất.</p>
                            <button className="w-full bg-ptit-red text-white font-black py-5 rounded-2xl hover:bg-ptit-darkred transition-all shadow-xl shadow-ptit-red/20 active:scale-95 uppercase text-[10px] tracking-widest relative z-10">
                                Đăng ký ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            `}} />
        </div>
    );
};

export default NewsPage;
