import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Users, Eye, Briefcase, 
  Calendar, ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';

const RecruiterStatsPage = () => {
  // Mock data
  const overviewStats = [
    { 
      label: 'Tổng lượt xem', 
      value: '12,456', 
      change: '+12.5%', 
      isPositive: true,
      icon: Eye,
      color: 'blue'
    },
    { 
      label: 'Tổng ứng viên', 
      value: '324', 
      change: '+8.2%', 
      isPositive: true,
      icon: Users,
      color: 'green'
    },
    { 
      label: 'Tin đang tuyển', 
      value: '8', 
      change: '-2', 
      isPositive: false,
      icon: Briefcase,
      color: 'purple'
    },
    { 
      label: 'Tỉ lệ chuyển đổi', 
      value: '2.6%', 
      change: '+0.3%', 
      isPositive: true,
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const weeklyData = [
    { day: 'T2', views: 145, applications: 12 },
    { day: 'T3', views: 232, applications: 19 },
    { day: 'T4', views: 187, applications: 15 },
    { day: 'T5', views: 298, applications: 24 },
    { day: 'T6', views: 342, applications: 28 },
    { day: 'T7', views: 189, applications: 14 },
    { day: 'CN', views: 124, applications: 9 }
  ];

  const topJobs = [
    { title: 'Senior Frontend Developer', views: 2340, applications: 45, conversion: 1.9 },
    { title: 'Backend Developer (NodeJS)', views: 1890, applications: 38, conversion: 2.0 },
    { title: 'UI/UX Designer', views: 1560, applications: 52, conversion: 3.3 },
    { title: 'DevOps Engineer', views: 1230, applications: 28, conversion: 2.3 },
    { title: 'Product Manager', views: 980, applications: 21, conversion: 2.1 }
  ];

  const maxViews = Math.max(...weeklyData.map(d => d.views));

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
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
            Quay lại Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thống kê & Báo cáo</h1>
              <p className="text-gray-600 mt-1">Theo dõi hiệu quả tuyển dụng của bạn</p>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-ptit-red">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>3 tháng qua</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <stat.icon size={24} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Lượt xem & Ứng tuyển</h3>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-ptit-red rounded-full"></span>
                  Lượt xem
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Ứng tuyển
                </span>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between gap-4 h-64">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1" style={{ height: '200px' }}>
                    <div 
                      className="w-full max-w-8 bg-ptit-red/80 rounded-t-lg transition-all hover:bg-ptit-red"
                      style={{ height: `${(data.views / maxViews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Jobs */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={20} className="text-ptit-red" />
                <h3 className="text-lg font-bold text-gray-900">Tin tuyển dụng hàng đầu</h3>
              </div>
              <div className="space-y-4">
                {topJobs.map((job, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="font-medium text-gray-900 mb-2 truncate">{job.title}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{job.views.toLocaleString()} views</span>
                      <span className="text-gray-500">{job.applications} CV</span>
                      <span className="text-green-600 font-medium">{job.conversion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Insights CTA */}
            <div className="bg-gradient-to-br from-ptit-red to-ptit-darkred rounded-2xl p-8 text-white shadow-lg shadow-red-100 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Phân tích Nhu cầu</h3>
                <p className="text-red-50 text-sm mb-6 leading-relaxed"> Xem báo cáo chi tiết về nhu cầu tuyển dụng và xu hướng các ngành nghề hot nhất hiện nay.</p>
                <Link 
                  to="/recruiter/demand-report"
                  className="z-20 relative inline-flex items-center gap-2 px-6 py-3 bg-white text-ptit-red font-bold rounded-xl hover:bg-red-50 transition-all transform hover:scale-105 active:scale-95 shadow-md no-underline"
                >
                  <BarChart3 size={20} />
                  Xem báo cáo chi tiết
                </Link>
              </div>
              <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterStatsPage;
