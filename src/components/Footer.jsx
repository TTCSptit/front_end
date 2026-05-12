import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Liên hệ</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin className="text-ptit-red shrink-0 mt-1 transition-transform group-hover:scale-110" size={18} />
                <span className="group-hover:text-gray-300 transition-colors">Trụ sở chính: 122 Hoàng Quốc Việt, Cổ Nhuế, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="text-ptit-red shrink-0 mt-1 transition-transform group-hover:scale-110" size={18} />
                <span className="group-hover:text-gray-300 transition-colors">Cơ sở TP.HCM: 11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1 TP Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="text-ptit-red shrink-0 mt-1 transition-transform group-hover:scale-110" size={18} />
                <span className="group-hover:text-gray-300 transition-colors">Cơ sở đào tạo Hà Đông: Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="text-ptit-red shrink-0 transition-transform group-hover:scale-110" size={18} />
                <a href="mailto:job@ptit.edu.vn" className="hover:text-white transition-colors">job@ptit.edu.vn</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Về chúng tôi</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Giới thiệu chung', 'Cơ cấu tổ chức', 'Tuyển sinh', 'Đào tạo', 'Nghiên cứu khoa học', 'Hợp tác quốc tế'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-ptit-red transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-ptit-red transition-all group-hover:w-3"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           {/* Column 3: Portals */}
           <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Cổng thông tin</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: 'Học viện Công nghệ Bưu chính Viễn thông', url: 'https://ptit.edu.vn' },
                { name: 'Học viện cơ sở tại TP. Hồ Chí Minh', url: 'https://ptithcm.edu.vn' },
                { name: 'Cổng thông tin đào tạo', url: '#' },
                { name: 'Cổng thông tin khoa học công nghệ', url: '#' },
                { name: 'Trung tâm Đào tạo Bưu chính Viễn thông I', url: '#' }
              ].map((portal) => (
                <li key={portal.name}>
                  <a href={portal.url} target="_blank" rel="noopener noreferrer" className="hover:text-ptit-red transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-ptit-red transition-all group-hover:w-3"></span>
                    {portal.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Đăng ký nhận tin</h3>
            <p className="text-gray-400 text-sm mb-4">Để lại email để nhận thông tin tuyển dụng mới nhất.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-ptit-red focus:outline-none transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-ptit-red text-white font-bold py-3 rounded-xl hover:bg-ptit-darkred transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Đăng ký ngay
                <ArrowRight size={16} />
              </motion.button>
            </div>
            
            <div className="mt-10">
              <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook size={20} />, color: 'hover:bg-[#1877F2]' },
                  { icon: <Youtube size={20} />, color: 'hover:bg-[#FF0000]' },
                  { icon: <Globe size={20} />, color: 'hover:bg-ptit-red' }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href="#" 
                    className={`bg-gray-800 p-2.5 rounded-full transition-all text-gray-400 hover:text-white ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Học viện Công nghệ Bưu chính Viễn thông. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
