import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Check, Star, Zap, Crown, Rocket,
  Eye, Users, Clock, Headphones, TrendingUp, Shield,
  CreditCard, Smartphone, Building, X, AlertCircle
} from 'lucide-react';

const RecruiterPricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState('checkout'); // 'checkout', 'processing', 'success', 'qr'
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Get current plan from storage or default to basic
  const [activePlanId, setActivePlanId] = useState(sessionStorage.getItem('recruiter_plan') || 'basic');

  const plans = [
    {
      id: 'basic',
      name: 'Cơ bản',
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: 'Dành cho nhà tuyển dụng mới bắt đầu',
      color: 'gray',
      features: [
        { text: '3 tin tuyển dụng/tháng', included: true },
        { text: 'Hiển thị 30 ngày', included: true },
        { text: 'Xem thông tin ứng viên cơ bản', included: true },
        { text: 'Hỗ trợ email', included: true },
        { text: 'Tin nổi bật', included: false },
        { text: 'Báo cáo chi tiết', included: false },
        { text: 'Hỗ trợ 24/7', included: false }
      ],
      cta: 'Đang sử dụng',
      current: activePlanId === 'basic'
    },
    {
      id: 'pro',
      name: 'Nâng cao',
      icon: Rocket,
      price: { monthly: 1500000, yearly: 15000000 },
      description: 'Phù hợp cho doanh nghiệp vừa và nhỏ',
      color: 'blue',
      popular: true,
      features: [
        { text: '15 tin tuyển dụng/tháng', included: true },
        { text: 'Hiển thị 60 ngày', included: true },
        { text: 'Xem thông tin ứng viên đầy đủ', included: true },
        { text: 'Hỗ trợ email & chat', included: true },
        { text: '2 tin nổi bật/tháng', included: true },
        { text: 'Báo cáo chi tiết', included: true },
        { text: 'Hỗ trợ 24/7', included: false }
      ],
      cta: activePlanId === 'pro' ? 'Đang sử dụng' : 'Nâng cấp ngay',
      current: activePlanId === 'pro'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: { monthly: 3000000, yearly: 30000000 },
      description: 'Dành cho doanh nghiệp lớn',
      color: 'red',
      features: [
        { text: 'Không giới hạn tin đăng', included: true },
        { text: 'Hiển thị không giới hạn', included: true },
        { text: 'Xem & tải CV ứng viên', included: true },
        { text: 'Account Manager riêng', included: true },
        { text: '10 tin nổi bật/tháng', included: true },
        { text: 'Báo cáo & Analytics nâng cao', included: true },
        { text: 'Hỗ trợ 24/7 ưu tiên', included: true }
      ],
      cta: activePlanId === 'premium' ? 'Đang sử dụng' : 'Nâng cấp ngay',
      current: activePlanId === 'premium'
    }
  ];

  const comparisonData = [
    { feature: 'Số lượng tin đăng/tháng', basic: '3 tin', pro: '15 tin', premium: 'Không giới hạn' },
    { feature: 'Thời gian hiển thị tin', basic: '30 ngày', pro: '60 ngày', premium: 'Vĩnh viễn' },
    { feature: 'Xem thông tin ứng viên', basic: 'Cơ bản', pro: 'Chi tiết', premium: 'Full + Tải CV' },
    { feature: 'Tin tuyển dụng nổi bật', basic: '×', pro: '2 tin', premium: '10 tin' },
    { feature: 'Báo cáo tuyển dụng', basic: 'Cơ bản', pro: 'Chi tiết', premium: 'Nâng cao (AI)' },
    { feature: 'Hỗ trợ kỹ thuật', basic: 'Email', pro: 'Email & Chat', premium: '24/7 Hotline' },
    { feature: 'Trình quản lý tài khoản', basic: '×', pro: '×', premium: 'Cố vấn riêng' }
  ];

  const formatPrice = (price) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleUpgrade = (plan) => {
    if (plan.current) return;
    setSelectedPlan(plan);
    setPaymentStep('checkout');
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      // Persist the plan choice
      sessionStorage.setItem('recruiter_plan', selectedPlan.id);
      setActivePlanId(selectedPlan.id);
    }, 2000);
  };

  const colorClasses = {
    gray: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    red: { bg: 'bg-red-50', text: 'text-ptit-red', border: 'border-red-200' }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4"
          >
            <ArrowLeft size={20} />
            Quay lại Dashboard
          </Link>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Giải pháp tuyển dụng toàn diện</h1>
            <p className="text-gray-600 text-lg">
              Tiết kiệm đến 20% khi thanh toán theo năm. Đảm bảo hiệu quả tuyển dụng cao nhất.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
                Hàng tháng
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-ptit-red' : 'bg-gray-300'
                }`}
              >
                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`}></span>
              </button>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
                Hàng năm
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Tiết kiệm 20%
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Plans Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-ptit-red scale-105 z-10' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ptit-red text-white px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-200">
                  <Star size={14} fill="white" />
                  GÓI PHỔ BIẾN NHẤT
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${colorClasses[plan.color].bg} ${colorClasses[plan.color].text}`}>
                <plan.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-1 mb-6 leading-relaxed">{plan.description}</p>

              <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(plan.price[billingCycle])}
                  </span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="text-gray-500 font-medium">/{billingCycle === 'monthly' ? 'tháng' : 'năm'}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                  <div className="text-xs text-green-600 mt-1 font-bold">
                    Tiết kiệm {formatPrice(plan.price.monthly * 12 - plan.price.yearly)} mỗi năm
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className={`flex items-start gap-3 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                      feature.included ? 'bg-green-100 text-green-600' : 'opacity-50'
                    }`}>
                      {feature.included ? <Check size={12} strokeWidth={3} /> : '×'}
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan)}
                disabled={plan.current}
                className={`w-full py-4 rounded-xl font-bold transition-all text-lg ${
                  plan.current 
                    ? 'bg-gray-100 text-gray-400 cursor-default border border-gray-200'
                    : plan.popular
                      ? 'bg-ptit-red text-white hover:bg-red-700 shadow-lg shadow-red-200 active:scale-95'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md active:scale-95'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">So sánh chi tiết quyền lợi</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-6 font-bold text-gray-900 border-b border-gray-100">Tính năng</th>
                  <th className="p-6 font-bold text-gray-600 border-b border-gray-100 text-center">Cơ bản</th>
                  <th className="p-6 font-bold text-blue-600 border-b border-gray-100 text-center">Nâng cao</th>
                  <th className="p-6 font-bold text-ptit-red border-b border-gray-100 text-center">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 text-sm text-gray-700 font-medium border-b border-gray-100">{row.feature}</td>
                    <td className="p-6 text-sm text-gray-500 text-center border-b border-gray-100">{row.basic}</td>
                    <td className="p-6 text-sm text-gray-700 text-center font-bold border-b border-gray-100">{row.pro}</td>
                    <td className="p-6 text-sm text-gray-900 text-center font-bold border-b border-gray-100">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: '10,000+', desc: 'Ứng viên chất lượng cao' },
            { icon: Eye, title: '1M+', desc: 'Lượt tiếp cận mỗi tháng' },
            { icon: TrendingUp, title: '95%', desc: 'Tỉ lệ tuyển dụng thành công' },
            { icon: Shield, title: 'An toàn', desc: 'Bảo mật thông tin tối đa' }
          ].map((item, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-ptit-red mx-auto mb-4">
                <item.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{item.title}</div>
              <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Chi tiết thanh toán</h3>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {paymentStep === 'checkout' && (
              <div className="p-8">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-ptit-red shadow-sm">
                      <selectedPlan.icon size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Gói dịch vụ đã chọn</div>
                        <div className="font-bold text-gray-900 text-lg">Gói {selectedPlan.name}</div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-gray-600">
                        <span>Giá gói ({billingCycle === 'monthly' ? '1 tháng' : '1 năm'})</span>
                        <span>{formatPrice(selectedPlan.price[billingCycle])}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Thuế VAT (10%)</span>
                        <span>{formatPrice(selectedPlan.price[billingCycle] * 0.1)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 font-bold text-xl text-gray-900">
                        <span>Tổng cộng</span>
                        <span className="text-ptit-red">{formatPrice(selectedPlan.price[billingCycle] * 1.1)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3 mb-8">
                  <label className="text-sm font-bold text-gray-700 block mb-2">Phương thức thanh toán</label>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'card' ? 'border-ptit-red bg-red-50' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${paymentMethod === 'card' ? 'bg-ptit-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <CreditCard size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="font-bold text-sm">Thanh toán qua Thẻ (ATM/Visa/Master)</div>
                        <div className="text-xs text-gray-500">Cổng thanh toán bảo mật OnePay</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-ptit-red' : 'border-gray-300'}`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-ptit-red rounded-full"></div>}
                    </div>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('qr')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'qr' ? 'border-ptit-red bg-red-50' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${paymentMethod === 'qr' ? 'bg-ptit-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Smartphone size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="font-bold text-sm">Momo / VNPay QR</div>
                        <div className="text-xs text-gray-500">Quét mã nhanh gọn, an toàn</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qr' ? 'border-ptit-red' : 'border-gray-300'}`}>
                        {paymentMethod === 'qr' && <div className="w-2.5 h-2.5 bg-ptit-red rounded-full"></div>}
                    </div>
                  </button>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="flex-1 py-4 font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={() => {
                        if (paymentMethod === 'qr') {
                            setPaymentStep('qr');
                        } else {
                            handlePayment();
                        }
                    }}
                    className="flex-3 py-4 bg-ptit-red text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-100"
                  >
                    Thanh toán ngay
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'qr' && (
              <div className="p-8 text-center animate-fade-in">
                <h4 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Quét mã QR để thanh toán</h4>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6 max-w-[260px] mx-auto shadow-sm relative group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    {/* Mock QR Code Styled Component */}
                    <div className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-4">
                        <div className="grid grid-cols-4 gap-1 opacity-20">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className={`w-8 h-8 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-transparent'}`}></div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="w-full h-full bg-white p-2 rounded shadow-sm border border-gray-100 flex items-center justify-center">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                                    alt="QR Code" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl mb-8 border border-red-100/50">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">Người thụ hưởng</span>
                        <span className="text-sm font-bold text-gray-900 uppercase">PTIT JOBS - UNIVERSITY</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">Số tiền</span>
                        <span className="text-xl font-black text-ptit-red">{formatPrice(selectedPlan.price[billingCycle] * 1.1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Nội dung</span>
                        <span className="text-sm font-bold text-blue-600">UPGRADE_{selectedPlan.id.toUpperCase()}_CO_{Math.floor(Math.random() * 10000)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={handlePayment}
                        className="w-full py-4 bg-ptit-red text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
                    >
                        Tôi đã chuyển khoản thành công
                    </button>
                    <button 
                        onClick={() => setPaymentStep('checkout')}
                        className="w-full py-3 text-gray-500 font-bold hover:text-gray-900 transition text-sm"
                    >
                        Quay lại chọn phương thức khác
                    </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="p-16 text-center">
                <div className="w-20 h-20 border-4 border-gray-100 border-t-ptit-red rounded-full animate-spin mx-auto mb-6"></div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Đang xử lý thanh toán</h4>
                <p className="text-gray-500">Vui lòng không đóng cửa sổ này...</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="p-12 text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={48} strokeWidth={3} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h4>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Chúc mừng! Tài khoản của bạn đã được nâng cấp lên gói <span className="text-ptit-red font-bold">{selectedPlan.name}</span>. 
                  Hệ thống sẽ cập nhật quyền lợi ngay lập tức.
                </p>
                <div className="bg-blue-50 p-4 rounded-xl text-blue-600 text-sm flex gap-3 mb-8 text-left">
                  <AlertCircle size={20} className="shrink-0" />
                  Hóa đơn điện tử đã được gửi tới email quản trị của công ty bạn.
                </div>
                <button 
                  onClick={() => {
                    setSelectedPlan(null);
                    // In a real app, update state/reload
                  }}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-lg"
                >
                  Bắt đầu sử dụng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterPricingPage;
