import React, { useState } from 'react';
import { Search, Menu, X, User, Briefcase, Plus, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check login state from sessionStorage
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userRole = sessionStorage.getItem('userRole');

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-ptit-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div className="flex flex-col">
                <span className="text-ptit-red font-bold text-xl leading-none">JOBS</span>
                <span className="text-gray-600 text-xs font-medium tracking-wider">PTIT.EDU.VN</span>
              </div>
            </Link>
            {(location.pathname.startsWith('/recruiter') || (isLoggedIn && userRole === 'recruiter')) && (
              <div className="hidden md:flex items-center gap-3 pl-4">
                <Link to="/recruiter/dashboard" className="px-5 py-2 border border-gray-300 text-gray-700 text-sm font-bold rounded hover:bg-gray-50 transition">
                  Quản lý tin
                </Link>
                <Link to="/recruiter/post-job" className="px-5 py-2 bg-ptit-red text-white text-sm font-bold rounded hover:bg-red-700 transition">
                  Đăng tin ngay
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {location.pathname.startsWith('/recruiter') ? (
              <>
                {location.pathname === '/recruiter' && ['Lý do', 'Hình thức', 'Quy trình', 'Công cụ', 'Hợp tác', 'Tin tức'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      const map = {
                        'Lý do': 'ly-do',
                        'Hình thức': 'hinh-thuc',
                        'Quy trình': 'quy-trinh',
                        'Công cụ': 'cong-cu',
                        'Hợp tác': 'hop-tac',
                        'Tin tức': 'tin-tuc'
                      };
                      const element = document.getElementById(map[item]);
                      if (element) {
                        const offset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }}
                    className="font-medium text-gray-600 hover:text-ptit-red transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </>
            ) : (
              <>
                <Link to="/home" className="font-medium text-ptit-red hover:text-ptit-darkred transition-colors">Trang chủ</Link>
                <Link to="/applied-jobs" className="font-medium text-gray-600 hover:text-ptit-red transition-colors">Việc làm đã nộp</Link>
                <Link to="/industries" className="font-medium text-gray-600 hover:text-ptit-red transition-colors">Ngành nghề</Link>
                <Link to="/cv-templates" className="font-medium text-gray-600 hover:text-ptit-red transition-colors">CV Templates</Link>
                <Link to="/news" className="font-medium text-gray-600 hover:text-ptit-red transition-colors">Tin tức</Link>
              </>
            )}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <User size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">
                    {userRole === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-ptit-red hover:bg-red-50 rounded-lg transition-colors font-medium">
                  <User size={18} />
                  Đăng nhập
                </Link>
                {location.pathname.startsWith('/recruiter') ? (
                  <Link to="/home" className="flex items-center gap-2 px-4 py-2 bg-ptit-red text-white rounded-lg hover:bg-ptit-darkred transition-colors font-medium shadow-md shadow-red-100">
                    <User size={18} />
                    Ứng viên
                  </Link>
                ) : (
                  <Link to="/recruiter" className="flex items-center gap-2 px-4 py-2 bg-ptit-red text-white rounded-lg hover:bg-ptit-darkred transition-colors font-medium shadow-md shadow-red-100">
                    <Briefcase size={18} />
                    Nhà tuyển dụng
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-ptit-red hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col p-4 space-y-4">
            {location.pathname.startsWith('/recruiter') ? (
              <>
                {location.pathname === '/recruiter' && ['Lý do', 'Hình thức', 'Quy trình', 'Công cụ', 'Hợp tác', 'Tin tức'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      const map = {
                        'Lý do': 'ly-do',
                        'Hình thức': 'hinh-thuc',
                        'Quy trình': 'quy-trinh',
                        'Công cụ': 'cong-cu',
                        'Hợp tác': 'hop-tac',
                        'Tin tức': 'tin-tuc'
                      };
                      const element = document.getElementById(map[item]);
                      if (element) {
                        const offset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                        setIsMenuOpen(false);
                      }
                    }}
                    className="font-medium text-gray-600 p-2 text-left border-l-2 border-transparent hover:border-ptit-red transition-all"
                  >
                    {item}
                  </button>
                ))}
              </>
            ) : (
              <>
                <Link to="/home" className="font-medium text-ptit-red bg-red-50 p-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
                <Link to="/applied-jobs" className="font-medium text-gray-600 p-2" onClick={() => setIsMenuOpen(false)}>Việc làm đã nộp</Link>
                <Link to="/industries" className="font-medium text-gray-600 p-2" onClick={() => setIsMenuOpen(false)}>Ngành nghề</Link>
                <Link to="/cv-templates" className="font-medium text-gray-600 p-2" onClick={() => setIsMenuOpen(false)}>CV Templates</Link>
                <Link to="/news" className="font-medium text-gray-600 p-2" onClick={() => setIsMenuOpen(false)}>Tin tức</Link>
              </>
            )}
            <div className="border-t border-gray-100 my-2 pt-2 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg justify-center">
                    <User size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {userRole === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                    </span>
                  </div>
                  {userRole === 'recruiter' && (
                    <Link to="/recruiter/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg w-full justify-center font-bold" onClick={() => setIsMenuOpen(false)}>
                      <Briefcase size={18} />
                      Quản lý tin
                    </Link>
                  )}
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg w-full justify-center font-medium"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg w-full justify-center" onClick={() => setIsMenuOpen(false)}>
                    <User size={18} />
                    Đăng nhập
                  </Link>
                  {location.pathname.startsWith('/recruiter') ? (
                    <>
                      <Link to="/recruiter/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg w-full justify-center font-bold" onClick={() => setIsMenuOpen(false)}>
                        <Briefcase size={18} />
                        Quản lý tin
                      </Link>
                      <Link to="/recruiter/post-job" className="flex items-center gap-2 px-4 py-3 bg-ptit-red text-white rounded-lg w-full justify-center font-bold" onClick={() => setIsMenuOpen(false)}>
                        <Plus size={18} />
                        Đăng tin ngay
                      </Link>
                      <Link to="/home" className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg w-full justify-center" onClick={() => setIsMenuOpen(false)}>
                        <User size={18} />
                        Ứng viên
                      </Link>
                    </>
                  ) : (
                    <Link to="/recruiter" className="flex items-center gap-2 px-4 py-2 bg-ptit-red text-white rounded-lg w-full justify-center" onClick={() => setIsMenuOpen(false)}>
                      <Briefcase size={18} />
                      Nhà tuyển dụng
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
