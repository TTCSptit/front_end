import React from 'react';
import { TrendingUp, BarChart2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedCategories } from '../services/api';

const MarketTrend = () => {
  const [trends, setTrends] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await getFeaturedCategories(6, 30);
        setTrends(data || []);
      } catch (error) {
        // Silently handle or warn if no featured categories (often expected if no recent jobs)
        console.warn("Market trends not available:", error.message);
        setTrends([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  if (loading) return <div className="py-16 text-center text-gray-500">Đang tải xu hướng thị trường...</div>;


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/3">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-ptit-red rounded-full text-sm font-bold mb-4">
                    <TrendingUp size={16} />
                    Xu hướng thị trường
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    Nhu cầu tuyển dụng <br/>
                    <span className="text-ptit-red">theo ngành nghề</span>
                 </h2>
                 <p className="text-gray-500 mb-8">
                    Cập nhật liên tục các nhóm ngành đang "khát" nhân lực để bạn nắm bắt cơ hội nghề nghiệp tốt nhất.
                 </p>
                 <Link to="/market-demand" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-ptit-red transition-all shadow-lg hover:shadow-red-200 inline-block">
                    Xem báo cáo chi tiết
                 </Link>
             </div>

             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                 {trends.map((trend, idx) => (
                     <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-xl hover:shadow-lg hover:border-red-100 transition-all cursor-pointer group relative overflow-hidden">
                        {trend.hot && (
                          <div className="absolute top-0 right-0 bg-ptit-red text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                            <Zap size={10} fill="currentColor" />
                            HOT
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-4">
                           <BarChart2 className="text-gray-400 group-hover:text-ptit-red transition-colors" />
                           <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{trend.growth}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-ptit-red transition-colors">{trend.categoryName}</h3>
                        <p className="text-sm text-gray-500">{trend.jobCount} việc làm</p>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrend;
