import React, { useState } from 'react';
import { 
  Briefcase, MapPin, DollarSign, Clock, 
  FileText, Plus, X, Upload, CheckCircle,
  Zap, AlertCircle, Sparkles, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PostJobPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  const [formData, setFormData] = useState({
    title: '',
    company: 'Công ty TNHH Giải pháp PTIT', // Default mock company
    location: '',
    salary: '',
    type: 'Full-time',
    experience: 'Fresher',
    industry: '',
    description: '',
    requirements: '',
    benefits: '',
    expiryDate: '',
    isFeatured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'isFeatured' && checked) {
      // Mock check for existing featured jobs (simulating 3 existing ones for demonstration if needed, 
      // but here we just check against a mock constant or current state)
      const mockFeaturedCount = 3; // Simulating limit reached
      if (mockFeaturedCount >= 3) {
        alert("Bạn đã đạt giới hạn 3 tin nổi bật. Vui lòng quản lý tin đăng để gỡ bớt tin nổi bật trước khi tạo tin mới.");
        return;
      }
    }

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Đăng tin thành công!</h1>
            <p className="text-gray-600 mb-10 text-lg">
              Tin tuyển dụng của bạn đã được gửi và đang chờ kiểm duyệt. <br />
              Chúng tôi sẽ thông báo cho bạn ngay sau khi tin được hiển thị.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/recruiter/dashboard')}
                className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
              >
                Về quản lý tin
              </button>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition"
              >
                Đăng thêm tin mới
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng tin tuyển dụng mới</h1>
              <p className="text-gray-600">Thu hút nhân tài PTIT bằng những bản mô tả công việc chi tiết và hấp dẫn.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Thông tin cơ bản */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-ptit-red" />
              Thông tin chung
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề vị trí tuyển dụng *</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="Ví dụ: Senior Frontend Developer (ReactJS)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none transition"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Địa điểm làm việc *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="location"
                    required
                    placeholder="Hà Nội, TP. HCM, Remote..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mức lương *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="salary"
                    required
                    placeholder="20 - 30 triệu, Thỏa thuận..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hình thức làm việc</label>
                <select 
                  name="type"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition bg-white"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kinh nghiệm yêu cầu</label>
                <select 
                  name="experience"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition bg-white"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option>Fresher</option>
                  <option>1 - 2 năm</option>
                  <option>3 - 5 năm</option>
                  <option>Trên 5 năm</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Nội dung chi tiết */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-ptit-red" />
              Nội dung chi tiết
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả công việc *</label>
                <textarea 
                  name="description"
                  required
                  rows="6"
                  placeholder="Mô tả các nhiệm vụ và trách nhiệm chính của vị trí này..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none transition resize-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Yêu cầu ứng viên *</label>
                <textarea 
                  name="requirements"
                  required
                  rows="6"
                  placeholder="Kỹ năng chuyên môn, kinh nghiệm, bằng cấp và các yêu cầu khác..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none transition resize-none"
                  value={formData.requirements}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quyền lợi & Phúc lợi *</label>
                <textarea 
                  name="benefits"
                  required
                  rows="6"
                  placeholder="Tại sao ứng viên nên làm việc tại công ty bạn? (Lương thưởng, bảo hiểm, du lịch...)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none transition resize-none"
                  value={formData.benefits}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section: Premium Features */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" />
              Tính năng nổi bật
            </h2>
            
            <div className="p-6 rounded-2xl border-2 transition-all border-yellow-400 bg-white/5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 font-bold text-lg mb-1">
                            Làm nổi bật tin tuyển dụng
                            <span className="bg-yellow-400 text-gray-900 text-[10px] px-2 py-0.5 rounded font-black">HOT</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Đưa tin của bạn lên đầu danh sách tìm kiếm và đánh dấu bằng màu sắc bắt mắt. 
                            Tăng gấp 5 lần lượt tiếp cập và hồ sơ ứng viên.
                        </p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600 transition-colors">
                        <input 
                            type="checkbox" 
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="SR-only opacity-0 absolute inset-0 cursor-pointer"
                        />
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
                           formData.isFeatured ? 'translate-x-6 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-white'
                        }`}></div>
                    </div>
                </div>
                
            </div>
          </div>

          {/* Section 3: Tải lên hình ảnh (Mock) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Upload size={20} className="text-ptit-red" />
              Hình ảnh & Tài liệu
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-ptit-red transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-red-50 text-ptit-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plus size={32} />
              </div>
              <p className="font-bold text-gray-700">Tải lên hình ảnh công ty hoặc banner tin tuyển dụng</p>
              <p className="text-sm text-gray-400 mt-1">Định dạng JPG, PNG. Tối đa 5MB.</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky bottom-6 z-10">
            <button 
              type="button"
              onClick={() => navigate('/recruiter/dashboard')}
              className="px-8 py-4 text-gray-600 font-bold hover:text-red-600 transition"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="px-12 py-4 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-95"
            >
              Đăng tin ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
