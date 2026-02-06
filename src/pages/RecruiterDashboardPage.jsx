import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Users, Calendar, MapPin, DollarSign, 
  MoreVertical, Plus, Search, Filter, Clock,
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

// Mock data for posted jobs
const mockJobs = [
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
    expiresAt: '2026-03-01'
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
    expiresAt: '2026-03-03'
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
    expiresAt: '2026-03-06'
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
    expiresAt: '2026-02-01'
  }
];

const statusConfig = {
  active: { label: 'Đang hiển thị', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  expired: { label: 'Hết hạn', color: 'bg-gray-100 text-gray-500', icon: XCircle }
};

const RecruiterDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">{mockJobs.length}</div>
            <div className="text-sm text-gray-500">Tổng tin đăng</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">{mockJobs.filter(j => j.status === 'active').length}</div>
            <div className="text-sm text-gray-500">Đang hiển thị</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">{mockJobs.reduce((sum, j) => sum + j.views, 0)}</div>
            <div className="text-sm text-gray-500">Lượt xem</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-ptit-red">{mockJobs.reduce((sum, j) => sum + j.applications, 0)}</div>
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
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red focus:ring-1 focus:ring-ptit-red outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <Filter size={18} />
            Lọc
          </button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {mockJobs.map((job) => {
            const StatusIcon = statusConfig[job.status].icon;
            return (
              <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
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
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[job.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[job.status].label}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Eye size={16} />
                        <span className="font-bold text-gray-900">{job.views}</span>
                      </div>
                      <div className="text-xs text-gray-400">Lượt xem</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users size={16} />
                        <span className="font-bold text-ptit-red">{job.applications}</span>
                      </div>
                      <div className="text-xs text-gray-400">Ứng viên</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/recruiter/jobs/${job.id}/applicants`}
                      className="px-4 py-2 bg-ptit-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition"
                    >
                      Xem ứng viên
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Đăng ngày: {job.createdAt}</span>
                  <span>Hết hạn: {job.expiresAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
