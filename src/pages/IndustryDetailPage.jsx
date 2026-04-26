import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { getJobs, getCategories } from '../services/api';

const IndustryDetailPage = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [industryName, setIndustryName] = useState('Ngành nghề');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getCategories();
        const currentCat = cats.find(c => c.id.toString() === id);
        if (currentCat) {
          setIndustryName(currentCat.name);
          const jobData = await getJobs({ categorySlug: currentCat.slug });
          setJobs(jobData.items || []);
        }
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách việc làm.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
            <Link to="/industries" className="inline-flex items-center text-gray-500 hover:text-ptit-red mb-4 transition-colors">
                <ChevronLeft size={20} />
                Quay lại danh sách ngành nghề
            </Link>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{industryName}</h1>
                    <p className="text-gray-500">Danh sách các việc làm hot nhất trong ngành {industryName}</p>
                </div>
                <div className="flex items-center gap-2 bg-red-50 text-ptit-red px-4 py-2 rounded-lg font-bold">
                    <Briefcase size={20} />
                    <span>{jobs.length} việc làm đang tuyển</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
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
                                    placeholder="Tìm vị trí, công ty..." 
                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-ptit-red outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Địa điểm</label>
                            <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                                <option>Tất cả địa điểm</option>
                                <option>Hà Nội</option>
                                <option>TP. Hồ Chí Minh</option>
                                <option>Đà Nẵng</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Mức lương</label>
                            <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                                <option>Tất cả mức lương</option>
                                <option>Dưới 10 triệu</option>
                                <option>10 - 20 triệu</option>
                                <option>20 - 50 triệu</option>
                                <option>Trên 50 triệu</option>
                            </select>
                        </div>

                        <button className="w-full bg-ptit-red text-white font-bold py-2 rounded-lg hover:bg-ptit-darkred transition-colors mt-2">
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className="lg:col-span-3">
                {loading && <div className="text-center py-10">Đang tải danh sách việc làm...</div>}
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}
                
                <div className="grid grid-cols-1 gap-4">
                    {!loading && jobs.map((job) => (
                        // Passing linkType='job' so that clicking Apply goes to JobDetail, 
                        // NOT CompanyDetail (since we are already drilling down to jobs)
                        <div key={job.id} className="h-full">
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

export default IndustryDetailPage;
