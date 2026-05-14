import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Building2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMediaUrl } from '../services/api';

const JobCard = ({ job, onChatOpen, linkType = 'job' }) => {
  const linkTo = linkType === 'job' ? `/job/${job.id}` : `/company/${job.companyId}`;
  
  // Expiration check logic
  const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;

  return (
    <motion.div 
      whileHover={isExpired ? {} : { y: -8, transition: { duration: 0.2 } }}
      className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all p-6 border border-gray-100 flex flex-col h-full group border-glow relative overflow-hidden ${isExpired ? 'opacity-70 grayscale-[0.5]' : ''}`}
    >
      {isExpired && (
        <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 shadow-sm uppercase tracking-wider">
          Hết hạn
        </div>
      )}

      <div className="flex items-start gap-4 mb-5">
        <div className={`w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center p-2 shrink-0 border border-gray-100 ${!isExpired && 'group-hover:border-red-100 group-hover:bg-red-50/30'} transition-all duration-300 shadow-sm`}>
          <img
            src={getMediaUrl(job.companyLogoUrl) || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='8' fill='%23f3f4f6'/%3E%3Crect x='18' y='28' width='28' height='20' rx='2' fill='%23d1d5db'/%3E%3Crect x='24' y='20' width='16' height='10' rx='2' fill='%239ca3af'/%3E%3Crect x='26' y='36' width='5' height='12' fill='%23f3f4f6'/%3E%3Crect x='33' y='36' width='5' height='12' fill='%23f3f4f6'/%3E%3C/svg%3E"}
            alt={job.companyName}
            className="max-w-full max-h-full object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='8' fill='%23f3f4f6'/%3E%3Crect x='18' y='28' width='28' height='20' rx='2' fill='%23d1d5db'/%3E%3Crect x='24' y='20' width='16' height='10' rx='2' fill='%239ca3af'/%3E%3Crect x='26' y='36' width='5' height='12' fill='%23f3f4f6'/%3E%3Crect x='33' y='36' width='5' height='12' fill='%23f3f4f6'/%3E%3C/svg%3E"; }}
          />
        </div>
        <div>
          <h3 className={`font-bold text-slate-900 ${!isExpired && 'group-hover:text-ptit-red'} transition-colors line-clamp-2 mb-1 font-heading text-lg md:text-[1.1rem] leading-snug`}>
            {job.title}
          </h3>
          <p className="text-gray-500 text-[13px] font-medium flex items-center gap-1.5">
            <Building2 size={13} className="text-gray-400" />
            {job.companyName}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="bg-emerald-50/60 text-emerald-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border border-emerald-100/50">
            <DollarSign size={12} className="text-emerald-600" />
            {job.salary || 'Thỏa thuận'}
          </span>
          <span className="bg-blue-50/60 text-blue-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border border-blue-100/50">
            <MapPin size={12} className="text-blue-600" />
            {job.location ? job.location.split(',')[0].trim() : 'Việt Nam'}
          </span>
          <span className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border ${isExpired ? 'bg-rose-50 text-rose-600 border-rose-100/50' : 'bg-orange-50/60 text-orange-700 border-orange-100/50'}`}>
            <Clock size={12} className={isExpired ? 'text-rose-600' : 'text-orange-600'} />
            {isExpired ? 'Hết hạn nộp' : (job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'Liên hệ')}
          </span>
        </div>
        
        <div className="flex gap-2 mt-5">
            {isExpired ? (
              <div className="flex-1 py-2.5 bg-gray-100 text-gray-400 rounded-xl font-bold text-xs flex items-center justify-center cursor-not-allowed">
                Đã hết hạn
              </div>
            ) : (
              <Link to={linkTo} className="flex-1 py-2.5 bg-ptit-red text-white rounded-xl font-bold hover:bg-ptit-darkred transition-all text-xs flex items-center justify-center shadow-md shadow-red-100 active:scale-95 border border-transparent">
                Ứng tuyển ngay
              </Link>
            )}
            <button 
                onClick={() => onChatOpen && onChatOpen(job.title)}
                className={`w-11 h-11 rounded-xl font-medium transition-all text-sm flex items-center justify-center shrink-0 ${isExpired ? 'bg-gray-50 text-gray-300' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-ptit-red active:scale-90 border border-transparent hover:border-red-100'}`}
                title="Chat về job này"
                disabled={isExpired}
            >
                <MessageSquare size={18} />
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
