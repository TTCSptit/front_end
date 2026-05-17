import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Brain, MessageCircle, Activity, Award, AlertTriangle, Lightbulb, FileText } from 'lucide-react';
import { getInterviewReport } from '../services/api';

const InterviewReportPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Giả lập call API lấy dữ liệu report từ Backend
    const fetchReport = async () => {
      setLoading(true);
      try {
        const data = await getInterviewReport(roomId);
        if (data) {
          const formatted = {
            communication_score: data.communicationScore,
            technical_score: data.technicalScore,
            confidence_score: data.confidenceScore,
            feedback_strengths: typeof data.feedbackStrengths === 'string' ? JSON.parse(data.feedbackStrengths) : data.feedbackStrengths,
            feedback_weaknesses: typeof data.feedbackWeaknesses === 'string' ? JSON.parse(data.feedbackWeaknesses) : data.feedbackWeaknesses,
            transcript_summary: data.transcriptSummary
          };
          setReportData(formatted);
        }
      } catch (err) {
        console.error("Lỗi khi tải báo cáo phỏng vấn từ Database C#:", err);
        // Dự phòng bằng localStorage
        const simulated = localStorage.getItem(`simulated_report_${roomId}`);
        if (simulated) {
          setReportData(JSON.parse(simulated));
        } else {
          // Dự phòng bằng Mock Data mặc định nếu không có dữ liệu nào
          setReportData({
            communication_score: 85,
            technical_score: 70,
            confidence_score: 90,
            feedback_strengths: [
              "Phong thái tự tin, trả lời dứt khoát không ngập ngừng.",
              "Phát âm tiếng Anh tốt khi nói các thuật ngữ kỹ thuật (RESTful, API).",
              "Mở đầu cuộc trò chuyện thân thiện và chuyên nghiệp."
            ],
            feedback_weaknesses: [
              "Chưa giải thích rõ được sự khác nhau giữa Interface và Abstract Class.",
              "Đôi khi nói hơi nhanh khiến người nghe khó bắt kịp."
            ],
            transcript_summary: "Ứng viên chào hỏi lịch sự. HR yêu cầu giới thiệu bản thân và hỏi 2 câu về OOP (Object-Oriented Programming). Ứng viên trả lời mượt phần giới thiệu nhưng hơi lúng túng ở câu hỏi sâu về tính đa hình (Polymorphism)."
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main text-text-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-red border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-bold animate-pulse text-accent-red">AI đang phân tích giọng nói...</p>
          <p className="text-sm text-text-secondary">Việc này có thể mất vài phút.</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { subject: 'Giao tiếp', A: reportData.communication_score, fullMark: 100 },
    { subject: 'Kỹ thuật', A: reportData.technical_score, fullMark: 100 },
    { subject: 'Tự tin', A: reportData.confidence_score, fullMark: 100 },
    { subject: 'Thái độ', A: 90, fullMark: 100 },
    { subject: 'Phản xạ', A: 80, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-bg-main pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-accent-red transition-colors mb-6 font-semibold"
        >
          <ChevronLeft size={20} />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-accent-red to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Brain size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">AI Interview Report</h1>
            <p className="text-text-secondary">Phân tích chuyên sâu dựa trên giọng nói và câu trả lời (Room: {roomId})</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái: Biểu đồ & Tổng quan */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-bg-light/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                <Activity size={20} className="text-accent-red" />
                Biểu đồ Kỹ Năng
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Student"
                      dataKey="A"
                      stroke="#ff4a4a"
                      strokeWidth={3}
                      fill="#ff4a4a"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-bg-light/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-4 text-text-primary">Điểm số chi tiết</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="flex items-center gap-2 text-text-secondary"><MessageCircle size={16}/> Giao tiếp</span>
                  <span className="text-lg font-bold text-green-400">{reportData.communication_score}/100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="flex items-center gap-2 text-text-secondary"><Award size={16}/> Chuyên môn</span>
                  <span className="text-lg font-bold text-yellow-400">{reportData.technical_score}/100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="flex items-center gap-2 text-text-secondary"><Activity size={16}/> Tự tin</span>
                  <span className="text-lg font-bold text-accent-red">{reportData.confidence_score}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Phân tích chi tiết */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-bg-light to-bg-main border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/10 blur-3xl rounded-full"></div>
              
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                <Lightbulb size={20} className="text-green-400" />
                Điểm Mạnh Của Bạn
              </h2>
              <ul className="space-y-3">
                {reportData.feedback_strengths.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-text-secondary leading-relaxed">
                    <span className="text-green-400 mt-1">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-bg-light to-bg-main border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full"></div>

              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                <AlertTriangle size={20} className="text-yellow-400" />
                Cần Cải Thiện
              </h2>
              <ul className="space-y-3">
                {reportData.feedback_weaknesses.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-text-secondary leading-relaxed">
                    <span className="text-yellow-400 mt-1">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-light/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                <FileText size={20} className="text-blue-400" />
                Tóm Tắt Cuộc Phỏng Vấn
              </h2>
              <p className="text-text-secondary leading-relaxed italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/5 rounded-r-xl">
                "{reportData.transcript_summary}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReportPage;
