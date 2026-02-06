import React from 'react';
import { Award, Users, Globe, BookOpen } from 'lucide-react';

const WhyPtit = () => {
    const stats = [
        { icon: <Users size={32} />, count: "2000+", label: "Doanh nghiệp liên kết" },
        { icon: <BookOpen size={32} />, count: "15.000+", label: "Sinh viên đang theo học" },
        { icon: <Award size={32} />, count: "98%", label: "Sinh viên có việc làm sau tốt nghiệp" },
        { icon: <Globe size={32} />, count: "50+", label: "Hợp tác quốc tế" }
    ];

    return (
        <section className="py-20 bg-white">
             <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn PTIT Jobs?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Cầu nối vững chắc giữa Nhà trường - Doanh nghiệp - Sinh viên, mang lại giá trị bền vững cho cộng đồng công nghệ.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((item, index) => (
                        <div key={index} 
                             className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group animate-fade-in-up" 
                             style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-ptit-red mb-4 group-hover:scale-110 transition-transform animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                                {item.icon}
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{item.count}</h3>
                            <p className="text-gray-600 font-medium">{item.label}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
};

export default WhyPtit;
