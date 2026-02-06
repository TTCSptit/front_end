import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-ptit-red to-red-600 min-h-[500px] flex items-center justify-center -mt-20 pt-20">
      {/* Background pattern overlay could go here */}
      <div className="absolute inset-0 bg-[url('https://ptit.edu.vn/wp-content/uploads/2021/07/bg-header.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
          Cổng thông tin Việc làm & <br/> Thực tập PTIT
        </h1>
        <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Kết nối sinh viên Học viện Công nghệ Bưu chính Viễn thông với hàng ngàn cơ hội nghề nghiệp từ các doanh nghiệp hàng đầu.
        </p>

        {/* Search Box */}
        <div className="bg-white p-3 rounded-xl shadow-2xl max-w-4xl mx-auto transform translate-y-8 flex flex-col md:flex-row gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg focus-within:ring-2 focus-within:ring-red-100 transition-shadow">
             <Search className="text-gray-400 mr-3 shrink-0" />
             <input 
               type="text" 
               placeholder="Tìm kiếm việc làm, công ty..." 
               className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
             />
          </div>

          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg border-l border-white md:border-l-0 md:border-r border-gray-100 focus-within:ring-2 focus-within:ring-red-100 transition-shadow">
             <Briefcase className="text-gray-400 mr-3 shrink-0" />
             <select className="bg-transparent w-full outline-none text-gray-700 cursor-pointer">
               <option value="">Tất cả ngành nghề</option>
               <option>Công nghệ thông tin</option>
               <option>Viễn thông</option>
               <option>Marketing</option>
               <option>Kế toán - Kiểm toán</option>
             </select>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg focus-within:ring-2 focus-within:ring-red-100 transition-shadow">
             <MapPin className="text-gray-400 mr-3 shrink-0" />
             <select className="bg-transparent w-full outline-none text-gray-700 cursor-pointer">
               <option value="">Tất cả địa điểm</option>
               <option>Hà Nội</option>
               <option>TP. Hồ Chí Minh</option>
               <option>Đà Nẵng</option>
               <option>Remote</option>
             </select>
          </div>

          <button className="bg-ptit-red text-white font-bold py-3 px-8 rounded-lg hover:bg-ptit-darkred transition-all shadow-lg shadow-red-200 whitespace-nowrap active:scale-95">
            Tìm kiếm
          </button>
        </div>
      </div>
      
      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-gray-50">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
      </div>
    </section>
  );
};

export default HeroSection;
