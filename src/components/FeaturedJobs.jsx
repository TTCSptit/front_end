import React from 'react';
import JobCard from './JobCard';
import { ArrowRight } from 'lucide-react';
import { getFeaturedJobs } from '../services/api';

const FeaturedJobs = ({ onChatOpen }) => {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const data = await getFeaturedJobs(6);
        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedJobs();
  }, []);

  if (loading) return <div className="py-16 text-center text-gray-500">Đang tải việc làm nổi bật...</div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Việc làm nổi bật</h2>
             <div className="h-1 w-20 bg-ptit-red rounded"></div>
          </div>
          <a href="#" className="hidden md:flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1 group">
             Xem tất cả việc làm
             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard job={job} onChatOpen={onChatOpen} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
           <a href="#" className="inline-flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1">
             Xem tất cả việc làm
             <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
