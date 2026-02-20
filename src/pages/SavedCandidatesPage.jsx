import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Users, Mail, Phone, 
  MapPin, Briefcase, Trash2, MessageSquare, Download,
  Star
} from 'lucide-react';

const SavedCandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      role: 'Senior Frontend Developer',
      location: 'Hà Nội',
      experience: '4 năm',
      email: 'an.nv@example.com',
      phone: '0901 234 567',
      savedAt: '2026-02-05'
    },
    {
      id: 2,
      name: 'Lê Thị Bình',
      role: 'UI/UX Designer',
      location: 'TP. HCM',
      experience: '2 năm',
      email: 'binh.lt@example.com',
      phone: '0912 345 678',
      savedAt: '2026-02-01'
    }
  ]);

  const removeCandidate = (id) => {
    if (window.confirm('Bạn có chắc muốn bỏ lưu ứng viên này?')) {
      setCandidates(candidates.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Ứng viên đã lưu</h1>
          <p className="text-gray-600 mt-1">Quản lý các ứng viên tiềm năng bạn đã bookmark</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Tìm kiếm ứng viên đã lưu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ptit-red outline-none shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium">
            <Filter size={18} />
            Lọc kết quả
          </button>
        </div>

        {/* Candidates List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-100">
                    {candidate.name.charAt(0)}
                  </div>
                  <button 
                    onClick={() => removeCandidate(candidate.id)}
                    className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                    title="Bỏ lưu"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-ptit-red transition">{candidate.name}</h3>
                  <div className="text-ptit-red font-medium text-sm">{candidate.role}</div>
                </div>

                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-400" />
                    {candidate.experience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    {candidate.email}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                    <Download size={16} />
                    Tải CV
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition">
                    <MessageSquare size={16} />
                    Liên hệ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center">
              <Star size={64} className="mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có ứng viên nào được lưu</h3>
              <p className="text-gray-500">Hãy bookmark các ứng viên tiềm năng để xem lại sau.</p>
              <Link to="/recruiter/dashboard" className="inline-block mt-6 px-8 py-3 bg-ptit-red text-white font-bold rounded-xl hover:bg-red-700 transition">
                Khám phá ứng viên ngay
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCandidatesPage;
