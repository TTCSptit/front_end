import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Users, Calendar, MapPin, DollarSign, 
  MoreVertical, Plus, Search, Filter, Clock,
  CheckCircle, AlertCircle, XCircle, BarChart3,
  Building2, Star, CreditCard, Trash2, Edit3, Zap, Briefcase
} from 'lucide-react';

// Mock data for posted jobs
const initialJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer (ReactJS)',
    location: 'Hà Nội',
    salary: '25 - 35 triệu',
    type: 'Full-time',
    status: 'active',
    views: 342,
    applications: 18,
    createdAt: '2026-02-01',
    expiresAt: '2026-03-01',
    isFeatured: true
  },
  {
    id: 2,
    title: 'Backend Engineer (NodeJS/Python)',
    location: 'TP. Hồ Chí Minh',
    salary: '20 - 30 triệu',
    type: 'Full-time',
    status: 'active',
    views: 256,
    applications: 12,
    createdAt: '2026-02-03',
    expiresAt: '2026-03-03',
    isFeatured: false
  },
  {
    id: 3,
    title: 'UI/UX Designer Intern',
    location: 'Remote',
    salary: '5 - 8 triệu',
    type: 'Internship',
    status: 'pending',
    views: 0,
    applications: 0,
    createdAt: '2026-02-06',
    expiresAt: '2026-03-06',
    isFeatured: false
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    location: 'Đà Nẵng',
    salary: '30 - 45 triệu',
    type: 'Full-time',
    status: 'expired',
    views: 189,
    applications: 8,
    createdAt: '2026-01-01',
    expiresAt: '2026-02-01',
    isFeatured: false
  }
];

const statusConfig = {
  active: { label: 'Đang hiển thị', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  expired: { label: 'Hết hạn', color: 'bg-gray-100 text-gray-500', icon: XCircle }
};

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = React.useState(initialJobs);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const handleBoost = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, isFeatured: true } : j));
    alert('Đã đẩy tin lên mục nổi bật!');
  };

  const navItems = [
    { icon: Briefcase, label: 'Tin tuyển dụng', path: '/recruiter/dashboard', active: true },
    { icon: BarChart3, label: 'Thống kê', path: '/recruiter/stats' },
    { icon: Building2, label: 'Hồ sơ công ty', path: '/recruiter/company-profile' },
    { icon: Star, label: 'Ứng viên đã lưu', path: '/recruiter/saved-candidates' },
    { icon: CreditCard, label: 'Gói dịch vụ', path: '/recruiter/pricing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${
                    item.active 
                      ? 'bg-ptit-red text-white shadow-lg shadow-red-100' 
                      : 'text-gray-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Plan Status Card */}
            {(() => {
                const activePlanId = sessionStorage.getItem('recruiter_plan') || 'basic';
                const planConfigs = {
                    basic: { name: 'Cơ bản', total: 3 },
                    pro: { name: 'Nâng cao', total: 15 },
                    premium: { name: 'Premium', total: 999 }
                };
                const plan = planConfigs[activePlanId] || planConfigs.basic;
                const used = 2; // Mock usage
                
                return (
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 text-ptit-red rounded-xl flex items-center justify-center">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Plan</div>
                                <div className="font-bold text-gray-900">Gói {plan.name}</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-gray-600">Lượt đăng tin</span>
                                <span className="text-gray-900">{used}/{plan.total === 999 ? '∞' : plan.total}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-ptit-red rounded-full"
                                    style={{ width: `${(used / plan.total) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        <Link to="/recruiter/pricing" className="mt-4 flex items-center justify-center gap-2 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition">
                            Nâng cấp ngay
                        </Link>
                    </div>
                );
            })()}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Tin tuyển dụng</h1>
                <p className="text-gray-600 mt-1">Theo dõi và quản lý các tin đăng của bạn</p>
              </div>
              <Link 
                to="/recruiter/post-job"
                className="flex items-center gap-2 px-6 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-100 w-fit"
              >
                <Plus size={20} />
                Đăng tin mới
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
                <div className="text-3xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-sm text-gray-500">Tổng tin đăng</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
                <div className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === 'active').length}</div>
                <div className="text-sm text-gray-500">Đang hiển thị</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
                <div className="text-3xl font-bold text-blue-600">{jobs.reduce((sum, j) => sum + j.views, 0)}</div>
                <div className="text-sm text-gray-500">Lượt xem</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
                <div className="text-3xl font-bold text-ptit-red">{jobs.reduce((sum, j) => sum + j.applications, 0)}</div>
                <div className="text-sm text-gray-500">Đơn ứng tuyển</div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Tìm kiếm tin đăng..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium">
                <Filter size={18} />
                Lọc
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.map((job) => {
                const StatusIcon = statusConfig[job.status].icon;
                return (
                  <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {job.isFeatured && (
                                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                                  <Zap size={10} fill="currentColor" />
                                  Nổi bật
                                </span>
                              )}
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign size={14} />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {job.type}
                              </span>
                            </div>
                          </div>
                          <span className={`shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[job.status].color}`}>
                            <StatusIcon size={12} />
                            {statusConfig[job.status].label}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-center shrink-0">
                        <div>
                          <div className="flex items-center justify-center gap-1 text-gray-900 font-bold">
                            <Eye size={16} className="text-gray-400" />
                            {job.views}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">Lượt xem</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-ptit-red font-bold">
                            <Users size={16} className="text-gray-400" />
                            {job.applications}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">Ứng viên</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Link 
                          to={`/recruiter/jobs/${job.id}/applicants`}
                          className="px-4 py-2.5 bg-ptit-red text-white text-sm font-bold rounded-xl hover:bg-red-700 transition"
                        >
                          Ứng viên
                        </Link>
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          {!job.isFeatured && job.status === 'active' && (
                            <button 
                              onClick={() => handleBoost(job.id)}
                              className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition" 
                              title="Đẩy tin nổi bật"
                            >
                              <Zap size={18} />
                            </button>
                          )}
                          <Link 
                            to={`/recruiter/edit-job/${job.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" 
                            title="Sửa tin"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(job.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition" 
                            title="Xóa tin"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <div className="flex gap-4">
                        <span>Đăng ngày: {job.createdAt}</span>
                        <span>Hết hạn: {job.expiresAt}</span>
                      </div>
                      <Link to={`/jobs/${job.id}`} className="text-ptit-red hover:underline font-medium">Xem trang công khai</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
