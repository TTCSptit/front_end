import React from 'react';
import HeroSection from '../components/HeroSection';
import MarketTrend from '../components/MarketTrend';
import FeaturedJobs from '../components/FeaturedJobs';
import WhyPtit from '../components/WhyPTIT';

const HomePage = ({ onChatOpen }) => {
  return (
    <>
      <HeroSection />
      <MarketTrend />
      <FeaturedJobs onChatOpen={onChatOpen} />
      <WhyPtit />

      {/* Partners Section */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 font-medium mb-8 uppercase tracking-widest text-sm">Đối tác tuyển dụng hàng đầu</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders or simple SVGs for partners to avoid broken images */}
            <span className="text-2xl font-bold text-gray-400">Google</span>
            <span className="text-2xl font-bold text-gray-400">Microsoft</span>
            <span className="text-2xl font-bold text-gray-400">Viettel</span>
            <span className="text-2xl font-bold text-gray-400">FPT Software</span>
            <span className="text-2xl font-bold text-gray-400">VNPT</span>
             <span className="text-2xl font-bold text-gray-400">Samsung</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
