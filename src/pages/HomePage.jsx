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
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 md:h-9 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-7 md:h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Viettel.png" alt="Viettel" className="h-9 md:h-11 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg" alt="FPT Software" className="h-8 md:h-10 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VNPT.png" alt="VNPT" className="h-10 md:h-12 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" alt="Samsung" className="h-5 md:h-6 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
