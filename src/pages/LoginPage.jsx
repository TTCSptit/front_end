import React, { useState } from 'react';
import { User, Lock, ArrowRight, Briefcase, GraduationCap, Sparkles, Building2, Users, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // 'candidate' or 'recruiter'

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, role });
    
    // Save login state to sessionStorage
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', role);
    
    // Redirect based on role
    if (role === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 font-bold text-2xl shadow-lg">
              P
            </div>
            <div>
              <div className="text-3xl font-bold">PTIT JOBS</div>
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
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <div className="text-2xl font-bold text-gray-900">PTIT JOBS</div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
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
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
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
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
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
              <a href="#" className="text-red-600 hover:text-red-700 font-semibold">Quên mật khẩu?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg"
            >
              Đăng nhập
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">hoặc</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
              Facebook
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
