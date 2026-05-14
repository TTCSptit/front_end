import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, Briefcase, Plus, LogOut, MessageSquare, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isNeonMode, setIsNeonMode] = useState(localStorage.getItem('neonMode') === 'true');
  
  // Check login state from sessionStorage
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNeonMode) {
      document.documentElement.classList.add('neon-mode');
    } else {
      document.documentElement.classList.remove('neon-mode');
    }
    localStorage.setItem('neonMode', isNeonMode);
  }, [isNeonMode]);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-card shadow-[0_8px_32px_rgba(0,0,0,0.05)] h-16' 
        : 'bg-white h-20'
    }`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center gap-3 group relative">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center relative z-10"
              >
                <div className="absolute inset-0 bg-ptit-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png" 
                  alt="PTIT Logo" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </motion.div>
              <div className="flex flex-col relative z-10">
                <span className="text-ptit-red font-black text-2xl leading-none group-hover:text-ptit-darkred transition-colors font-heading tracking-tighter flex items-center relative overflow-hidden">
                  <span className="relative z-10">JOBS</span>
                  <motion.span 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20"
                  ></motion.span>
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-1 w-1.5 h-1.5 bg-ptit-red rounded-full shadow-[0_0_8px_rgba(192,9,9,0.6)]"
                  ></motion.span>
                </span>
                <span className="text-slate-400 text-[9px] font-black tracking-[0.3em] transition-all uppercase group-hover:text-ptit-red/60">ptit.edu.vn</span>
              </div>
            </Link>
            {(location.pathname.startsWith('/recruiter') || (isLoggedIn && userRole === 'recruiter')) && (
              <div className="hidden lg:flex items-center gap-3 pl-6 ml-6 border-l border-gray-100">
                <Link to="/recruiter/dashboard" className="px-5 py-2 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all active:scale-95">
                  Quản lý tin
                </Link>
                <Link to="/recruiter/post-job" className="px-5 py-2 bg-ptit-red text-white text-sm font-bold rounded-lg hover:bg-ptit-darkred transition-all shadow-md shadow-red-100 active:scale-95">
                  Đăng tin ngay
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
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
                    className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </>
            ) : (
              <>
                <Link to="/home" className={`font-semibold transition-all relative group ${location.pathname === '/home' ? 'text-ptit-red' : 'text-gray-600 hover:text-ptit-red'}`}>
                  Trang chủ
                  <span className={`absolute -bottom-1 left-0 h-1 bg-ptit-darkred transition-all ${location.pathname === '/home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                {isLoggedIn && userRole === 'candidate' && (
                  <Link to="/profile" className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group">
                    Trang cá nhân
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                  </Link>
                )}
                <Link to="/applied-jobs" className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group">
                  Việc làm đã nộp
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/industries" className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group">
                  Ngành nghề
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/cv-templates" className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group">
                  CV Templates
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/news" className="font-semibold text-gray-600 hover:text-ptit-red transition-all relative group">
                  Tin tức
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ptit-red transition-all group-hover:w-full"></span>
                </Link>
              </>
            )}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Neon Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNeonMode(!isNeonMode)}
              className={`p-2.5 rounded-xl transition-all duration-500 flex items-center justify-center shadow-sm border ${
                isNeonMode 
                  ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                  : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-ptit-red hover:border-ptit-red/20'
              }`}
              title="Chế độ Neon"
            >
              <Zap size={20} className={isNeonMode ? 'fill-yellow-400 animate-pulse' : ''} />
            </motion.button>

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span className="text-xs text-gray-700 font-bold pr-1">
                    {userRole === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                  </span>
                </div>
                <Link 
                  to={userRole === 'recruiter' ? '/recruiter/messages' : '/messages'} 
                  className="p-2.5 text-gray-600 hover:text-ptit-red hover:bg-red-50 rounded-full transition-all relative active:scale-90"
                  title="Tin nhắn"
                >
                  <MessageSquare size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-ptit-red rounded-full border-2 border-white"></span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-90"
                  title="Đăng xuất"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-ptit-red font-bold text-sm transition-all active:scale-95">
                  Đăng nhập
                </Link>
                <Link 
                  to={location.pathname.startsWith('/recruiter') ? '/home' : '/recruiter'} 
                  className="px-5 py-2.5 bg-ptit-red text-white rounded-full hover:bg-ptit-darkred transition-all font-bold text-sm shadow-lg shadow-red-100 active:scale-95"
                >
                  {location.pathname.startsWith('/recruiter') ? 'Dành cho Ứng viên' : 'Dành cho Nhà tuyển dụng'}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsNeonMode(!isNeonMode)}
              className={`p-2 rounded-full transition-all duration-500 ${
                isNeonMode 
                  ? 'bg-yellow-400/20 text-yellow-400' 
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              <Zap size={20} className={isNeonMode ? 'fill-yellow-400 animate-pulse' : ''} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-ptit-red hover:bg-gray-50 rounded-full transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-50 bg-white overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-3">
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
                      className="font-bold text-gray-600 p-3 text-left hover:bg-gray-50 rounded-xl transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <Link to="/home" className={`font-bold p-3 rounded-xl ${location.pathname === '/home' ? 'text-ptit-red bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
                  <Link to="/applied-jobs" className="font-bold text-gray-600 p-3 hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Việc làm đã nộp</Link>
                  <Link to="/industries" className="font-bold text-gray-600 p-3 hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Ngành nghề</Link>
                  <Link to="/cv-templates" className="font-bold text-gray-600 p-3 hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>CV Templates</Link>
                  <Link to="/news" className="font-bold text-gray-600 p-3 hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Tin tức</Link>
                </>
              )}
              
              <div className="border-t border-gray-50 my-2 pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ptit-red shadow-sm">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Đã đăng nhập với tư cách</span>
                        <span className="text-sm text-gray-900 font-bold">
                          {userRole === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                        </span>
                      </div>
                    </div>
                    {userRole === 'recruiter' && (
                      <Link to="/recruiter/dashboard" className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl justify-center font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}>
                        Quản lý tin
                      </Link>
                    )}
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 text-red-600 bg-red-50 rounded-xl justify-center font-bold"
                    >
                      <LogOut size={18} />
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-2 px-4 py-3 text-gray-700 border border-gray-100 rounded-xl justify-center font-bold" onClick={() => setIsMenuOpen(false)}>
                      Đăng nhập
                    </Link>
                    <Link 
                      to={location.pathname.startsWith('/recruiter') ? '/home' : '/recruiter'} 
                      className="flex items-center gap-2 px-4 py-3 bg-ptit-red text-white rounded-xl justify-center font-bold shadow-lg shadow-red-100" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {location.pathname.startsWith('/recruiter') ? 'Dành cho Ứng viên' : 'Dành cho Nhà tuyển dụng'}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
