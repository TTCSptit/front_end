import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { getJobs, getCategories } from '../services/api';

const AllJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Local filter states
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [industry, setIndustry] = useState(searchParams.get('industry') || '');

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = {
        keyword: searchParams.get('keyword'),
        location: searchParams.get('location'),
        categoryName: searchParams.get('industry')
      };
      const jobData = await getJobs(filters);
      setJobs(jobData.items || jobData || []);
      
      const catData = await getCategories();
      setCategories(catData || []);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách việc làm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = {};
    if (keyword) newParams.keyword = keyword;
    if (location) newParams.location = location;
    if (industry) newParams.industry = industry;
    setSearchParams(newParams);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 pt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
            <Link to="/home" className="inline-flex items-center text-gray-500 hover:text-ptit-red mb-4 transition-colors">
                <ChevronLeft size={20} />
                Quay lại trang chủ
            </Link>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm việc làm</h1>
                    <p className="text-gray-500">Tìm thấy {jobs.length} cơ hội nghề nghiệp phù hợp với bạn</p>
                </div>
                <div className="flex items-center gap-2 bg-red-50 text-ptit-red px-4 py-2 rounded-lg font-bold">
                    <Briefcase size={20} />
                    <span>Khám phá ngay</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
                        <Filter size={20} />
                        Bộ lọc tìm kiếm
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Từ khóa</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Vị trí, công ty..." 
                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-ptit-red outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Ngành nghề</label>
                            <select 
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                            >
                                <option value="">Tất cả ngành nghề</option>
                                {categories.map(cat => (
                                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Địa điểm</label>
                            <select 
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                            >
                                <option value="">Tất cả địa điểm</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-ptit-red text-white font-bold py-2 rounded-lg hover:bg-ptit-darkred transition-colors mt-2">
                            Tìm kiếm ngay
                        </button>
                    </div>
                </form>
            </div>

            {/* Job List */}
            <div className="lg:col-span-3">
                {loading && <div className="text-center py-10">Đang tải danh sách việc làm...</div>}
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}
                
                {!loading && jobs.length === 0 && !error && (
                  <div className="bg-white p-12 rounded-xl text-center border border-dashed border-gray-200">
                    <p className="text-gray-400">Không tìm thấy việc làm nào phù hợp.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {!loading && jobs.map((job, index) => (
                        <div key={job.id || index} className="h-full">
                             <JobCard job={job} linkType="job" /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobsPage;
