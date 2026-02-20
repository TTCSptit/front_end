import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Briefcase, DollarSign, Clock, 
  ChevronRight, ChevronLeft, CheckCircle, Info, Plus, X,
  Edit3, Save
} from 'lucide-react';

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock initial data - In a real app, you'd fetch this using jobId
  const [formData, setFormData] = useState({
    title: 'Senior Frontend Developer (ReactJS)',
    company: 'Công ty CP ABC',
    location: 'Hà Nội',
    salary: '25 - 35 triệu',
    type: 'Full-time',
    level: 'Senior',
    experience: '3-5 năm',
    deadline: '2026-03-01',
    description: 'Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để gia nhập đội ngũ phát triển sản phẩm cốt lõi...',
    requirements: 'Thành thạo ReactJS, Cư duy thuật toán tốt, Có kinh nghiệm với TailwindCSS...',
    benefits: 'Lương thưởng tháng 13, Bảo hiểm cao cấp, Môi trường làm việc trẻ trung...'
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-md w-full text-center px-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cập nhật thành công!</h2>
          <p className="text-gray-600 mb-8">Tin tuyển dụng của bạn đã được cập nhật thông tin mới nhất.</p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/recruiter/dashboard')}
              className="px-8 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition"
            >
              Về quản lý tin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa tin tuyển dụng</h1>
          <p className="text-gray-600 mt-1">Sửa nội dung cho tin ID: {jobId}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-ptit-red text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              <div className={`flex-1 h-1 rounded-full ${
                step > s ? 'bg-ptit-red' : 'bg-gray-200'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={20} className="text-ptit-red" />
                Thông tin chung
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tiêu đề công việc</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mức lương</label>
                  <input 
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    placeholder="VD: 15 - 20 triệu"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Địa điểm làm việc</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Loại công việc</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content */}
          {step === 2 && (
            <div className="p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit3 size={20} className="text-ptit-red" />
                Nội dung chi tiết
              </h2>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mô tả công việc</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition h-32 resize-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Yêu cầu ứng viên</label>
                <textarea 
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition h-32 resize-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Meta & Submit */}
          {step === 3 && (
            <div className="p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle size={20} className="text-ptit-red" />
                Hoàn tất & Cập nhật
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Hạn chót nộp hồ sơ</label>
                  <input 
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    required
                  />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl text-ptit-red text-sm flex gap-3">
                <Info size={18} className="shrink-0" />
                Vui lòng kiểm tra kỹ các thông tin trước khi cập nhật. Tin của bạn sẽ được hiển thị ngay lập tức sau khi lưu.
              </div>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition ${
                step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={20} />
              Quay lại
            </button>
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
              >
                Tiếp theo
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="animate-spin" size={20} />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Lưu thay đổi
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
