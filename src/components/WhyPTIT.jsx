import React from 'react';
import { Award, Users, Globe, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyPtit = () => {
    const stats = [
        { icon: <Users size={32} />, count: "2000+", label: "Doanh nghiệp liên kết" },
        { icon: <BookOpen size={32} />, count: "15.000+", label: "Sinh viên đang theo học" },
        { icon: <Award size={32} />, count: "98%", label: "Sinh viên có việc làm sau tốt nghiệp" },
        { icon: <Globe size={32} />, count: "50+", label: "Hợp tác quốc tế" }
    ];

    return (
        <section className="py-24 bg-transparent">
             <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight font-heading">Tại sao chọn PTIT Jobs?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">Cầu nối vững chắc giữa Nhà trường - Doanh nghiệp - Sinh viên, mang lại giá trị bền vững cho cộng đồng công nghệ.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Big Card 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-3 md:row-span-2 bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-20 -mt-20 group-hover:bg-red-100 transition-colors duration-500 opacity-50"></div>
                        <div className="w-20 h-20 rounded-2xl bg-ptit-red text-white flex items-center justify-center mb-8 shadow-lg shadow-red-200 relative z-10 group-hover:rotate-12 transition-transform">
                            <Award size={40} />
                        </div>
                        <h3 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter font-heading relative z-10">{stats[2].count}</h3>
                        <p className="text-xl text-gray-600 font-bold mb-4 font-heading relative z-10">{stats[2].label}</p>
                        <p className="text-gray-400 font-medium leading-relaxed max-w-sm relative z-10">Cam kết chất lượng đào tạo và hỗ trợ việc làm tối đa cho sinh viên sau khi ra trường.</p>
                    </motion.div>

                    {/* Small Card 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-3 bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 group flex items-center gap-8"
                    >
                        <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 font-heading">{stats[0].count}</h3>
                            <p className="text-gray-500 font-bold font-heading">{stats[0].label}</p>
                        </div>
                    </motion.div>

                    {/* Small Card 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-3 lg:col-span-1 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 font-heading">{stats[1].count.split(' ')[0]}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stats[1].label.split(' ')[0]}</p>
                    </motion.div>

                    {/* Small Card 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-3 lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 group flex items-center justify-between"
                    >
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 font-heading">{stats[3].count}</h3>
                            <p className="text-gray-500 font-bold font-heading">{stats[3].label}</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                            <Globe size={32} />
                        </div>
                    </motion.div>
                </div>
             </div>
        </section>
    );
};

export default WhyPtit;
