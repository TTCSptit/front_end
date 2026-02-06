import React, { useState } from 'react';
import { User, Briefcase, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [userType, setUserType] = useState('candidate'); // 'candidate' or 'employer'

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h2>
          <p className="text-gray-500">Chọn vai trò của bạn để bắt đầu</p>
        </div>

        {/* User Type Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setUserType('candidate')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              userType === 'candidate' 
                ? 'bg-white text-ptit-red shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} />
            Ứng viên
          </button>
          <button
            onClick={() => setUserType('employer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              userType === 'employer' 
                ? 'bg-white text-ptit-red shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Briefcase size={18} />
            Nhà tuyển dụng
          </button>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Họ và tên</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none transition-all"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none transition-all"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

           {userType === 'employer' && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-medium text-gray-700 block">Tên công ty</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none transition-all"
                  placeholder="Công ty CP Công nghệ..."
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Nhập lại mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ptit-red text-white py-3 rounded-lg font-bold hover:bg-ptit-darkred transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group mt-4"
          >
            Đăng ký tài khoản
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-ptit-red font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
