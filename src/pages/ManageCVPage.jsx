import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Upload, Trash2, Download, 
  AlertCircle, Clock, Plus,
  File, Eye
} from 'lucide-react';
import { getResumes, uploadUserResume, deleteUserResume, setMainUserResume, getUserResumeDownloadUrl, downloadProtectedFile } from '../services/api';

const ManageCVPage = () => {
  const [cvs, setCvs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      if (data) setCvs(data);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra định dạng
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Chỉ chấp nhận file PDF, DOC hoặc DOCX");
      return;
    }

    setIsUploading(true);
    try {
      await uploadUserResume(file);
      await fetchResumes();
      alert("Tải lên CV thành công!");
    } catch (err) {
      alert(err.message || "Tải lên CV thất bại");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa CV này?")) {
      try {
        await deleteUserResume(id);
        setCvs(cvs.filter(cv => cv.id !== id));
      } catch (err) {
        alert("Xóa thất bại: " + err.message);
      }
    }
  };

  const handleSetMain = async (id) => {
    try {
      await setMainUserResume(id);
      setCvs(cvs.map(cv => ({
        ...cv,
        isMain: cv.id === id
      })));
      alert("Đã cập nhật CV chính thành công!");
    } catch (err) {
      alert("Cập nhật thất bại: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản lý CV</h1>
            <p className="text-gray-500 mt-1">Tải lên và quản lý các bản CV của bạn để ứng tuyển nhanh chóng.</p>
          </div>
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-ptit-red text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:opacity-50"
          >
            <Plus size={20} />
            Tải CV mới
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">Mẹo nhỏ cho bạn</h3>
            <p className="text-blue-700 text-sm mt-1">
              Nhà tuyển dụng thường thích các CV định dạng **PDF**. 
              Hãy chọn một CV làm "CV chính" để hệ thống tự động sử dụng khi bạn ứng tuyển nhanh.
            </p>
          </div>
        </div>

        {/* CV List */}
        {loading ? (
           <div className="text-center py-20">Đang tải danh sách CV...</div>
        ) : (
          <div className="space-y-4">
            {cvs.length > 0 ? cvs.map((cv) => (
              <div 
                key={cv.id} 
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col md:flex-row items-center gap-6 ${
                  cv.isMain ? 'border-ptit-red shadow-md ring-1 ring-red-100' : 'border-gray-100 hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div className={`p-4 rounded-2xl ${cv.isMain ? 'bg-red-50 text-ptit-red' : 'bg-gray-50 text-gray-400'}`}>
                  <FileText size={32} />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left min-w-0">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate max-w-[300px]">{cv.fileName}</h3>
                    {cv.isMain && (
                      <span className="px-2 py-0.5 bg-ptit-red/10 text-ptit-red text-[10px] font-black uppercase tracking-widest rounded-full">
                        CV Chính
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(cv.uploadedAt).toLocaleDateString()}
                    </span>
                    <span>{cv.fileSize}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!cv.isMain && (
                    <button 
                      onClick={() => handleSetMain(cv.id)}
                      className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-ptit-red transition"
                    >
                      Đặt làm chính
                    </button>
                  )}
                  <button 
                    onClick={() => downloadProtectedFile(getUserResumeDownloadUrl(cv.id), cv.fileName)}
                    className="p-3 hover:bg-gray-50 rounded-xl transition text-gray-400 hover:text-gray-900"
                  >
                    <Download size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(cv.id)}
                    className="p-3 hover:bg-red-50 rounded-xl transition text-gray-400 hover:text-ptit-red"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có CV nào</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Tải lên CV của bạn ngay để bắt đầu ứng tuyển các công việc hấp dẫn.</p>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="px-8 py-3 bg-ptit-red text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-200"
                >
                  Tải lên ngay
                </button>
              </div>
            )}
          </div>
        )}

        {/* Upload Status Overlay */}
        {isUploading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-ptit-red border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Đang tải CV lên...</h3>
              <p className="text-gray-500 text-sm">Vui lòng đợi trong giây lát, hệ thống đang xử lý tệp tin của bạn.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCVPage;
