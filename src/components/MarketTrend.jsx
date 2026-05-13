import React from 'react';
import { 
  TrendingUp, BarChart2, Zap, Globe, Smartphone, Brain, ShieldCheck, 
  Palette, Bug, Cpu, Database, Cloud, Terminal, Code2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedCategories } from '../services/api';

const getCategoryIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('web')) return <Globe size={24} />;
  if (n.includes('mobile')) return <Smartphone size={24} />;
  if (n.includes('trí tuệ nhân tạo') || n.includes('ai')) return <Brain size={24} />;
  if (n.includes('an toàn thông tin') || n.includes('bảo mật')) return <ShieldCheck size={24} />;
  if (n.includes('thiết kế') || n.includes('ui/ux')) return <Palette size={24} />;
  if (n.includes('kiểm thử') || n.includes('tester')) return <Bug size={24} />;
  if (n.includes('dữ liệu') || n.includes('database')) return <Database size={24} />;
  if (n.includes('cloud') || n.includes('điện toán')) return <Cloud size={24} />;
  if (n.includes('phần cứng') || n.includes('iot')) return <Cpu size={24} />;
  if (n.includes('backend')) return <Terminal size={24} />;
  if (n.includes('lập trình')) return <Code2 size={24} />;
  return <BarChart2 size={24} />;
};

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
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-50/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
                     <div key={idx} className="bg-white/80 backdrop-blur-sm border border-gray-100/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(192,9,9,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 via-red-50/0 to-red-50/0 group-hover:from-red-50/50 transition-all duration-500"></div>
                        { (trend.hot || trend.Hot) && (
                          <motion.div 
                           animate={{ 
                             backgroundColor: ['#c00909', '#e11d48', '#c00909'],
                             scale: [1, 1.05, 1]
                           }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="absolute top-0 right-0 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl flex items-center gap-1.5 shadow-lg z-10 uppercase tracking-wider"
                          >
                            <Zap size={10} fill="currentColor" className="animate-pulse" />
                            HOT
                          </motion.div>
                        )}
                        <div className="flex justify-between items-start mb-6">
                           <motion.div 
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors text-gray-400 group-hover:text-ptit-red"
                           >
                              {getCategoryIcon(trend.name || trend.Name || trend.categoryName || '')}
                           </motion.div>
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
