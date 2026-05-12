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
      <section className="py-20 bg-transparent border-t border-gray-100/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 font-bold mb-12 uppercase tracking-[0.3em] text-[10px]">Đối tác tuyển dụng chiến lược</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
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
