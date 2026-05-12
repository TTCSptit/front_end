import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, Globe, Phone, Mail, 
  Camera, Save, Users, Calendar, Briefcase, Edit3, X, Check
} from 'lucide-react';
import { getMyCompany, updateCompany, uploadCompanyLogo, getMediaUrl } from '../services/api';

const CompanyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const logoInputRef = useRef(null);

  const [companyData, setCompanyData] = useState({
    id: null,
    name: '',
    industry: '',
    size: '',
    founded: '',
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
    fetchCompany();
  }, []);

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

  const handleSave = async () => {
    if (!companyData.id) return;
    try {
      setLoading(true);
      await updateCompany(companyData.id, {
        name: companyData.name,
        location: companyData.address,
        websiteUrl: companyData.website,
        email: companyData.email,
        phoneNumber: companyData.phone,
        logoUrl: companyData.logoUrl,
        description: companyData.description,
        industry: companyData.industry,
        size: companyData.size,
        founded: companyData.founded,
        benefits: companyData.benefits
      });
      setIsEditing(false);
      alert('Cập nhật hồ sơ công ty thành công!');
    } catch (err) {
      alert(err.message || 'Cập nhật thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh.');
      return;
    }

    try {
      setUploading(true);
      const newLogoUrl = await uploadCompanyLogo(companyData.id, file);
      setCompanyData(prev => ({ ...prev, logoUrl: newLogoUrl }));
      alert('Tải ảnh đại diện thành công!');
    } catch (err) {
      alert('Lỗi khi tải ảnh: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading && !companyData.id) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

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
            Quay lại Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hồ sơ Công ty</h1>
              <p className="text-gray-500 mt-1">Quản lý thông tin thương hiệu và giới thiệu công ty của bạn.</p>
            </div>
            <div className="flex gap-3">
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  <X size={20} />
                  Hủy
                </button>
              )}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition shadow-lg ${
                  isEditing 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-100' 
                    : 'bg-ptit-red text-white hover:bg-red-700 shadow-red-100'
                } disabled:opacity-50`}
              >
                {isEditing ? (loading ? 'Đang lưu...' : <><Save size={20} /> Lưu thay đổi</>) : <><Edit3 size={20} /> Chỉnh sửa</>}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 bg-ptit-red h-full"></div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Logo */}
                <div className="relative group">
                  <div className={`w-32 h-32 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-xl overflow-hidden border-4 border-white ${!companyData.logoUrl && 'bg-gradient-to-br from-ptit-red to-red-400'}`}>
                    {companyData.logoUrl ? (
                      <img src={getMediaUrl(companyData.logoUrl)} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      (companyData.name || 'U').charAt(0).toUpperCase()
                    )}
                    {uploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => logoInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-ptit-red hover:bg-gray-50 shadow-md transition-transform hover:scale-110 active:scale-95"
                    >
                      <Camera size={20} />
                    </button>
                  )}
                  <input 
                    type="file" 
                    ref={logoInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tên công ty</label>
                            <input
                            type="text"
                            value={companyData.name}
                            onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                            className="text-2xl font-bold text-gray-900 w-full border-b-2 border-gray-100 focus:border-ptit-red pb-1 outline-none bg-transparent transition-colors"
                            placeholder="Tên công ty của bạn..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ngành nghề</label>
                                <input
                                    type="text"
                                    value={companyData.industry}
                                    onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                                    className="text-sm font-medium text-gray-600 w-full border-b border-gray-100 focus:border-ptit-red pb-1 outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quy mô</label>
                                <select
                                    value={companyData.size}
                                    onChange={(e) => setCompanyData({...companyData, size: e.target.value})}
                                    className="text-sm font-medium text-gray-600 w-full border-b border-gray-100 focus:border-ptit-red pb-1 outline-none bg-transparent"
                                >
                                    <option>1-10 nhân viên</option>
                                    <option>11-50 nhân viên</option>
                                    <option>51-100 nhân viên</option>
                                    <option>101-500 nhân viên</option>
                                    <option>501-1000 nhân viên</option>
                                    <option>1000+ nhân viên</option>
                                </select>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <h2 className="text-3xl font-black text-gray-900">{companyData.name}</h2>
                            {companyData.id && <div className="bg-blue-50 text-blue-600 p-1 rounded-full" title="Đã xác thực"><Check size={16} strokeWidth={3} /></div>}
                        </div>
                        <p className="text-ptit-red font-bold mt-1">{companyData.industry}</p>
                    </>
                  )}
                  
                  {!isEditing && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Users size={18} className="text-gray-400" />
                        <span className="font-medium">{companyData.size}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="font-medium">Thành lập {companyData.founded}</span>
                        </span>
                    </div>
                  )}
                  {isEditing && (
                    <div className="mt-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Năm thành lập</label>
                        <input
                            type="text"
                            value={companyData.founded}
                            onChange={(e) => setCompanyData({...companyData, founded: e.target.value})}
                            className="text-sm font-medium text-gray-600 w-full border-b border-gray-100 focus:border-ptit-red pb-1 outline-none bg-transparent"
                            placeholder="Ví dụ: 2015"
                        />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                 <Edit3 size={20} className="text-ptit-red" />
                 <h3 className="text-xl font-bold text-gray-900">Giới thiệu công ty</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                  rows={8}
                  placeholder="Vi kể về lịch sử, sứ mệnh và văn hóa công ty bạn..."
                  className="w-full p-5 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red transition-all resize-none bg-gray-50/30"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {companyData.description || 'Chưa có mô tả giới thiệu về công ty.'}
                </p>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Phúc lợi nhân viên</h3>
              
              {isEditing && (
                <div className="mb-6 flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Nhập phúc lợi mới (vd: Bảo hiểm, Du lịch...)"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-ptit-red"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newBenefit.trim()) {
                          setCompanyData(prev => ({
                            ...prev,
                            benefits: [...prev.benefits, newBenefit.trim()]
                          }));
                          setNewBenefit('');
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (newBenefit.trim()) {
                        setCompanyData(prev => ({
                          ...prev,
                          benefits: [...prev.benefits, newBenefit.trim()]
                        }));
                        setNewBenefit('');
                      }
                    }}
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition"
                  >
                    Thêm
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {(Array.isArray(companyData.benefits) && companyData.benefits.length > 0) ? companyData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-2xl group hover:bg-ptit-red hover:border-ptit-red transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-ptit-red shadow-sm group-hover:scale-110 transition-transform">
                        <Check size={20} strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-white transition-colors">{benefit}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          setCompanyData(prev => ({
                            ...prev,
                            benefits: prev.benefits.filter((_, i) => i !== index)
                          }));
                        }}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                )) : (
                    <div className="col-span-2 text-center py-10 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="flex flex-col items-center gap-2">
                          <Users size={32} className="text-gray-200" />
                          <span>Chưa cập nhật danh sách phúc lợi</span>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Thông tin liên lạc</h3>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Địa chỉ trụ sở
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.address}
                      onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                      className="w-full text-sm font-medium border-b border-gray-200 py-1 outline-none focus:border-ptit-red bg-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-sm leading-snug">{companyData.address || 'Chưa cập nhật'}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} /> Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyData.website}
                      onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                      className="w-full text-sm font-medium border-b border-gray-200 py-1 outline-none focus:border-ptit-red bg-transparent"
                      placeholder="https://..."
                    />
                  ) : (
                    <a href={companyData.website} className="text-ptit-red font-bold text-sm hover:underline block truncate" target="_blank" rel="noopener noreferrer">
                        {companyData.website || 'Chưa cập nhật'}
                    </a>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={14} /> Email liên hệ
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                      className="w-full text-sm font-medium border-b border-gray-200 py-1 outline-none focus:border-ptit-red bg-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-sm">{companyData.email || 'Chưa cập nhật'}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                      className="w-full text-sm font-medium border-b border-gray-200 py-1 outline-none focus:border-ptit-red bg-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-sm">{companyData.phone || 'Chưa cập nhật'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Camera size={18} className="text-ptit-red" />
                    Mẹo hồ sơ
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Một hồ sơ đầy đủ với hình ảnh rõ nét và mô tả chi tiết giúp tăng 40% khả năng thu hút các ứng viên tiềm năng từ PTIT.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
