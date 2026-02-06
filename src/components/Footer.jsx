import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Liên hệ</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-ptit-red shrink-0 mt-1" size={18} />
                <span>Trụ sở chính: 122 Hoàng Quốc Việt, Cổ Nhuế, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-ptit-red shrink-0 mt-1" size={18} />
                <span>Cơ sở TP.HCM: 11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1 TP Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-ptit-red shrink-0 mt-1" size={18} />
                <span>Cơ sở đào tạo Hà Đông: Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-ptit-red shrink-0" size={18} />
                <a href="mailto:job@ptit.edu.vn" className="hover:text-white transition-colors">job@ptit.edu.vn</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Về chúng tôi</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-ptit-red transition-colors">Giới thiệu chung</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Cơ cấu tổ chức</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Tuyển sinh</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Đào tạo</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Nghiên cứu khoa học</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Hợp tác quốc tế</a></li>
            </ul>
          </div>

           {/* Column 3: Portals */}
           <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-ptit-red pl-3 uppercase">Cổng thông tin</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="https://ptit.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:text-ptit-red transition-colors">Học viện Công nghệ Bưu chính Viễn thông</a></li>
              <li><a href="https://ptithcm.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:text-ptit-red transition-colors">Học viện cơ sở tại TP. Hồ Chí Minh</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Cổng thông tin đào tạo</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Cổng thông tin khoa học công nghệ</a></li>
              <li><a href="#" className="hover:text-ptit-red transition-colors">Trung tâm Đào tạo Bưu chính Viễn thông I</a></li>
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
                className="bg-gray-800 border-none rounded-lg px-4 py-3 text-sm text-white focus:ring-2 focus:ring-ptit-red focus:outline-none"
              />
              <button className="bg-ptit-red text-white font-bold py-2 rounded-lg hover:bg-ptit-darkred transition-colors text-sm uppercase tracking-wide">
                Đăng ký ngay
              </button>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-bold text-white mb-3 uppercase">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#1877F2] hover:text-white transition-all text-gray-400">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF0000] hover:text-white transition-all text-gray-400">
                  <Youtube size={20} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-ptit-red hover:text-white transition-all text-gray-400">
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Học viện Công nghệ Bưu chính Viễn thông. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
