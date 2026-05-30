import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Users, Calendar, MapPin, DollarSign, 
  MoreVertical, Plus, Search, Filter, Clock,
  CheckCircle, AlertCircle, XCircle, BarChart3,
  Building2, Star, Trash2, Edit3, Zap, Briefcase, MessageCircle, Bot
} from 'lucide-react';
import { getEmployerJobsWithStats, deleteJob } from '../services/api';

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
  const [jobs, setJobs] = React.useState([]);
  const [overview, setOverview] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [keyword, setKeyword] = React.useState('');

  const fetchData = async (kw = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await getEmployerJobsWithStats(kw);
      setOverview(data);
      setJobs(data?.jobs ?? []);
    } catch (err) {
      setError(err.message || 'Không thể tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchData(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(keyword);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) {
      try {
        await deleteJob(id);
        setJobs(prev => prev.filter(j => j.id !== id));
      } catch (err) {
        alert(err.message || 'Xóa thất bại.');
      }
    }
  };

  const FEATURED_LIMIT = 3;

  const handleBoost = (id) => {
    const featuredCount = jobs.filter(j => j.isFeatured).length;
    if (featuredCount >= FEATURED_LIMIT) {
      alert(`Bạn đã đạt giới hạn ${FEATURED_LIMIT} tin nổi bật. Vui lòng gỡ bớt tin nổi bật khác để tiếp tục.`);
      return;
    }
    setJobs(jobs.map(j => j.id === id ? { ...j, isFeatured: true } : j));
    alert('Đã đẩy tin lên mục nổi bật!');
  };

  const navItems = [
    { icon: Briefcase, label: 'Tin tuyển dụng', path: '/recruiter/dashboard', active: true },
    { icon: BarChart3, label: 'Thống kê', path: '/recruiter/stats' },
    { icon: MessageCircle, label: 'Tin nhắn', path: '/recruiter/messages' },
    { icon: Building2, label: 'Hồ sơ công ty', path: '/recruiter/company-profile' },
    { icon: Star, label: 'Ứng viên đã lưu', path: '/recruiter/saved-candidates' }
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                    item.active 
                      ? 'bg-gradient-to-r from-ptit-red to-red-600 text-white shadow-lg shadow-red-200 translate-x-2' 
                      : 'text-gray-600 hover:bg-white hover:text-ptit-red hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                    <item.icon size={18} />
                  </div>
                  {item.label}
                </Link>
              ))}
            </div>

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Briefcase size={24} />
                  </div>
                  <div className="text-3xl font-black text-gray-900 leading-none">{overview?.totalPostedJobs ?? jobs.length}</div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">Tổng tin đăng</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle size={24} />
                  </div>
                  <div className="text-3xl font-black text-emerald-600 leading-none">{overview?.activeJobsCount ?? jobs.length}</div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">Đang hiển thị</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                    <Eye size={24} />
                  </div>
                  <div className="text-3xl font-black text-amber-600 leading-none">{overview?.totalViews ?? 0}</div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">Lượt xem</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-rose-100 text-ptit-red rounded-2xl flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <div className="text-3xl font-black text-ptit-red leading-none">{overview?.totalApplications ?? 0}</div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">Đơn ứng tuyển</div>
                </div>
              </div>
            </div>

            {/* Search & Filter */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm tin đăng..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none shadow-sm"
                />
              </div>
              <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-ptit-red text-white border border-transparent rounded-xl hover:bg-red-700 transition shadow-sm font-medium">
                <Search size={18} />
                Tìm kiếm
              </button>
            </form>

            {/* Loading / Error */}
            {loading && <div className="text-center py-16 text-gray-500">Đang tải dữ liệu...</div>}
            {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-4">{error}</div>}

            {/* Jobs List */}
            <div className="space-y-4">
              {Array.isArray(jobs) && jobs.length > 0 ? jobs.map((job, index) => {
                // Calculate effective status
                const deadline = job.expiresAt || job.deadline || job.expiredAt;
                const isExpired = deadline ? new Date(deadline) < new Date() : false;
                const effectiveStatus = isExpired ? 'expired' : (job.status || 'active');
                
                const statusInfo = statusConfig[effectiveStatus] || statusConfig.active;
                const StatusIcon = statusInfo.icon;
                return (
                  <div key={job.id || index} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-ptit-red/20 transition-all duration-300 relative overflow-hidden group ${isExpired ? 'opacity-75' : ''}`}>
                    {/* Accent Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2 ${
                      isExpired ? 'bg-gray-300' : 'bg-ptit-red'
                    }`}></div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
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
                                {job.salaryMin && job.salaryMax 
                                  ? `${job.salaryMin} - ${job.salaryMax} triệu`
                                  : job.isNegotiable ? 'Thỏa thuận' : 'Lương hấp dẫn'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {job.jobType === 0 ? 'Full-time' : job.jobType === 1 ? 'Part-time' : job.jobType === 2 ? 'Internship' : 'Remote'}
                              </span>
                            </div>
                          </div>
                          <span className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusInfo.color} shadow-sm`}>
                            <StatusIcon size={12} strokeWidth={3} />
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-8 text-center shrink-0 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="min-w-[60px]">
                          <div className="flex items-center justify-center gap-1.5 text-gray-900 font-black text-lg">
                            <Eye size={18} className="text-amber-500" />
                            {job.viewCount}
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Lượt xem</div>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="min-w-[60px]">
                          <div className="flex items-center justify-center gap-1.5 text-ptit-red font-black text-lg">
                            <Users size={18} className="text-ptit-red" />
                            {job.candidateCount}
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Ứng viên</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Link 
                          to={`/recruiter/jobs/${job.id}/applicants`}
                          className="px-6 py-3 bg-gradient-to-r from-ptit-red to-red-600 text-white text-sm font-black rounded-2xl hover:shadow-lg hover:shadow-red-200 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md"
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
              }) : !loading && (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-dashed border-gray-200">
                  Bạn chưa đăng tin tuyển dụng nào.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
