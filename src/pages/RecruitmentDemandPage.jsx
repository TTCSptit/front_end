import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BarChart3, TrendingUp, Users, 
  Search, Filter, ChevronRight, Info,
  Zap, Brain, Target, DollarSign
} from 'lucide-react';

const RecruitmentDemandPage = () => {
  const [timeRange, setTimeRange] = useState('30 ngày qua');
  const navigate = useNavigate();

  const industryDemands = [
    {
      id: 1,
      name: 'Công nghệ thông tin',
      index: 92,
      trend: '+15.4%',
      competition: 'Cao',
      avgSalary: '25 - 45M',
      topSkills: ['React', 'NodeJS', 'Cloud'],
      growthColor: 'text-green-600'
    },
    {
      id: 2,
      name: 'Marketing / Truyền thông',
      index: 78,
      trend: '+8.2%',
      competition: 'Trung bình',
      avgSalary: '15 - 30M',
      topSkills: ['SEO', 'Content', 'Data'],
      growthColor: 'text-green-600'
    },
    {
      id: 3,
      name: 'Kinh doanh / Bán hàng',
      index: 85,
      trend: '+5.1%',
      competition: 'Trung bình',
      avgSalary: '12 - 25M + HH',
      topSkills: ['Communication', 'CRM', 'Negotiation'],
      growthColor: 'text-green-600'
    },
    {
      id: 4,
      name: 'Y tế / Chăm sóc sức khỏe',
      index: 64,
      trend: '-2.4%',
      competition: 'Thấp',
      avgSalary: '10 - 20M',
      topSkills: ['Specialization', 'English'],
      growthColor: 'text-red-600'
    },
    {
      id: 5,
      name: 'Thiết kế / Sáng tạo',
      index: 72,
      trend: '+12.7%',
      competition: 'Cao',
      avgSalary: '18 - 35M',
      topSkills: ['UI/UX', 'Figma', 'Motion'],
      growthColor: 'text-green-600'
    }
  ];

  const careerRoadmaps = [
    {
      title: "Lập trình viên Fullstack",
      duration: "6-12 tháng",
      steps: ["HTML/CSS/JS Cơ bản", "React/Link/Vue", "NodeJS/Python Backend", "Cloud & DevOps"],
      demand: "Rất cao"
    },
    {
      title: "Chuyên viên Digital Marketing",
      duration: "4-8 tháng",
      steps: ["Content Writing", "SEO Foundation", "Paid Ads (FB/Google)", "Data Analysis"],
      demand: "Cao"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="text-ptit-red" size={32} />
                Phân tích Thị trường Lao động
              </h1>
              <p className="text-gray-600 mt-1">Cập nhật xu hướng tuyển dụng và nhu cầu nhân lực theo ngành nghề</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Khoảng thời gian:</span>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ptit-red shadow-sm font-medium"
              >
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>3 tháng qua</option>
                <option>1 năm qua</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-red-50 text-ptit-red rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">+12.5%</div>
              <div className="text-sm text-gray-500">Tăng trưởng chung</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,240</div>
              <div className="text-sm text-gray-500">Doanh nghiệp mới</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Zap size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">45,000+</div>
              <div className="text-sm text-gray-500">Tin đăng trong tháng</div>
            </div>
          </div>
        </div>

        {/* Industry Detailed Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Chi tiết theo Ngành nghề</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm ngành nghề..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-ptit-red"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-4">Ngành nghề</th>
                  <th className="px-6 py-4">Chỉ số nhu cầu</th>
                  <th className="px-6 py-4">Xu hướng</th>
                  <th className="px-6 py-4">Độ cạnh tranh</th>
                  <th className="px-6 py-4">Mức lương TB</th>
                  <th className="px-6 py-4">Kỹ năng HOT</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {industryDemands.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition truncate">
                    <td className="px-8 py-5">
                      <div className="font-bold text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-[80px]">
                          <div 
                            className="h-full bg-ptit-red rounded-full" 
                            style={{ width: `${item.index}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-700">{item.index}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`font-bold flex items-center gap-1 ${item.growthColor}`}>
                        <TrendingUp size={14} />
                        {item.trend}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        item.competition === 'Cao' ? 'bg-red-100 text-red-700' :
                        item.competition === 'Trung bình' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.competition}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 font-medium text-gray-700">
                        <DollarSign size={14} className="text-gray-400" />
                        {item.avgSalary}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {item.topSkills.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button className="text-gray-400 hover:text-ptit-red transition">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insight Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="text-ptit-red" size={24} />
              Gợi ý Chiến lược Tuyển dụng
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border-l-4 border-ptit-red text-sm">
                <div className="font-bold text-ptit-red mb-1 uppercase tracking-wider text-xs">Cơ hội</div>
                <p className="text-gray-700 leading-relaxed">
                  Ngành <strong>Thiết kế / Sáng tạo</strong> đang có xu hướng tăng trưởng mạnh (+12.7%). Đây là thời điểm tốt để đẩy mạnh thu hút nhân tài UI/UX.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500 text-sm">
                <div className="font-bold text-orange-600 mb-1 uppercase tracking-wider text-xs">Lưu ý</div>
                <p className="text-gray-700 leading-relaxed">
                  Ngành <strong>CNTT</strong> duy trì độ cạnh tranh "Cao". Cần tối ưu hóa quy trình phỏng vấn và đề xuất mức lương linh hoạt để giữ chân ứng viên.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="text-ptit-red" size={24} />
              Chỉ số cạnh tranh thị trường
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Thời gian tuyển trung bình</span>
                  <span className="font-bold text-gray-900">22 ngày</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Số lượng ứng viên / tin đăng</span>
                  <span className="font-bold text-gray-900">18.5</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-ptit-red w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tỉ lệ chấp nhận offer</span>
                  <span className="font-bold text-gray-900">72%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[72%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Roadmap Suggestions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Zap className="text-ptit-red" size={28} />
            Lộ trình Nghề nghiệp Đề xuất
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careerRoadmaps.map((roadmap, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{roadmap.title}</h3>
                    <span className="text-sm text-gray-500">Thời gian đào tạo: {roadmap.duration}</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Nhu cầu: {roadmap.demand}
                  </span>
                </div>
                <div className="space-y-3">
                  {roadmap.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-50 text-ptit-red text-xs font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </div>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-ptit-red hover:text-white transition-colors">
                  Chi tiết lộ trình
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDemandPage;
