import React, { useState, useEffect } from 'react';
import { Search, Code, Megaphone, BarChart3, Stethoscope, Palette, Briefcase, GraduationCap, Cpu, Globe, Building2, Truck, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

const IndustriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setIndustries(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('it') || n.includes('lập trình') || n.includes('công nghệ')) return <Code size={32} />;
    if (n.includes('marketing')) return <Megaphone size={32} />;
    if (n.includes('kinh doanh')) return <BarChart3 size={32} />;
    if (n.includes('y tế')) return <Stethoscope size={32} />;
    if (n.includes('thiết kế')) return <Palette size={32} />;
    if (n.includes('giáo dục')) return <GraduationCap size={32} />;
    if (n.includes('tài chính')) return <DollarSign size={32} />;
    return <Briefcase size={32} />;
  };

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
              <div className={`w-14 h-14 rounded-xl bg-red-50 text-ptit-red flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {getIcon(item.name)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-ptit-red transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {item.jobCount?.toLocaleString() || 0} việc làm
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
