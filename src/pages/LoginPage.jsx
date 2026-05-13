import React, { useState } from 'react';
import { User, Lock, ArrowRight, Briefcase, GraduationCap, Building2, Users, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // 'candidate' or 'recruiter'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const apiRole = role === 'recruiter' ? 'Recruiter' : 'Candidate';
      const result = await login(email, password, apiRole);

      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userEmail', result.user?.email ?? email);
      if (result.user?.id) sessionStorage.setItem('userId', result.user.id);
      if (result.user?.fullName) sessionStorage.setItem('userFullName', result.user.fullName);

      window.dispatchEvent(new Event('authChange'));

      if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
        {/* Decorative Elements - Animated */}
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            x: [-20, 20, -20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            y: [-30, 30, -30]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
        ></motion.div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center px-16 text-white"
        >
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png" 
                alt="PTIT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight">PTIT JOBS</div>
              <div className="text-white/70 text-sm">Kết nối Tài năng - Kiến tạo Tương lai</div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Khám phá cơ hội<br />
            <span className="text-yellow-300">nghề nghiệp</span> của bạn
          </h1>
          
          <p className="text-white/80 text-lg mb-12 max-w-md">
            Hơn 5,000+ công việc từ các doanh nghiệp hàng đầu đang chờ đợi sinh viên PTIT tài năng.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3 mx-auto backdrop-blur-sm">
                <Building2 size={24} />
              </div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-white/70 text-sm">Doanh nghiệp</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3 mx-auto backdrop-blur-sm">
                <Users size={24} />
              </div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/70 text-sm">Ứng viên</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3 mx-auto backdrop-blur-sm">
                <TrendingUp size={24} />
              </div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-white/70 text-sm">Tỉ lệ việc làm</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50/50 via-gray-50 to-white relative">
        {/* Decorative elements for right side */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-red-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[460px] bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png" 
                alt="PTIT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">PTIT JOBS</div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Chào mừng bạn trở lại!
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-500">Tiếp tục hành trình sự nghiệp của bạn</p>
          </div>

          {/* Role Selection */}
          <div className="flex bg-white rounded-2xl p-1.5 mb-6 shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                role === 'candidate'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <GraduationCap size={20} />
              Ứng viên
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                role === 'recruiter'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Briefcase size={20} />
              Nhà tuyển dụng
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-200 outline-none transition-all shadow-sm"
                  placeholder="email@ptit.edu.vn"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-200 outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                <span className="text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-red-600 hover:text-red-700 font-semibold">Quên mật khẩu?</Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(220,38,38,0.7)] flex items-center justify-center gap-2 group text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              {!loading && <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
