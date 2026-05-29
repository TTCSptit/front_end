import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, ArrowLeft, UploadCloud, FileText, Briefcase, 
  CheckCircle, XCircle, AlertCircle, Loader2, BrainCircuit
} from 'lucide-react';

const AICVMatcherPage = () => {
  const [jdText, setJdText] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!jdText.trim()) {
      setError('Vui lòng nhập Mô tả công việc (JD).');
      return;
    }
    
    if (!cvFile) {
      setError('Vui lòng tải lên file CV (PDF).');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('jd_text', jdText);
    formData.append('cv_file', cvFile);

    try {
      // Đã cập nhật URL trỏ thẳng sang Hugging Face Space của bạn
      const response = await fetch('https://kakakaak123-ai-career-advisor.hf.space/api/employer/match', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Có lỗi xảy ra khi phân tích.');
      }

      const resData = await response.json();
      setResult(resData.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-ptit-red text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI CV Matcher</h1>
              <p className="text-gray-600 mt-1">Sử dụng AI để tự động đánh giá độ phù hợp của CV với Yêu cầu công việc</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Input (Left Column) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-ptit-red" />
                Thông tin đánh giá
              </h2>

              <form onSubmit={handleAnalyze} className="space-y-6">
                {/* JD Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mô tả công việc (Job Description)
                  </label>
                  <textarea 
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none transition resize-none text-sm"
                    placeholder="Dán nội dung JD vào đây (yêu cầu kỹ năng, kinh nghiệm...)"
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                  ></textarea>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hồ sơ ứng viên (CV PDF)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-ptit-red hover:bg-red-50 focus:outline-none">
                    <span className="flex items-center space-x-2">
                      <UploadCloud className="w-6 h-6 text-gray-400" />
                      <span className="font-medium text-gray-500">
                        {cvFile ? cvFile.name : 'Click để tải lên file PDF'}
                      </span>
                    </span>
                    <input type="file" name="file_upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                  </label>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-ptit-red to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      AI Đang phân tích...
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={20} />
                      Phân tích ngay
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results (Right Column) */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <Bot size={40} className="text-ptit-red animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI đang đọc và phân tích CV</h3>
                <p className="text-gray-500 max-w-sm">
                  Quá trình này có thể mất vài giây. AI đang đối chiếu từng kỹ năng và kinh nghiệm của ứng viên với JD...
                </p>
              </div>
            ) : result ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Kết quả phân tích</h2>
                  <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold text-lg ${getScoreColor(result.score)}`}>
                    Điểm phù hợp: {result.score}%
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Reasoning */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <Bot size={18} /> Nhận xét tổng quan từ AI HR
                    </h3>
                    <p className="text-blue-800 leading-relaxed text-sm italic">
                      "{result.reasoning}"
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-500" /> 
                        Điểm mạnh
                      </h3>
                      <ul className="space-y-3">
                        {result.strengths.length > 0 ? result.strengths.map((str, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-green-500 mt-0.5">•</span>
                            {str}
                          </li>
                        )) : (
                          <li className="text-sm text-gray-400 italic">Không tìm thấy điểm mạnh nổi bật.</li>
                        )}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <XCircle size={18} className="text-red-500" /> 
                        Điểm cần cải thiện
                      </h3>
                      <ul className="space-y-3">
                        {result.weaknesses.length > 0 ? result.weaknesses.map((weak, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-red-500 mt-0.5">•</span>
                            {weak}
                          </li>
                        )) : (
                          <li className="text-sm text-gray-400 italic">Không có điểm yếu đáng kể.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 border border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-center text-gray-400">
                <FileText size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-medium text-gray-500">Chưa có dữ liệu phân tích</p>
                <p className="text-sm mt-2 max-w-sm">
                  Hãy điền đầy đủ mô tả công việc và tải CV lên, sau đó bấm "Phân tích ngay" để xem kết quả.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICVMatcherPage;
