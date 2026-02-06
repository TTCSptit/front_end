import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

const MarketTrend = () => {
  const trends = [
    { name: "Lập trình Web", jobs: 1240, growth: "+15%" },
    { name: "Data Analyst", jobs: 850, growth: "+22%" },
    { name: "Digital Marketing", jobs: 1100, growth: "+8%" },
    { name: "Kế toán tổng hợp", jobs: 600, growth: "+5%" },
    { name: "Quản trị mạng", jobs: 450, growth: "+10%" },
    { name: "Tester / QA / QC", jobs: 900, growth: "+12%" },
  ];

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
                 <a href="#" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-ptit-red transition-all shadow-lg hover:shadow-red-200">
                    Xem báo cáo chi tiết
                 </a>
             </div>

             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                 {trends.map((trend, idx) => (
                     <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-xl hover:shadow-lg hover:border-red-100 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                           <BarChart2 className="text-gray-400 group-hover:text-ptit-red transition-colors" />
                           <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{trend.growth}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-ptit-red transition-colors">{trend.name}</h3>
                        <p className="text-sm text-gray-500">{trend.jobs} việc làm</p>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrend;
