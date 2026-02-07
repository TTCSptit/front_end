import React, { useState } from 'react';
import { 
  Search, Briefcase, MapPin, DollarSign, Clock, 
  ChevronRight, Calendar, CheckCircle2, AlertCircle, 
  ArrowRight, Filter, SlidersHorizontal, LayoutGrid, List
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AppliedJobsPage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Mock Data for applied jobs
  const appliedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer (React/Vue)",
      company: "Tập đoàn ABC Technology",
      logo: "https://ui-avatars.com/api/?name=ABC+Tech&background=0D8ABC&color=fff&size=128",
      salary: "20 - 35 Triệu",
      location: "Hà Nội",
      appliedDate: "07/02/2026",
      status: "Đang xem xét",
      statusColor: "blue",
      progress: 30
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "FPT Software",
      logo: "https://ui-avatars.com/api/?name=FPT&background=f00&color=fff&size=128",
      salary: "15 - 25 Triệu",
      location: "Đà Nẵng",
      appliedDate: "05/02/2026",
      status: "Đã duyệt CV",
      statusColor: "green",
      progress: 60
    },
    {
      id: 3,
      title: "Mobile App Developer (Flutter)",
      company: "Viettel Group",
      logo: "https://ui-avatars.com/api/?name=Viettel&background=ed1c24&color=fff&size=128",
      salary: "18 - 30 Triệu",
      location: "Hồ Chí Minh",
      appliedDate: "02/02/2026",
      status: "Đang phỏng vấn",
      statusColor: "amber",
      progress: 85
    }
  ];

  const getStatusStyle = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-ptit-red font-bold text-sm mb-2 uppercase tracking-widest">
                <Briefcase size={16} />
                Trung tâm nghề nghiệp
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Việc làm đã nộp</h1>
              <p className="text-gray-500 mt-2 font-medium">Theo dõi trạng thái và tiến độ ứng tuyển của bạn</p>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-1 rounded-xl flex">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-ptit-red' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-ptit-red' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors">
                    <Filter size={16} /> Tất cả trạng thái
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors">
                    <Calendar size={16} /> Mới nhất
                </button>
            </div>
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo vị trí hoặc công ty..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-ptit-red outline-none text-sm font-medium"
                />
            </div>
        </div>

        {/* Applied Jobs List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {appliedJobs.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl border border-gray-100 hover:border-ptit-red/30 transition-all group overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-center p-6 gap-6 shadow-sm hover:shadow-xl' : 'p-6 shadow-sm hover:shadow-xl'}`}
            >
              {/* Company Logo */}
              <div className={`flex-shrink-0 ${viewMode === 'grid' ? 'mb-6' : ''}`}>
                <img 
                  src={item.logo} 
                  alt={item.company} 
                  className="w-16 h-16 rounded-2xl object-contain border border-gray-50 p-1 group-hover:scale-110 transition-transform" 
                />
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-black text-xl text-gray-900 group-hover:text-ptit-red transition-colors mb-1 tracking-tight">
                        {item.title}
                    </h3>
                    <p className="font-bold text-gray-500 mb-4">{item.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5 font-bold">
                            <MapPin size={16} className="text-gray-400" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-green-600">
                            <DollarSign size={16} /> {item.salary}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold">
                            <Clock size={16} className="text-gray-400" /> Nộp ngày: {item.appliedDate}
                        </span>
                    </div>
                  </div>

                  {/* Progress Bar (List view only) */}
                  {viewMode === 'list' && (
                    <div className="hidden lg:block w-48 mr-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tiến độ</span>
                            <span className="text-[10px] font-black text-ptit-red">{item.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-ptit-red to-orange-400 rounded-full transition-all duration-1000" 
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Actions */}
              <div className={`flex items-center justify-between md:justify-end gap-6 ${viewMode === 'grid' ? 'mt-6 pt-6 border-t border-gray-50' : 'flex-shrink-0'}`}>
                <div className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest whitespace-nowrap ${getStatusStyle(item.statusColor)}`}>
                    {item.status}
                </div>
                
                <Link 
                  to={`/job/${item.id}`} 
                  className="w-10 h-10 bg-gray-950 text-white rounded-xl flex items-center justify-center hover:bg-ptit-red transition-all shadow-lg hover:shadow-red-500/20 active:scale-90"
                >
                    <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Mockup */}
        {appliedJobs.length === 0 && (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <Briefcase size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Bạn chưa nộp hồ sơ nào</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Hàng ngàn cơ hội việc làm hấp dẫn đang chờ đón bạn. Bắt đầu hành trình sự nghiệp ngay!</p>
                <Link to="/home" className="inline-flex items-center gap-2 bg-ptit-red text-white px-8 py-4 rounded-2xl font-black hover:bg-ptit-darkred transition-all shadow-xl shadow-red-100">
                    Tìm kiếm việc làm <ArrowRight size={20} />
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
