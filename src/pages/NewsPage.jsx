import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const NewsPage = () => {
    // Mock News Data
    const news = [
        {
            id: 1,
            title: "Ngày hội việc làm PTIT 2026: Kết nối doanh nghiệp - Vững bước tương lai",
            summary: "Sự kiện được mong chờ nhất trong năm dành cho sinh viên PTIT với sự tham gia của hơn 50 doanh nghiệp hàng đầu trong lĩnh vực công nghệ, viễn thông và kinh tế.",
            date: "05/02/2026",
            image: "https://portal.ptit.edu.vn/wp-content/uploads/2020/06/IMG_9771.jpg",
            category: "Sự kiện"
        },
        {
            id: 2,
            title: "Top 5 kỹ năng IT nhà tuyển dụng tìm kiếm năm 2026",
            summary: "Báo cáo mới nhất từ VietnamWorks cho thấy nhu cầu tuyển dụng các vị trí liên quan đến AI, Cloud Computing và Cybersecurity đang tăng trưởng mạnh mẽ.",
            date: "01/02/2026",
            image: "https://codeby.net/wp-content/uploads/2023/11/ky-nang-IT-can-thiet-cho-developer.png",
            category: "Thị trường"
        },
        {
            id: 3,
            title: "Hướng dẫn viết CV và Phỏng vấn chinh phục nhà tuyển dụng khó tính",
            summary: "Chia sẻ từ chuyên gia nhân sự FPT Software về những lỗi thường gặp khi viết CV và bí quyết trả lời phỏng vấn ấn tượng.",
            date: "28/01/2026",
            image: "https://cdn.topcv.vn/800/wp-content/uploads/2020/12/cach-viet-cv-an-tuong.jpg",
            category: "Cẩm nang"
        },
        {
            id: 4,
            title: "Học bổng Samsung Talent Program 2026 chính thức mở đơn",
            summary: "Cơ hội nhận học bổng trị giá lên đến 100 triệu đồng và cơ hội làm việc chính thức tại Samsung R&D Institute Vietnam sau khi tốt nghiệp.",
            date: "25/01/2026",
            image: "https://news.samsung.com/vn/wp-content/uploads/2017/09/STP.jpg",
            category: "Học bổng"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 border-l-8 border-ptit-red pl-4">Tin tức & Sự kiện</h1>
                    <p className="text-gray-600 pl-6">Cập nhật thông tin mới nhất về thị trường việc làm và hoạt động của PTIT</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main News List */}
                    <div className="lg:col-span-2 space-y-8">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row h-full md:h-64 border border-gray-100 group cursor-pointer">
                                <div className="md:w-2/5 h-48 md:h-full overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                                    <div>
                                        <span className="text-ptit-red font-bold text-xs uppercase tracking-wider mb-2 block">{item.category}</span>
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-ptit-red transition-colors mb-3 line-clamp-2">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Calendar size={16} />
                                            {item.date}
                                        </div>
                                        <button className="text-ptit-red font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Xem chi tiết <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">Chủ đề nổi bật</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Tuyển dụng', 'Thực tập', 'Học bổng', 'Kỹ năng mềm', 'Công nghệ', 'Sự kiện PTIT', 'Start-up', 'Phỏng vấn'].map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-red-50 hover:text-ptit-red cursor-pointer transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-ptit-red to-ptit-darkred rounded-xl p-6 text-white text-center">
                            <h3 className="font-bold text-xl mb-2">Đăng ký nhận tin</h3>
                            <p className="text-red-100 text-sm mb-6">Nhận thông tin việc làm và sự kiện mới nhất trực tiếp qua email của bạn.</p>
                            <input 
                                type="email" 
                                placeholder="Email của bạn..." 
                                className="w-full px-4 py-3 rounded-lg text-gray-900 text-sm mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button className="w-full bg-yellow-400 text-red-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors">
                                Đăng ký ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
