import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, Calendar, Download,
  Star, Clock, MapPin, Briefcase, Filter, Search,
  CheckCircle, XCircle, MessageSquare, Users
} from 'lucide-react';

// Mock applicants data
const mockApplicants = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@ptit.edu.vn',
    phone: '0901234567',
    experience: '2 năm',
    education: 'Học viện Công nghệ BCVT - CNTT',
    appliedAt: '2026-02-05',
    status: 'new',
    skills: ['ReactJS', 'JavaScript', 'TailwindCSS'],
    coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu...'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    email: 'tranthiminh@ptit.edu.vn',
    phone: '0912345678',
    experience: '1 năm',
    education: 'Học viện Công nghệ BCVT - ATTT',
    appliedAt: '2026-02-04',
    status: 'reviewed',
    skills: ['Vue.js', 'TypeScript', 'Node.js'],
    coverLetter: 'Với nền tảng vững chắc về phát triển web, tôi mong muốn đóng góp cho đội ngũ...'
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    email: 'lehoangcuong@ptit.edu.vn',
    phone: '0923456789',
    experience: 'Fresher',
    education: 'Học viện Công nghệ BCVT - KTPM',
    appliedAt: '2026-02-03',
    status: 'shortlisted',
    skills: ['React Native', 'Flutter', 'Firebase'],
    coverLetter: 'Là sinh viên năm cuối với nhiều dự án thực tế, tôi sẵn sàng học hỏi và phát triển...'
  },
  {
    id: 4,
    name: 'Phạm Minh Đức',
    email: 'phamminhduc@ptit.edu.vn',
    phone: '0934567890',
    experience: '3 năm',
    education: 'Học viện Công nghệ BCVT - TMĐT',
    appliedAt: '2026-02-02',
    status: 'rejected',
    skills: ['Angular', 'Java', 'Spring Boot'],
    coverLetter: 'Tôi có kinh nghiệm làm việc tại các công ty công nghệ lớn và muốn thử thách bản thân...'
  }
];

const statusConfig = {
  new: { label: 'Mới', color: 'bg-blue-100 text-blue-700' },
  reviewed: { label: 'Đã xem', color: 'bg-gray-100 text-gray-600' },
  shortlisted: { label: 'Quan tâm', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-600' }
};

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4"
          >
            <ArrowLeft size={20} />
            Quay lại danh sách
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Danh sách Ứng viên</h1>
          <p className="text-gray-600 mt-1">Senior Frontend Developer (ReactJS) • {mockApplicants.length} ứng viên</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{mockApplicants.length}</div>
            <div className="text-sm text-gray-500">Tổng ứng viên</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{mockApplicants.filter(a => a.status === 'new').length}</div>
            <div className="text-sm text-gray-500">Chưa xem</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{mockApplicants.filter(a => a.status === 'shortlisted').length}</div>
            <div className="text-sm text-gray-500">Quan tâm</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">{mockApplicants.filter(a => a.status === 'rejected').length}</div>
            <div className="text-sm text-gray-500">Từ chối</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Tìm kiếm ứng viên..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <Filter size={18} />
            Lọc
          </button>
        </div>

        {/* Applicants List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {mockApplicants.map((applicant) => (
              <div 
                key={applicant.id}
                onClick={() => setSelectedApplicant(applicant)}
                className={`bg-white rounded-2xl p-6 shadow-sm border cursor-pointer transition-all ${
                  selectedApplicant?.id === applicant.id 
                    ? 'border-ptit-red shadow-md' 
                    : 'border-gray-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ptit-red to-red-400 flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {applicant.name.charAt(0)}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(applicant.id);
                      }}
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border border-white flex items-center justify-center transition-all ${
                        savedIds.includes(applicant.id) 
                          ? 'bg-yellow-400 text-white' 
                          : 'bg-white text-gray-400 hover:text-yellow-400'
                      }`}
                    >
                      <Star size={12} fill={savedIds.includes(applicant.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{applicant.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[applicant.status].color}`}>
                        {statusConfig[applicant.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{applicant.education}</p>
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-right text-sm text-gray-400 shrink-0">
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {applicant.experience}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={14} />
                      {applicant.appliedAt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedApplicant ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ptit-red to-red-400 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg">
                    {selectedApplicant.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedApplicant.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedApplicant.education}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-700">{selectedApplicant.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-700">{selectedApplicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="text-gray-700">Kinh nghiệm: {selectedApplicant.experience}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">Kỹ năng</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-red-50 text-ptit-red text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">Thư xin việc</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedApplicant.coverLetter}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 w-full py-4 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">
                    <Download size={20} />
                    Tải CV
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 transition">
                      <CheckCircle size={18} />
                      Quan tâm
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-red-500 text-red-600 font-bold rounded-xl hover:bg-red-50 transition">
                      <XCircle size={18} />
                      Từ chối
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button 
                      onClick={() => setShowMsgModal(true)}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-md"
                    >
                      <MessageSquare size={18} />
                      Nhắn tin
                    </button>
                    <button 
                      onClick={() => setShowScheduleModal(true)}
                      className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md"
                    >
                      <Calendar size={18} />
                      Hẹn lịch
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center text-gray-400">
                <Users size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Chọn một ứng viên để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMsgModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Gửi tin nhắn</h3>
              <button 
                onClick={() => setShowMsgModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Người nhận</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                  {selectedApplicant?.name} ({selectedApplicant?.email})
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition h-32 resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex gap-3">
              <button 
                onClick={() => setShowMsgModal(false)}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  alert('Đã gửi tin nhắn thành công!');
                  setShowMsgModal(false);
                }}
                className="flex-1 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-100"
              >
                Gửi ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Đặt lịch phỏng vấn</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày phỏng vấn</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Giờ phỏng vấn</label>
                  <input 
                    type="time"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hình thức</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition">
                  <option>Phỏng vấn Online (Google Meet/Zoom)</option>
                  <option>Phỏng vấn trực tiếp tại văn phòng</option>
                  <option>Phỏng vấn qua điện thoại</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú cho ứng viên</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition resize-none"
                  placeholder="Yêu cầu chuẩn bị laptop, CV cứng..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex gap-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  alert('Đã gửi lịch phỏng vấn thành công!');
                  setShowScheduleModal(false);
                }}
                className="flex-1 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-100"
              >
                Xác nhận lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicantsPage;
