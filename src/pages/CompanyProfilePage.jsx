import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, Globe, Phone, Mail, 
  Camera, Save, Users, Calendar, Briefcase, Edit3
} from 'lucide-react';
import { getMyCompany, updateCompany } from '../services/api';

const CompanyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyData, setCompanyData] = useState({
    id: null,
    name: 'Công ty của bạn',
    industry: 'Công nghệ thông tin',
    size: '100-500 nhân viên',
    founded: '2015',
    website: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    logoUrl: '',
    benefits: []
  });

  const stats = [
    { label: 'Tin tuyển dụng', value: '12', icon: Briefcase },
    { label: 'Ứng viên', value: '156', icon: Users },
  ];

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getMyCompany();
        if (data) {
          setCompanyData({
            id: data.id,
            name: data.name || '',
            industry: data.industry || 'Công nghệ thông tin',
            size: data.size || '100-500 nhân viên',
            founded: data.founded || '2015',
            website: data.websiteUrl || '',
            email: data.email || '',
            phone: data.phoneNumber || '',
            address: data.location || '',
            description: data.description || '',
            logoUrl: data.logoUrl || '',
            benefits: data.benefits || []
          });
        }
      } catch (err) {
        setError(err.message || 'Không thể tải thông tin công ty.');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleSave = async () => {
    if (!companyData.id) return;
    try {
      await updateCompany(companyData.id, {
        name: companyData.name,
        location: companyData.address,
        websiteUrl: companyData.website,
        email: companyData.email,
        phoneNumber: companyData.phone,
        logoUrl: companyData.logoUrl,
        description: companyData.description
      });
      setIsEditing(false);
      alert('Cập nhật hồ sơ công ty thành công!');
    } catch (err) {
      alert(err.message || 'Cập nhật thất bại.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ptit-red transition mb-4"
          >
            <ArrowLeft size={20} />
            Quay lại Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ Công ty</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
                isEditing 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-ptit-red text-white hover:bg-red-700'
              }`}
            >
              {isEditing ? <Save size={20} /> : <Edit3 size={20} />}
              {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-red-600 to-red-400 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                    {companyData.logoUrl ? (
                      <img src={companyData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      (companyData.name || 'U').charAt(0)
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
                      <Camera size={18} />
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.name}
                      onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                      className="text-2xl font-bold text-gray-900 w-full border-b-2 border-ptit-red pb-1 outline-none bg-transparent"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{companyData.name}</h2>
                  )}
                  <p className="text-gray-500 mt-1">{companyData.industry}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users size={16} className="text-gray-400" />
                      {companyData.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-gray-400" />
                      Thành lập {companyData.founded}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu công ty</h3>
              {isEditing ? (
                <textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                  rows={5}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ptit-red resize-none"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{companyData.description}</p>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Phúc lợi nhân viên</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {Array.isArray(companyData.benefits) && companyData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      ✓
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Images */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hình ảnh văn phòng</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 relative overflow-hidden">
                    <Building2 size={32} />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                        <Camera size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Thống kê</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-ptit-red">
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-400 mt-1 shrink-0" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.address}
                      onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                      className="flex-1 text-sm border-b border-gray-200 pb-1 outline-none focus:border-ptit-red"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm">{companyData.address}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyData.website}
                      onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                      className="flex-1 text-sm border-b border-gray-200 pb-1 outline-none focus:border-ptit-red"
                    />
                  ) : (
                    <a href={companyData.website} className="text-ptit-red text-sm hover:underline" target="_blank" rel="noopener noreferrer">{companyData.website}</a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-600 text-sm">{companyData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-600 text-sm">{companyData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
