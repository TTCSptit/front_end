import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Building2, MessageSquare } from 'lucide-react';

const JobCard = ({ job, onChatOpen, linkType = 'company' }) => {
  const linkTo = linkType === 'job' ? `/job/${job.id}` : `/company/${job.id}`;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col h-full group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center p-2 shrink-0 border border-gray-100 group-hover:border-red-100 transition-colors">
          <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-ptit-red transition-colors line-clamp-2 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
            <Building2 size={14} />
            {job.company}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="bg-gray-50 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <DollarSign size={12} className="text-green-600" />
            {job.salary}
          </span>
          <span className="bg-gray-50 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <MapPin size={12} className="text-blue-500" />
            {job.location}
          </span>
          <span className="bg-gray-50 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Clock size={12} className="text-orange-500" />
            {job.deadline}
          </span>
        </div>
        
        <div className="flex gap-2 mt-4">
            <Link to={linkTo} className="flex-1 py-2 border border-red-100 text-ptit-red rounded-lg font-medium hover:bg-ptit-red hover:text-white transition-all text-sm flex items-center justify-center">
            Ứng tuyển ngay
            </Link>
            <button 
                onClick={() => onChatOpen && onChatOpen(job.title)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm flex items-center justify-center"
                title="Chat về job này"
            >
                <MessageSquare size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
