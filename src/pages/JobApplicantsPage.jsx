import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, Calendar, Download,
  Star, Clock, MapPin, Briefcase, Filter, Search,
  CheckCircle, XCircle, MessageSquare, Users, Bot, Sparkles, AlertTriangle
} from 'lucide-react';
import { getApplicants, updateApplicationStatus, getApplicantCvUrl, downloadProtectedFile, sendMessage, getSavedCandidates, saveCandidate, unsaveCandidate } from '../services/api';

const statusConfig = {
  new: { label: 'Mới', color: 'bg-blue-100 text-blue-700' },
  reviewed: { label: 'Đã xem', color: 'bg-gray-100 text-gray-600' },
  shortlisted: { label: 'Quan tâm', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-600' }
};

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    format: 'Phỏng vấn Online (Google Meet/Zoom)',
    notes: ''
  });
  const [savedIds, setSavedIds] = useState([]);
  const [sortByAi, setSortByAi] = useState(true);

  // Parse AI Data helper
  const parseAiJson = (jsonStr) => {
    if (!jsonStr) return [];
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  };

  const getAiScoreColor = (score) => {
    if (!score) return 'text-gray-400 bg-gray-100 border-gray-200';
    if (score >= 80) return 'text-green-700 bg-green-50 border-green-200 shadow-green-100';
    if (score >= 50) return 'text-yellow-700 bg-yellow-50 border-yellow-200 shadow-yellow-100';
    return 'text-red-700 bg-red-50 border-red-200 shadow-red-100';
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getApplicants(jobId);
        setApplicants(data?.applicants || (Array.isArray(data) ? data : []));
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách ứng viên.');
        setApplicants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();

    const fetchSaved = async () => {
      try {
        const saved = await getSavedCandidates();
        setSavedIds(saved.map(c => c.candidateId));
      } catch (err) {
        console.error('Failed to fetch saved candidates:', err);
      }
    };
    fetchSaved();
  }, [jobId]);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Pending': return 'Mới';
      case 'Accepted': return 'Quan tâm';
      case 'Rejected': return 'Từ chối';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus({ applicationId, newStatus });
      // Update local state
      setApplicants(prev => prev.map(a => 
        a.id === applicationId ? { ...a, status: newStatus } : a
      ));
      if (selectedApplicant?.id === applicationId) {
        setSelectedApplicant(prev => ({ ...prev, status: newStatus }));
      }
      alert('Cập nhật trạng thái thành công!');
    } catch (err) {
      alert(err.message || 'Cập nhật trạng thái thất bại.');
    }
  };

  const handleConfirmSchedule = async () => {
    if (!selectedApplicant || !scheduleData.date || !scheduleData.time) {
      alert('Vui lòng chọn đầy đủ ngày và giờ phỏng vấn.');
      return;
    }

    const message = `🔔 THÔNG BÁO LỊCH PHỎNG VẤN\n\nChào bạn ${selectedApplicant.fullName},\n\nChúng tôi rất ấn tượng với hồ sơ của bạn và trân trọng mời bạn tham gia buổi phỏng vấn.\n\n📅 Thời gian: ${scheduleData.time}, ngày ${new Date(scheduleData.date).toLocaleDateString('vi-VN')}\n📍 Hình thức: ${scheduleData.format}\n📝 Ghi chú: ${scheduleData.notes || 'Không có'}\n\nVui lòng xác nhận sự có mặt của bạn bằng cách phản hồi tin nhắn này. Trân trọng!`;

    try {
      await sendMessage(selectedApplicant.userId, message);
      alert('Đã gửi lịch phỏng vấn và tin nhắn thông báo thành công!');
      setShowScheduleModal(false);
      // Cập nhật trạng thái thành 'Accepted' (Quan tâm) luôn nếu cần
      if (selectedApplicant.status === 'Pending') {
        handleStatusUpdate(selectedApplicant.id, 'Accepted');
      }
    } catch (err) {
      alert('Gửi tin nhắn thất bại: ' + err.message);
    }
  };

  const toggleSaveCandidate = async (applicant) => {
    const isSaved = savedIds.includes(applicant.userId);
    
    try {
      if (isSaved) {
        await unsaveCandidate(applicant.userId);
        setSavedIds(prev => prev.filter(id => id !== applicant.userId));
      } else {
        try {
          await saveCandidate(applicant.userId);
          setSavedIds(prev => [...prev, applicant.userId]);
        } catch (err) {
          if (err.message.includes('already saved')) {
            // Nếu BE báo đã lưu rồi thì cập nhật lại state FE cho đồng bộ
            setSavedIds(prev => [...prev, applicant.userId]);
          } else {
            throw err;
          }
        }
      }
    } catch (err) {
      alert('Thao tác thất bại: ' + err.message);
    }
  };

  const sortedApplicants = [...applicants].sort((a, b) => {
    if (sortByAi) {
      return (b.aiScore || 0) - (a.aiScore || 0);
    }
    return new Date(b.appliedAt) - new Date(a.appliedAt);
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Danh sách Ứng viên</h1>
          <p className="text-gray-600 mt-1">Senior Frontend Developer (ReactJS) • {applicants.length} ứng viên</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{applicants.length}</div>
            <div className="text-sm text-gray-500">Tổng ứng viên</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">{Array.isArray(applicants) ? applicants.filter(a => a.status === 'Pending').length : 0}</div>
            <div className="text-sm text-gray-500">Chưa xem</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{Array.isArray(applicants) ? applicants.filter(a => a.status === 'Accepted').length : 0}</div>
            <div className="text-sm text-gray-500">Quan tâm</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">{Array.isArray(applicants) ? applicants.filter(a => a.status === 'Rejected').length : 0}</div>
            <div className="text-sm text-gray-500">Từ chối</div>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}
        {loading && <div className="text-center py-10">Đang tải ứng viên...</div>}


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
          <button 
            onClick={() => setSortByAi(!sortByAi)}
            className={`flex items-center gap-2 px-6 py-3 border rounded-xl transition ${sortByAi ? 'bg-ptit-red text-white border-ptit-red shadow-lg shadow-red-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}
          >
            <Sparkles size={18} />
            {sortByAi ? 'Đang xếp hạng AI' : 'Xếp hạng bằng AI'}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <Filter size={18} />
            Lọc
          </button>
        </div>

        {/* Applicants List & Detail Split View */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* List (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-3 h-[800px] overflow-y-auto pr-2 pb-10">
            {sortedApplicants.length > 0 ? sortedApplicants.map((applicant, index) => (
              <div 
                key={applicant.id || index}
                onClick={() => setSelectedApplicant(applicant)}
                className={`bg-white rounded-2xl p-4 shadow-sm border cursor-pointer transition-all flex gap-4 items-center ${
                  selectedApplicant?.id === applicant.id 
                    ? 'border-ptit-red shadow-md ring-1 ring-red-100' 
                    : 'border-gray-100 hover:border-red-200'
                }`}
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ptit-red to-red-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {(applicant.fullName || 'U').charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 truncate pr-2">{applicant.fullName}</h3>
                    <div className={`shrink-0 px-2.5 py-1 rounded-lg border font-bold text-xs flex items-center gap-1 shadow-sm ${getAiScoreColor(applicant.aiScore)}`}>
                      <Bot size={12} />
                      {applicant.aiScore ? `${applicant.aiScore}% Match` : 'Đang chấm...'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate">{applicant.email}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusColor(applicant.status)}`}>
                      {getStatusLabel(applicant.status)}
                    </span>
                  </div>
                </div>
              </div>
            )) : !loading && (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-dashed border-gray-200">
                Chưa có ứng viên nào ứng tuyển.
              </div>
            )}
          </div>

          {/* Detail Panel (Right) */}
          <div className="lg:col-span-7">
            {selectedApplicant ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28 animate-fade-in">
                {/* AI Score Banner */}
                {selectedApplicant.aiScore ? (
                  <div className={`px-6 py-4 border-b flex items-center justify-between ${
                    selectedApplicant.aiScore >= 80 ? 'bg-green-50 border-green-100' :
                    selectedApplicant.aiScore >= 50 ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm ${
                        selectedApplicant.aiScore >= 80 ? 'text-green-600' :
                        selectedApplicant.aiScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">AI Đánh Giá Độ Phù Hợp</div>
                        <div className="text-sm opacity-80">Hệ thống phân tích tự động CV ứng viên với JD</div>
                      </div>
                    </div>
                    <div className="text-3xl font-black">{selectedApplicant.aiScore}%</div>
                  </div>
                ) : (
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 shadow-sm">
                      <Bot size={24} />
                    </div>
                    <div className="text-sm text-gray-600 font-medium">AI đang trong quá trình phân tích hồ sơ...</div>
                  </div>
                )}

                <div className="p-6">
                  {/* Basic Info */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ptit-red to-red-400 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                        {selectedApplicant.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                          {selectedApplicant.fullName}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveCandidate(selectedApplicant);
                            }}
                            className={`p-1.5 rounded-full transition-all ${
                              savedIds.includes(selectedApplicant.userId) 
                                ? 'text-yellow-500 bg-yellow-50' 
                                : 'text-gray-300 hover:text-yellow-500 hover:bg-gray-50'
                            }`}
                            title="Lưu ứng viên"
                          >
                            <Star size={18} fill={savedIds.includes(selectedApplicant.userId) ? "currentColor" : "none"} />
                          </button>
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1"><Mail size={14}/> {selectedApplicant.email}</span>
                          <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(selectedApplicant.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedApplicant.status)}`}>
                      {getStatusLabel(selectedApplicant.status)}
                    </span>
                  </div>

                  {/* AI Reasoning & Strengths/Weaknesses */}
                  {selectedApplicant.aiReasoning && (
                    <div className="mb-8 space-y-6">
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-900 italic font-medium leading-relaxed">
                          "{selectedApplicant.aiReasoning}"
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                          <h4 className="font-bold flex items-center gap-2 text-green-700 mb-3 border-b pb-2">
                            <CheckCircle size={16}/> Điểm mạnh
                          </h4>
                          <ul className="space-y-2">
                            {parseAiJson(selectedApplicant.aiStrengths).map((s, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                <span className="text-green-500 mt-0.5">•</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                          <h4 className="font-bold flex items-center gap-2 text-red-700 mb-3 border-b pb-2">
                            <AlertTriangle size={16}/> Điểm yếu / Thiếu sót
                          </h4>
                          <ul className="space-y-2">
                            {parseAiJson(selectedApplicant.aiWeaknesses).map((w, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5">•</span> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => downloadProtectedFile(getApplicantCvUrl(selectedApplicant.id), `CV_${selectedApplicant.fullName}.pdf`)}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold text-sm border border-gray-200"
                    >
                      <Download size={18} /> Tải CV
                    </button>
                    <button 
                      onClick={() => navigate(`/recruiter/messages?contactId=${selectedApplicant.userId}&name=${encodeURIComponent(selectedApplicant.fullName)}`)}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold text-sm border border-gray-200"
                    >
                      <MessageSquare size={18} /> Nhắn tin
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Pending')}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition font-semibold text-sm border border-yellow-200"
                    >
                      <Clock size={18} /> Hoãn lại
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Rejected')}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-semibold text-sm border border-red-200"
                    >
                      <XCircle size={18} /> Loại
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Accepted')}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition font-semibold text-sm border border-green-200"
                    >
                      <CheckCircle size={18} /> Duyệt
                    </button>
                    <button 
                      onClick={() => {
                        setShowScheduleModal(true);
                      }}
                      className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-bold text-sm shadow-md shadow-green-200"
                    >
                      <Calendar size={18} /> Hẹn lịch
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Bot size={48} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">So sánh ứng viên thông minh</h3>
                <p className="text-gray-500 max-w-sm">Chọn một ứng viên từ danh sách bên trái để xem đánh giá chi tiết từ AI và thực hiện các thao tác tuyển dụng.</p>
              </div>
            )}
          </div>
        </div>
      </div>

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
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Giờ phỏng vấn</label>
                  <input 
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hình thức</label>
                <select 
                  value={scheduleData.format}
                  onChange={(e) => setScheduleData({...scheduleData, format: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none transition"
                >
                  <option>Phỏng vấn Online (Google Meet/Zoom)</option>
                  <option>Phỏng vấn trực tiếp tại văn phòng</option>
                  <option>Phỏng vấn qua điện thoại</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú cho ứng viên</label>
                <textarea 
                  rows={3}
                  value={scheduleData.notes}
                  onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
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
                onClick={handleConfirmSchedule}
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
