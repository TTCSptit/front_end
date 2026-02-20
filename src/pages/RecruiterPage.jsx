import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle, Award, Target, Zap, 
  BarChart, Search, BookOpen, Coffee, Handshake, 
  Newspaper, ChevronRight, Download, Monitor, FileText 
} from 'lucide-react';

const RecruiterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Navigation */}


      <div className="pb-20">
        
        {/* Section 1: Lý do (Reasons) */}
        <section id="ly-do" className="pt-20 pb-16 bg-gradient-to-b from-red-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">6 Lý do Hàng đầu</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tại sao hơn 500+ doanh nghiệp lựa chọn tuyển dụng tại Học viện Công nghệ Bưu chính Viễn thông?
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="text-ptit-red" size={40} />,
                  title: "Chất lượng đào tạo hàng đầu",
                  desc: "PTIT là một trong những trường đại học trọng điểm quốc gia về ICT, cung cấp nguồn nhân lực chất lượng cao được đào tạo bài bản."
                },
                {
                  icon: <Users className="text-blue-600" size={40} />,
                  title: "20,000+ Sinh viên tài năng",
                  desc: "Tiếp cận cộng đồng sinh viên đông đảo, năng động, sáng tạo và sẵn sàng làm việc ngay khi ra trường."
                },
                {
                  icon: <Zap className="text-yellow-500" size={40} />,
                  title: "Kỹ năng thực tế vững vàng",
                  desc: "Sinh viên được trang bị kỹ năng thực hành chuyên sâu, khả năng ngoại ngữ và kỹ năng mềm tốt để thích nghi nhanh chóng."
                },
                {
                  icon: <Target className="text-green-600" size={40} />,
                  title: "Đúng người, đúng việc",
                  desc: "Hệ thống AI Matching giúp kết nối doanh nghiệp với những ứng viên phù hợp nhất theo yêu cầu công việc."
                },
                {
                  icon: <Handshake className="text-purple-600" size={40} />,
                  title: "Hợp tác bền vững",
                  desc: "PTIT cam kết đồng hành cùng doanh nghiệp trong việc phát triển nguồn nhân lực lâu dài và bền vững."
                },
                {
                  icon: <Monitor className="text-indigo-600" size={40} />,
                  title: "Nền tảng công nghệ số",
                  desc: "Hệ thống tuyển dụng hiện đại, dễ sử dụng, hỗ trợ đa nền tảng giúp tối ưu hóa quy trình tuyển dụng."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
                  <div className="mb-6 p-4 bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 3: Quy trình (Process) */}
        <section id="quy-trinh" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quy trình Tuyển dụng Đơn giản</h2>
              <p className="text-gray-600">5 Bước để kết nối với nhân tài PTIT</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 hidden md:block transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {[
                  { step: "01", title: "Đăng ký", desc: "Tạo tài khoản nhà tuyển dụng" },
                  { step: "02", title: "Đăng tin", desc: "Soạn nội dung tuyển dụng hấp dẫn" },
                  { step: "03", title: "Sàng lọc", desc: "Hệ thống gợi ý ứng viên phù hợp" },
                  { step: "04", title: "Phỏng vấn", desc: "Đặt lịch và phỏng vấn ứng viên" },
                  { step: "05", title: "Tiếp nhận", desc: "Gửi offer và hoàn tất tuyển dụng" }
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center bg-gray-50 md:bg-transparent">
                    <div className="w-16 h-16 rounded-full bg-ptit-red text-white flex items-center justify-center text-xl font-bold shadow-lg mb-4 border-4 border-white">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-500 px-2">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Công cụ (Tools) */}
        <section id="cong-cu" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bộ công cụ tối ưu cho HR</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Giải pháp công nghệ toàn diện giúp tối ưu hóa 100% quy trình tuyển dụng của doanh nghiệp.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-yellow-500" size={32} />,
                  title: "AI Matching Thông Minh",
                  desc: "Tự động phân tích yêu cầu công việc và đề xuất top 10% ứng viên phù hợp nhất dựa trên kỹ năng và kinh nghiệm."
                },
                {
                  icon: <FileText className="text-ptit-red" size={32} />,
                  title: "Hệ thống Quản trị Ứng viên (ATS)",
                  desc: "Quản lý tập trung toàn bộ hồ sơ, theo dõi trạng thái ứng tuyển và quy trình phỏng vấn một cách khoa học."
                },
                {
                  icon: <Target className="text-blue-600" size={32} />,
                  title: "Employer Branding",
                  desc: "Trang thương hiệu doanh nghiệp chuyên nghiệp, thu hút nhân tài bằng văn hóa và môi trường làm việc độc đáo."
                },
                {
                  icon: <BarChart className="text-green-600" size={32} />,
                  title: "Báo cáo & Phân tích Chuyên sâu",
                  desc: "Thống kê hiệu quả tin đăng, tỷ lệ chuyển đổi và phân tích nguồn ứng viên để tối ưu hóa ngân sách tuyển dụng."
                },
                {
                  icon: <Users className="text-purple-600" size={32} />,
                  title: "Truyền thông Đa kênh",
                  desc: "Tự động đẩy tin tuyển dụng lên Mạng xã hội, Email Marketing và các cộng đồng sinh viên PTIT chính thống."
                },
                {
                  icon: <Monitor className="text-indigo-600" size={32} />,
                  title: "Quản trị Phân quyền",
                  desc: "Hỗ trợ làm việc nhóm giữa HR và các Lead chuyên môn với hệ thống phân quyền và phê duyệt linh hoạt."
                }
              ].map((tool, index) => (
                <div key={index} className="flex gap-5 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-red-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-ptit-red rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-3"> Bạn đang cần một giải pháp tùy chỉnh?</h3>
                <p className="opacity-90">
                  Chúng tôi sẵn sàng tư vấn và xây dựng bộ công cụ riêng biệt phù hợp với quy mô và đặc thù tuyển dụng của doanh nghiệp bạn.
                </p>
              </div>
              <Link to="/recruiter/post-job" className="px-8 py-3 bg-white text-ptit-red font-bold rounded-xl hover:bg-gray-100 transition shadow-lg shrink-0">
                Tư vấn giải pháp ngay
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Hợp tác (Cooperation) */}
        <section id="hop-tac" className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Đối tác Chiến lược</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              Chúng tôi tự hào là đối tác tin cậy của các tập đoàn công nghệ hàng đầu Việt Nam và Quốc tế.
            </p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 mb-20 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Logos placeholders */}
              <div className="text-2xl font-bold">SAMSUNG</div>
              <div className="text-2xl font-bold">FPT SOFTWARE</div>
              <div className="text-2xl font-bold">VIETTEL</div>
              <div className="text-2xl font-bold">VNPT</div>
              <div className="text-2xl font-bold">CMC GLOBAL</div>
              <div className="text-2xl font-bold">VNG</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-10 max-w-4xl mx-auto backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-bold mb-2">Trở thành Đối tác Toàn diện</h3>
                  <p className="text-gray-300 mb-6">
                    Ký kết thỏa thuận hợp tác đào tạo và tuyển dụng, nhận ưu đãi đặc biệt và tiếp cận nguồn nhân lực chất lượng cao sớm nhất.
                  </p>
                  <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded hover:bg-gray-200 transition">
                    Liên hệ Hợp tác ngay
                  </button>
                </div>
                <div className="w-full md:w-1/3 text-left border-l border-gray-600 pl-8">
                  <div className="mb-4">
                    <div className="text-sm text-gray-400">Hotline Hợp tác</div>
                    <div className="text-xl font-bold">024 3333 8888</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-xl font-bold">headhunt@ptit.edu.vn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Tin tức (News) */}
        <section id="tin-tuc" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Thông tin Hữu ích</h2>
                <p className="text-gray-600">Dành cho Nhà tuyển dụng</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-ptit-red font-medium">
                Xem tất cả <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  tag: "Thị trường",
                  title: "Xu hướng tuyển dụng ngành IT năm 2026: AI & Automation lên ngôi",
                  date: "06/02/2026"
                },
                { 
                  img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  tag: "Bí quyết",
                  title: "Cách xây dựng thương hiệu tuyển dụng thu hút Gen Z",
                  date: "05/02/2026"
                },
                { 
                  img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  tag: "Sự kiện",
                  title: "Ngày hội việc làm PTIT Career Day 2026 sắp diễn ra",
                  date: "01/02/2026"
                }
              ].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-4 h-48">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Newspaper size={14} /> {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-ptit-red transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
            
            <button className="md:hidden w-full mt-8 py-3 border border-gray-300 rounded-lg text-gray-600 font-medium">
              Xem tất cả tin tức
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RecruiterPage;
