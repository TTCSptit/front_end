import React, { useState } from 'react';
import { Search, Code, Megaphone, BarChart3, Stethoscope, Palette, Briefcase, GraduationCap, Cpu, Globe, Building2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const industries = [
    { id: 1, name: 'Công nghệ thông tin', count: 1243, icon: <Code size={32} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, name: 'Marketing / Truyền thông', count: 856, icon: <Megaphone size={32} />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 3, name: 'Kinh doanh / Bán hàng', count: 2105, icon: <BarChart3 size={32} />, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 4, name: 'Y tế / Chăm sóc sức khỏe', count: 432, icon: <Stethoscope size={32} />, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 5, name: 'Thiết kế / Sáng tạo', count: 567, icon: <Palette size={32} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 6, name: 'Hành chính / Nhân sự', count: 789, icon: <Briefcase size={32} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 7, name: 'Giáo dục / Đào tạo', count: 345, icon: <GraduationCap size={32} />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 8, name: 'Điện tử viễn thông', count: 678, icon: <Cpu size={32} />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 9, name: 'Logistics / Vận tải', count: 234, icon: <Truck size={32} />, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 10, name: 'Xây dựng / Kiến trúc', count: 456, icon: <Building2 size={32} />, color: 'text-gray-600', bg: 'bg-gray-50' },
    { id: 11, name: 'Du lịch / Khách sạn', count: 321, icon: <Globe size={32} />, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 12, name: 'Tài chính / Ngân hàng', count: 987, icon: <DollarSignIcon size={32} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  // Helper for manual icon rendering if needed, but array above works fine
  function DollarSignIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
  }

  const filteredIndustries = industries.filter(ind => 
    ind.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Khám phá nghề nghiệp</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Tìm kiếm cơ hội việc làm phù hợp với bạn trong hàng ngàn công việc từ các ngành nghề hot nhất hiện nay.
          </p>
          
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Tìm kiếm ngành nghề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-ptit-red focus:border-transparent outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIndustries.map((item) => (
            <Link 
              to={`/industry/${item.id}`} 
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-ptit-red transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {item.count.toLocaleString()} việc làm
              </p>
            </Link>
          ))}
        </div>

        {filteredIndustries.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Không tìm thấy ngành nghề phù hợp với từ khóa "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustriesPage;
