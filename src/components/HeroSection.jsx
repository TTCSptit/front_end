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
    <section className="relative min-h-[600px] flex items-center justify-center -mt-20 pt-20 overflow-hidden bg-ptit-deep-crimson">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a50808] via-ptit-deep-crimson to-[#7a0606]"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-red-400/20 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
        ></motion.div>
      </div>

      {/* Background pattern overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"
      ></motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter font-heading"
        >
          <span className="inline-block hover:scale-105 transition-transform cursor-default drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">Cổng thông tin</span> <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400/90 via-white to-yellow-300/90 drop-shadow-[0_4px_10px_rgba(192,9,9,0.2)]">Việc làm & Thực tập</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-white/90 text-lg md:text-2xl mb-14 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm"
        >
          Hành trình sự nghiệp của sinh viên <span className="text-yellow-400 font-bold underline underline-offset-8 decoration-yellow-400/30 drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">PTIT</span> bắt đầu từ đây.
        </motion.p>

        {/* Search Box with Deep Glassmorphism */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/95 backdrop-blur-2xl p-3 rounded-[2rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_50px_110px_-15px_rgba(0,0,0,0.4)] max-w-5xl mx-auto flex flex-col md:flex-row gap-3 border border-white focus-within:ring-8 focus-within:ring-white/20 transition-all duration-700"
        >
          <div className="flex-[1.5] flex items-center px-6 py-5 bg-gray-50/80 rounded-2xl focus-within:bg-white focus-within:shadow-xl transition-all group border border-transparent focus-within:border-red-100">
             <Search className="text-gray-400 mr-4 shrink-0 group-focus-within:text-ptit-red group-focus-within:scale-110 transition-all" size={24} />
             <input 
               type="text" 
               placeholder="Vị trí tuyển dụng, kỹ năng, công ty..." 
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-400 font-medium text-lg"
               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
             />
          </div>

          <div className="hidden md:block w-px h-10 self-center bg-gray-200/50"></div>

          <div className="flex-1 flex items-center px-5 py-4 bg-gray-50/80 rounded-2xl border border-transparent focus-within:border-red-100 focus-within:bg-white focus-within:shadow-xl transition-all group">
             <Briefcase className="text-gray-400 mr-4 shrink-0 group-focus-within:text-ptit-red transition-all" size={20} />
             <select 
               className="bg-transparent w-full outline-none text-gray-800 cursor-pointer font-medium appearance-none"
               value={industry}
               onChange={(e) => setIndustry(e.target.value)}
             >
               <option value="">Ngành nghề</option>
               <option>Công nghệ thông tin</option>
               <option>Viễn thông</option>
               <option>Marketing</option>
               <option>Kế toán - Kiểm toán</option>
             </select>
          </div>

          <div className="hidden md:block w-px h-10 self-center bg-gray-200/50"></div>

          <div className="flex-1 flex items-center px-5 py-4 bg-gray-50/80 rounded-2xl border border-transparent focus-within:border-red-100 focus-within:bg-white focus-within:shadow-xl transition-all group">
             <MapPin className="text-gray-400 mr-4 shrink-0 group-focus-within:text-ptit-red transition-all" size={20} />
             <select 
               className="bg-transparent w-full outline-none text-gray-800 cursor-pointer font-medium appearance-none"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
             >
               <option value="">Địa điểm</option>
               <option>Hà Nội</option>
               <option>TP. Hồ Chí Minh</option>
               <option>Đà Nẵng</option>
               <option>Remote</option>
             </select>
          </div>

          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px -12px rgba(192,9,9,0.5)",
              filter: "brightness(0.9)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-gradient-to-r from-ptit-red to-red-700 text-white font-black py-5 px-10 rounded-2xl hover:from-ptit-darkred hover:to-ptit-red transition-all shadow-xl shadow-red-200 whitespace-nowrap text-lg tracking-wide uppercase relative overflow-hidden group/btn"
          >
             <span className="relative z-10">Tìm kiếm ngay</span>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
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
