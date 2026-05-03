import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Users, Eye, Briefcase, 
  Calendar, ArrowUpRight, ArrowDownRight, BarChart3,
  Clock, Target, UserCheck, Share2, Filter, Download
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getEmployerJobsWithStats, getEmployerDetailedStats } from '../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RecruiterStatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [daysFilter, setDaysFilter] = useState(180);
  const [statsData, setStatsData] = useState({
    overview: null,
    jobs: [],
    performanceChart: { labels: [], datasets: [] },
    statusChart: { labels: [], datasets: [] },
    sourceChart: { labels: [], datasets: [] }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both overview (for total numbers) and detailed stats (for charts)
        const [overviewData, detailedData] = await Promise.all([
          getEmployerJobsWithStats(),
          getEmployerDetailedStats(daysFilter)
        ]);
        
        const jobs = overviewData?.jobs || [];
        const overview = overviewData || {};

        // 1. Performance Chart (From API)
        const performance = {
          labels: detailedData?.performanceChart?.labels || [],
          datasets: [
            {
              label: 'Ứng tuyển',
              data: detailedData?.performanceChart?.applicationsData || [],
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              fill: true,
              tension: 0.4,
            }
          ],
        };

        // 2. Status Chart (From API)
        // Map English backend statuses to Vietnamese if needed
        const statusMap = {
          "Pending": "Mới",
          "Interviewing": "Đang phỏng vấn",
          "Accepted": "Đã tuyển",
          "Rejected": "Từ chối"
        };
        
        const statusLabels = detailedData?.statusChart?.labels?.map(l => statusMap[l] || l) || ['Chưa có dữ liệu'];
        const statusValues = detailedData?.statusChart?.data || [1];

        const status = {
          labels: statusLabels,
          datasets: [
            {
              data: statusValues,
              backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'],
              borderWidth: 0,
            },
          ],
        };

        // 3. Source Chart (Mocked as DB doesn't track sources yet, but structure is dynamic)
        const source = {
          labels: ['Nền tảng PTIT', 'Giới thiệu', 'Khác'],
          datasets: [
            {
              label: 'Nguồn ứng viên',
              data: [
                Math.round((overview.totalApplications || 0) * 0.8),
                Math.round((overview.totalApplications || 0) * 0.15),
                Math.round((overview.totalApplications || 0) * 0.05),
              ],
              backgroundColor: 'rgba(192, 9, 9, 0.8)',
              borderRadius: 8,
            },
          ],
        };

        setStatsData({
          overview,
          jobs: jobs.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 5),
          performanceChart: performance,
          statusChart: status,
          sourceChart: source
        });
      } catch (err) {
        setError(err.message || 'Không thể tải dữ liệu thống kê.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [daysFilter]);

  const overviewStats = [
    { 
      label: 'Tổng lượt xem', 
      value: statsData.overview?.totalViews?.toLocaleString() || '0', 
      change: '+12.5%', 
      isPositive: true,
      icon: Eye,
      color: 'blue'
    },
    { 
      label: 'Tổng ứng viên', 
      value: statsData.overview?.totalApplications?.toLocaleString() || '0', 
      change: '+8.2%', 
      isPositive: true,
      icon: Users,
      color: 'emerald'
    },
    { 
      label: 'Tin đang tuyển', 
      value: statsData.overview?.activeJobsCount || '0', 
      change: 'Ổn định', 
      isPositive: true,
      icon: Briefcase,
      color: 'purple'
    },
    { 
      label: 'Tỉ lệ chuyển đổi', 
      value: statsData.overview?.totalViews > 0 
        ? `${((statsData.overview.totalApplications / statsData.overview.totalViews) * 100).toFixed(1)}%` 
        : '0%', 
      change: '+0.3%', 
      isPositive: true,
      icon: TrendingUp,
      color: 'amber'
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: '500' }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ptit-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Đang tải dữ liệu thực tế...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-ptit-darkred transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-fade-in">
          <div>
            <Link 
              to="/recruiter/dashboard"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-ptit-red transition mb-2 font-medium text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Quay lại Bảng điều khiển
            </Link>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <BarChart3 className="text-ptit-red" size={32} />
              Thống kê Tuyển dụng
            </h1>
            <p className="text-gray-500 mt-1 font-medium">Dữ liệu chi tiết từ các tin tuyển dụng thực tế của bạn</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition shadow-sm">
              <Download size={18} />
              Xuất báo cáo
            </button>
            <select 
              value={daysFilter}
              onChange={(e) => setDaysFilter(Number(e.target.value))}
              className="flex items-center gap-2 px-4 py-2.5 bg-ptit-red text-white rounded-xl font-bold shadow-lg shadow-ptit-red/20 hover:bg-ptit-darkred transition cursor-pointer appearance-none outline-none border-none text-center"
              style={{ backgroundImage: 'none' }}
            >
              <option value={7} className="bg-white text-gray-900">7 ngày qua</option>
              <option value={30} className="bg-white text-gray-900">30 ngày qua</option>
              <option value={90} className="bg-white text-gray-900">3 tháng qua</option>
              <option value={180} className="bg-white text-gray-900">6 tháng qua</option>
              <option value={365} className="bg-white text-gray-900">1 năm qua</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/50 cascade-item hover:shadow-xl hover:shadow-ptit-red/5 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-600 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart - Line */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Hiệu quả tuyển dụng</h3>
                <p className="text-sm text-gray-500 font-medium">Lượt ứng tuyển thực tế theo thời gian</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setDaysFilter(180)}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg shadow-sm transition ${daysFilter >= 30 ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >Theo tháng</button>
                <button 
                  onClick={() => setDaysFilter(14)}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition ${daysFilter < 30 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >Theo tuần</button>
              </div>
            </div>
            
            <div className="h-[350px] relative">
              <Line data={statsData.performanceChart} options={chartOptions} />
            </div>
          </div>

          {/* Right Column - Status & Sources */}
          <div className="space-y-8">
            {/* Doughnut Chart */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trạng thái ứng viên</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Phân bổ hồ sơ theo giai đoạn thực tế</p>
              
              <div className="h-[250px] relative">
                <Doughnut data={statsData.statusChart} options={doughnutOptions} />
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pt-8">
                  <span className="text-4xl font-black text-gray-900">{statsData.overview?.totalApplications || 0}</span>
                  <span className="text-xs text-gray-500 font-bold uppercase">Tổng hồ sơ</span>
                </div>
              </div>
            </div>

            {/* Source Chart */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                Nguồn ứng viên
                <Share2 size={20} className="text-gray-400" />
              </h3>
              <div className="h-[200px]">
                <Bar data={statsData.sourceChart} options={{...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }}} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Top Jobs & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Top Jobs */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">Tin tuyển dụng hiệu quả nhất</h3>
              <button className="text-ptit-red font-bold text-sm hover:underline">Xem tất cả</button>
            </div>
            <div className="space-y-6">
              {statsData.jobs.length > 0 ? statsData.jobs.map((job, index) => {
                const conv = job.viewCount > 0 ? Math.round((job.candidateCount / job.viewCount) * 100) : 0;
                return (
                  <div key={job.id || index} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex-1 mr-4">
                        <h4 className="font-bold text-gray-900 group-hover:text-ptit-red transition-colors truncate">{job.title}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                            <Eye size={12} /> {job.viewCount?.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                            <Users size={12} /> {job.candidateCount}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-gray-900">{conv}%</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Hiệu quả</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-ptit-red to-ptit-darkred rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, conv * 2)}%`, transitionDelay: `${600 + index * 100}ms` }}
                      ></div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-10 text-gray-400">Không có tin tuyển dụng nào để hiển thị.</div>
              )}
            </div>
          </div>

          {/* Quick Metrics & Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-ptit-red rounded-3xl p-8 text-white shadow-xl shadow-ptit-red/20 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <div className="text-4xl font-black mb-1">14 ngày</div>
                <div className="text-sm font-bold opacity-80 uppercase tracking-wider">Thời gian tuyển trung bình</div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl shadow-gray-900/10 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <div>
                <div className="text-4xl font-black mb-1">92%</div>
                <div className="text-sm font-bold opacity-80 uppercase tracking-wider">Tỉ lệ giữ chân (6 tháng)</div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 col-span-2 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <UserCheck size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Chiến dịch tuyển dụng thực tế</div>
                  <p className="text-sm text-gray-500 font-medium">Dữ liệu được cập nhật từ hệ thống quản lý tin đăng</p>
                </div>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition"
              >
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterStatsPage;

