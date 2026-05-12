import React from 'react';
import JobCard from './JobCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedJobs } from '../services/api';

const FeaturedJobs = ({ onChatOpen }) => {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const data = await getFeaturedJobs(12); // Fetch more to allow for filtering
        const filteredData = (data || []).filter(job => !job.deadline || new Date(job.deadline) >= new Date());
        setJobs(filteredData.slice(0, 6)); // Show top 6 active jobs
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
    <section className="py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-10"
        >
          <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Việc làm nổi bật</h2>
             <div className="h-1 w-20 bg-ptit-red rounded"></div>
          </div>
          <Link to="/jobs" className="hidden md:flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1 group">
             Xem tất cả việc làm
             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <JobCard job={job} onChatOpen={onChatOpen} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
           <Link to="/jobs" className="inline-flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1">
             Xem tất cả việc làm
             <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
