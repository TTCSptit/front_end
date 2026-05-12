import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (industry) params.append('industry', industry);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative bg-gradient-to-r from-ptit-red to-red-600 min-h-[500px] flex items-center justify-center -mt-20 pt-20 overflow-hidden">
      {/* Background pattern overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('https://ptit.edu.vn/wp-content/uploads/2021/07/bg-header.png')] bg-cover bg-center mix-blend-overlay"
      ></motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight font-heading drop-shadow-sm"
        >
          Cổng thông tin Việc làm & <br/> Thực tập PTIT
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-red-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Kết nối sinh viên Học viện Công nghệ Bưu chính Viễn thông với hàng ngàn cơ hội nghề nghiệp từ các doanh nghiệp hàng đầu.
        </motion.p>

        {/* Search Box with Deep Glassmorphism */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] max-w-5xl mx-auto transform translate-y-8 flex flex-col md:flex-row gap-2 border border-white/40 focus-within:ring-4 focus-within:ring-red-500/10 transition-all duration-500"
        >
          <div className="flex-[1.5] flex items-center px-5 py-4 bg-gray-50/50 rounded-xl focus-within:bg-white focus-within:shadow-inner transition-all group">
             <Search className="text-gray-400 mr-3 shrink-0 group-focus-within:text-ptit-red group-focus-within:scale-110 transition-all" size={20} />
             <input 
               type="text" 
               placeholder="Tìm kiếm việc làm, công ty..." 
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
             />
          </div>

          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg border-l border-white md:border-l-0 md:border-r border-gray-100 focus-within:ring-2 focus-within:ring-red-100 transition-shadow">
             <Briefcase className="text-gray-400 mr-3 shrink-0" />
             <select 
               className="bg-transparent w-full outline-none text-gray-700 cursor-pointer"
               value={industry}
               onChange={(e) => setIndustry(e.target.value)}
             >
               <option value="">Tất cả ngành nghề</option>
               <option>Công nghệ thông tin</option>
               <option>Viễn thông</option>
               <option>Marketing</option>
               <option>Kế toán - Kiểm toán</option>
             </select>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg focus-within:ring-2 focus-within:ring-red-100 transition-shadow">
             <MapPin className="text-gray-400 mr-3 shrink-0" />
             <select 
               className="bg-transparent w-full outline-none text-gray-700 cursor-pointer"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
             >
               <option value="">Tất cả địa điểm</option>
               <option>Hà Nội</option>
               <option>TP. Hồ Chí Minh</option>
               <option>Đà Nẵng</option>
               <option>Remote</option>
             </select>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="bg-ptit-red text-white font-bold py-3 px-8 rounded-lg hover:bg-ptit-darkred transition-all shadow-lg shadow-red-200 whitespace-nowrap"
          >
            Tìm kiếm
          </motion.button>
        </motion.div>
      </motion.div>
      
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
