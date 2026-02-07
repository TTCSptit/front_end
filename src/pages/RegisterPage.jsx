import React, { useState } from 'react';
import { User, Briefcase, Mail, Lock, ArrowRight, GraduationCap, Sparkles, CheckCircle, Shield, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('candidate'); // 'candidate' or 'employer'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to sessionStorage and redirect
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', userType === 'employer' ? 'recruiter' : 'candidate');
    
    if (userType === 'employer') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/home');
    }
  };

  const benefits = userType === 'candidate' 
    ? [
        { icon: Zap, text: 'Truy cập 5,000+ việc làm' },
        { icon: Shield, text: 'Bảo mật thông tin cá nhân' },
        { icon: CheckCircle, text: 'Ứng tuyển nhanh chóng' }
      ]
    : [
        { icon: Zap, text: 'Tiếp cận 10,000+ ứng viên' },
        { icon: Shield, text: 'Đăng tin miễn phí' },
        { icon: CheckCircle, text: 'Quản lý tuyển dụng dễ dàng' }
      ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
        
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
            Bắt đầu hành trình<br />
            <span className="text-yellow-300">sự nghiệp</span> của bạn
          </h1>
          
          <p className="text-white/80 text-lg mb-12 max-w-md">
            Tham gia cộng đồng sinh viên PTIT và doanh nghiệp hàng đầu Việt Nam.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <benefit.icon size={20} />
                </div>
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <div className="text-2xl font-bold text-gray-900">PTIT JOBS</div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Tạo tài khoản mới
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h2>
            <p className="text-gray-500">Chọn vai trò và bắt đầu ngay</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex bg-white rounded-2xl p-1.5 mb-6 shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => setUserType('candidate')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                userType === 'candidate'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <GraduationCap size={20} />
              Ứng viên
            </button>
            <button
              type="button"
              onClick={() => setUserType('employer')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                userType === 'employer'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Briefcase size={20} />
              Nhà tuyển dụng
            </button>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="email@ptit.edu.vn"
                  required
                />
              </div>
            </div>

            {userType === 'employer' && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-sm font-semibold text-gray-700 block">Tên công ty</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                    placeholder="Công ty CP Công nghệ..."
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Nhập lại mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                required
                className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500 mt-0.5" 
              />
              <span className="text-sm text-gray-600">
                Tôi đồng ý với{' '}
                <a href="#" className="text-red-600 font-medium hover:underline">Điều khoản sử dụng</a>
                {' '}và{' '}
                <a href="#" className="text-red-600 font-medium hover:underline">Chính sách bảo mật</a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg mt-2"
            >
              Tạo tài khoản
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">hoặc</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Register */}
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

          {/* Login Link */}
          <div className="mt-8 text-center text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-red-600 font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
