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
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="lg:w-1/3">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-ptit-red rounded-full text-xs font-bold mb-6">
                    <TrendingUp size={14} />
                    XU HƯỚNG THỊ TRƯỜNG
                 </div>
                 <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    Nhu cầu tuyển dụng <br/>
                    <span className="text-ptit-red">theo ngành nghề</span>
                 </h2>
                 <p className="text-gray-500 mb-10 text-lg font-light leading-relaxed">
                    Cập nhật liên tục các nhóm ngành đang "khát" nhân lực để bạn nắm bắt cơ hội nghề nghiệp tốt nhất.
                 </p>
                 <Link to="/market-demand" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-ptit-red transition-all shadow-xl hover:shadow-red-200 inline-block active:scale-95">
                    Xem báo cáo chi tiết
                 </Link>
             </div>
 
             <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                 {trends.map((trend, idx) => (
                     <div key={idx} className="bg-white border border-gray-100/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                        { (trend.hot || trend.Hot) && (
                          <div className="absolute top-0 right-0 bg-ptit-red text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                            <Zap size={10} fill="currentColor" />
                            HOT
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-6">
                           <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">
                              <BarChart2 className="text-gray-400 group-hover:text-ptit-red transition-colors" size={24} />
                           </div>
                           <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">+{trend.growth ?? trend.Growth ?? 0}%</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-ptit-red transition-colors line-clamp-2">
                           {trend.name || trend.Name || trend.categoryName || 'Ngành nghề'}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{trend.totalJobs ?? trend.TotalJobs ?? trend.jobCount ?? 0} việc làm đang tuyển</p>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrend;
