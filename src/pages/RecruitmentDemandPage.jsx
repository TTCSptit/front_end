import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BarChart3, TrendingUp, Users, 
  Search, Filter, ChevronRight, Info,
  Zap, Brain, Target, DollarSign
} from 'lucide-react';
import { getFeaturedCategories, getMarketSummary, getMarketInsights } from '../services/api';

const RecruitmentDemandPage = () => {
  const [timeRange, setTimeRange] = useState('30 ngày qua');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryDemands, setIndustryDemands] = useState([]);
  const [summaryStats, setSummaryStats] = useState({ totalJobs: 0, totalCompanies: 0, monthlyNewJobs: 0, growthPercentage: 0 });
  const [marketInsights, setMarketInsights] = useState({ avgHiringTime: 0, appsPerJob: 0, offerAcceptanceRate: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const days = timeRange === '7 ngày qua' ? 7 : timeRange === '30 ngày qua' ? 30 : timeRange === '3 tháng qua' ? 90 : 365;
        
        // Parallel fetching
        const [categoriesData, summaryData, insightsData] = await Promise.all([
          getFeaturedCategories(15, days),
          getMarketSummary(),
          getMarketInsights()
        ]);
        
        setSummaryStats(summaryData);
        setMarketInsights(insightsData);
        
        // Map API data to our UI format
        const mappedData = categoriesData.map(cat => {
          const competition = cat.competitionRatio > 15 ? 'Cao' : cat.competitionRatio > 5 ? 'Trung bình' : 'Thấp';
          
          return {
            id: cat.id,
            name: cat.name,
            index: Math.min(100, Math.round(cat.totalJobs * 2.5)), 
            trend: `+${((cat.growth / Math.max(1, cat.totalJobs)) * 100).toFixed(1)}%`,
            competition: competition,
            avgSalary: cat.salaryMin && cat.salaryMax 
              ? `${Math.round(cat.salaryMin/1000000)} - ${Math.round(cat.salaryMax/1000000)}M` 
              : 'Thỏa thuận',
            growth: cat.growth,
            competitionRatio: cat.competitionRatio,
            topSkills: cat.topSkills && cat.topSkills.length > 0 ? cat.topSkills : ['General'],
            growthColor: 'text-green-600'
          };
        });
        
        setIndustryDemands(mappedData);
      } catch (error) {
        console.error("Failed to fetch demand data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  const filteredDemands = industryDemands.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic career roadmaps based on top industries
  const careerRoadmaps = industryDemands.slice(0, 2).map(item => {
    // Basic mapping for duration based on category (can be enhanced further)
    const durationMap = {
      'CNTT': '6-12 tháng',
      'Kinh doanh': '3-6 tháng',
      'Marketing': '4-8 tháng',
      'Thiết kế': '5-10 tháng'
    };

    const duration = durationMap[Object.keys(durationMap).find(k => item.name.includes(k))] || '6-9 tháng';
    
    return {
      id: item.id,
      title: item.name.includes('Lập trình') ? item.name : `Chuyên viên ${item.name}`,
      duration: duration,
      steps: item.topSkills.length > 0 ? item.topSkills : ["Kiến thức nền tảng", "Công cụ chuyên ngành", "Thực hành dự án", "Kỹ năng mềm"],
      demand: item.index > 80 ? "Rất cao" : "Cao"
    };
  });

  const handleOpenAiChat = (topic) => {
    // We can dispatch a custom event or use a global state to open chatbot with prompt
    const chatEvent = new CustomEvent('open-chatbot', { 
      detail: { message: `Phân tích giúp tôi nhu cầu tuyển dụng ngành ${topic} hiện nay.` } 
    });
    window.dispatchEvent(chatEvent);
  };

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
              <div className="text-2xl font-bold text-gray-900">+{summaryStats.growthPercentage}%</div>
              <div className="text-sm text-gray-500">Tăng trưởng chung</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{summaryStats.totalCompanies}</div>
              <div className="text-sm text-gray-500">Doanh nghiệp đăng ký</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Zap size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{summaryStats.totalJobs}</div>
              <div className="text-sm text-gray-500">Việc làm đang tuyển</div>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-10 text-center text-gray-500">
                      Đang tải dữ liệu phân tích...
                    </td>
                  </tr>
                ) : filteredDemands.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-10 text-center text-gray-500">
                      Không tìm thấy dữ liệu phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredDemands.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-gray-50/50 transition cursor-pointer"
                      onClick={() => navigate(`/industry/${item.id}`)}
                    >
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
                        <button 
                          className="text-gray-400 hover:text-ptit-red transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAiChat(item.name);
                          }}
                        >
                          <Brain size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
              {industryDemands.length > 0 && (
                <>
                  {/* Opportunity: Industry with highest growth */}
                  {(() => {
                    const topGrowth = [...industryDemands].sort((a, b) => b.growth - a.growth)[0];
                    return (
                      <div className="p-4 bg-red-50 rounded-xl border-l-4 border-ptit-red text-sm">
                        <div className="font-bold text-ptit-red mb-1 uppercase tracking-wider text-xs">Cơ hội</div>
                        <p className="text-gray-700 leading-relaxed">
                          Ngành <strong>{topGrowth.name}</strong> đang có xu hướng tăng trưởng tốt. Đây là thời điểm vàng để đẩy mạnh thu hút nhân tài và mở rộng đội ngũ.
                        </p>
                      </div>
                    );
                  })()}

                  {/* Warning: Industry with highest competition */}
                  {(() => {
                    const topComp = [...industryDemands].sort((a, b) => b.competitionRatio - a.competitionRatio)[0];
                    return (
                      <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500 text-sm">
                        <div className="font-bold text-orange-600 mb-1 uppercase tracking-wider text-xs">Lưu ý</div>
                        <p className="text-gray-700 leading-relaxed">
                          Ngành <strong>{topComp.name}</strong> đang có tỉ lệ cạnh tranh cao ({(topComp.competitionRatio || 0).toFixed(1)} ứng viên/tin). Cần tối ưu quy trình lọc hồ sơ để không bỏ lỡ ứng viên tốt.
                        </p>
                      </div>
                    );
                  })()}
                </>
              )}
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
                  <span className="font-bold text-gray-900">{marketInsights.avgHiringTime} ngày</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Số lượng ứng viên / tin đăng</span>
                  <span className="font-bold text-gray-900">{marketInsights.appsPerJob}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-ptit-red w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tỉ lệ chấp nhận offer</span>
                  <span className="font-bold text-gray-900">{marketInsights.offerAcceptanceRate}%</span>
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
                <button 
                  onClick={() => navigate(`/industry/${roadmap.id}`)}
                  className="w-full mt-6 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-ptit-red hover:text-white transition-colors"
                >
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
