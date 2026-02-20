import React, { useState } from 'react';
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building2, Users, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Requesting reset for:', email);
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    console.log('Setting new password:', newPassword);
    setStep(4);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding (Consistent with Login) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 font-bold text-2xl shadow-lg">
              P
            </div>
            <div>
              <div className="text-3xl font-bold">PTIT JOBS</div>
              <div className="text-white/70 text-sm">Kết nối Tài năng - Kiến tạo Tương lai</div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Khôi phục<br />
            <span className="text-yellow-300">mật khẩu</span>
          </h1>
          
          <p className="text-white/80 text-lg mb-12 max-w-md">
            Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản của mình một cách nhanh chóng và bảo mật.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold">Xác nhận Email</h4>
                <p className="text-white/70 text-sm">Nhận mã xác thực qua email đã đăng ký</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <KeyRound size={20} />
              </div>
              <div>
                <h4 className="font-bold">Nhập mã OTP</h4>
                <p className="text-white/70 text-sm">Xác thực danh tính của bạn an toàn</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <Lock size={20} />
              </div>
              <div>
                <h4 className="font-bold">Đặt mật khẩu mới</h4>
                <p className="text-white/70 text-sm">Tạo mật khẩu mạnh để bảo vệ tài khoản</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors mb-6 text-sm font-medium">
              <ArrowLeft size={16} />
              Quay lại đăng nhập
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Bảo mật tài khoản
            </div>
            
            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quên mật khẩu?</h2>
                <p className="text-gray-500">Nhập email của bạn để bắt đầu quá trình khôi phục.</p>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Xác thực OTP</h2>
                <p className="text-gray-500">Chúng tôi đã gửi mã 6 chữ số tới <span className="text-gray-900 font-semibold">{email}</span></p>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt mật khẩu mới</h2>
                <p className="text-gray-500">Vui lòng chọn mật khẩu mạnh và dễ nhớ.</p>
              </>
            )}
             {step === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Thành công!</h2>
                <p className="text-gray-500">Mật khẩu của bạn đã được cập nhật thành công.</p>
              </div>
            )}
          </div>

          {/* Form Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Email đăng ký</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg"
              >
                Tiếp tục
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* Form Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                  />
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Chưa nhận được mã?{' '}
                  <button type="button" className="text-red-600 font-bold hover:underline">Gửi lại</button>
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg"
              >
                Xác nhận mã
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* Form Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Mật khẩu mới</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg"
              >
                Cập nhật mật khẩu
              </button>
            </form>
          )}

          {/* Success Step */}
          {step === 4 && (
            <div className="space-y-6">
               <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group text-lg"
              >
                Đăng nhập ngay
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
