import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Plus, Trash2, Save, Camera, 
  ArrowLeft, Github, Linkedin, Globe, FileText, Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getMyProfile, updateProfile, uploadCv, getMyCvUrl, uploadAvatar, getMediaUrl } from '../services/api';

const CandidateProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [profile, setProfile] = useState({
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    cvUrl: '',
    hasCv: false,
    avatarUrl: ''
  });

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      // Map backend DTO to frontend state
      setProfile({
        fullName: data.fullName || '',
        headline: data.headline || '', // Backend might not have this yet, or it's part of AboutMe
        email: data.email || '',
        phone: data.phone || '',
        address: data.location || '',
        summary: data.aboutMe || '',
        skills: (data.skills || []).map(s => typeof s === 'string' ? s : s.name),
        experience: (data.workExperiences || []).map(exp => ({
          id: exp.id,
          company: exp.companyName,
          position: exp.position,
          period: `${exp.startDate ? exp.startDate.substring(0, 7) : ''} - ${exp.endDate ? exp.endDate.substring(0, 7) : 'present'}`,
          description: exp.description
        })),
        education: (data.educations || []).map(edu => ({
          id: edu.id,
          school: edu.schoolName,
          degree: edu.degree,
          period: `${edu.startDate ? edu.startDate.substring(0, 4) : ''} - ${edu.endDate ? edu.endDate.substring(0, 4) : ''}`
        })),
        cvUrl: data.cvurl || '',
        hasCv: !!data.cvurl,
        avatarUrl: data.avatarUrl || ''
      });
    } catch (err) {
      setError(err.message || 'Không thể tải thông tin hồ sơ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      // Map frontend state back to backend DTO
      const dto = {
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        location: profile.address,
        aboutMe: profile.summary,
        skills: profile.skills.map(s => (typeof s === 'string' ? { name: s } : s)),
        educations: profile.education.map(edu => {
          const years = edu.period.split('-').map(y => y.trim());
          return {
            id: typeof edu.id === 'number' && edu.id > 1000000000 ? 0 : edu.id, // Reset temp IDs
            schoolName: edu.school,
            degree: edu.degree,
            startDate: years[0] ? `${years[0]}-01-01` : '2000-01-01',
            endDate: years[1] && years[1].toLowerCase() !== 'present' ? `${years[1]}-01-01` : null
          };
        }),
        workExperiences: profile.experience.map(exp => {
          const periods = exp.period.split('-').map(p => p.trim());
          return {
            id: typeof exp.id === 'number' && exp.id > 1000000000 ? 0 : exp.id, // Reset temp IDs
            companyName: exp.company,
            position: exp.position,
            description: exp.description,
            startDate: periods[0] ? (periods[0].includes('/') ? `${periods[0].split('/')[1]}-${periods[0].split('/')[0]}-01` : `${periods[0]}-01-01`) : '2000-01-01',
            endDate: periods[1] && periods[1].toLowerCase() !== 'present' ? (periods[1].includes('/') ? `${periods[1].split('/')[1]}-${periods[1].split('/')[0]}-01` : `${periods[1]}-01-01`) : null
          };
        })
      };

      await updateProfile(dto);
      setIsEditing(false);
      alert('Đã lưu hồ sơ thành công!');
      fetchProfile(); // Reload to get IDs and canonical data
    } catch (err) {
      alert(err.message || 'Lưu hồ sơ thất bại.');
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingCv(true);
    try {
      await uploadCv(file);
      alert('Tải CV lên thành công!');
      fetchProfile();
    } catch (err) {
      alert(err.message || 'Tải CV lên thất bại.');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingAvatar(true);
    try {
      const newUrl = await uploadAvatar(file);
      setProfile(prev => ({ ...prev, avatarUrl: newUrl }));
      alert('Tải ảnh đại diện thành công!');
    } catch (err) {
      alert(err.message || 'Tải ảnh đại diện thất bại.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const addSkill = () => {
    const newSkill = prompt('Nhập kỹ năng mới:');
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
    }
  };

  const deleteSkill = (skillToDelete) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToDelete) });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: 'Tên công ty',
      position: 'Chức danh',
      period: 'MM/YYYY - present',
      description: 'Mô tả công việc...'
    };
    setProfile({ ...profile, experience: [newExp, ...profile.experience] });
  };

  const updateExperience = (id, field, value) => {
    setProfile({
      ...profile,
      experience: profile.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const deleteExperience = (id) => {
    setProfile({ ...profile, experience: profile.experience.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: 'Tên trường',
      degree: 'Bằng cấp',
      period: 'YYYY - YYYY'
    };
    setProfile({ ...profile, education: [newEdu, ...profile.education] });
  };

  const updateEducation = (id, field, value) => {
    setProfile({
      ...profile,
      education: profile.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const deleteEducation = (id) => {
    setProfile({ ...profile, education: profile.education.filter(edu => edu.id !== id) });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải hồ sơ...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-orange-50/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <Link to="/home" className="flex items-center gap-2 text-slate-500 hover:text-ptit-red transition-all font-medium group mb-2">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Quay lại trang chủ
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hồ sơ <span className="text-ptit-red">cá nhân</span></h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black transition-all shadow-xl active:scale-95 ${
                isEditing 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100' 
                  : 'bg-ptit-red text-white hover:bg-ptit-darkred shadow-red-100'
              }`}
            >
              {isEditing ? <Save size={20} /> : <User size={20} />}
              {isEditing ? 'LƯU THAY ĐỔI' : 'CHỈNH SỬA HỒ SƠ'}
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50 overflow-hidden"
            >
              {/* Profile Header Background */}
              <div className="h-28 bg-gradient-to-r from-ptit-red to-red-600 relative">
                <div className="absolute inset-0 opacity-20 premium-bg-dots"></div>
              </div>
              
              <div className="px-6 pb-8 -mt-14 text-center relative z-10">
                <div className="relative inline-block mb-4">
                  <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-2xl relative overflow-hidden">
                    <div className="w-full h-full rounded-full bg-red-50 flex items-center justify-center text-ptit-red text-4xl font-black overflow-hidden">
                      {profile.avatarUrl ? (
                        <img src={getMediaUrl(profile.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        profile.fullName.charAt(0)
                      )}
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-1 right-1 w-9 h-9 bg-ptit-red text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg hover:bg-ptit-darkred transition-all cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                      <Camera size={16} />
                    </label>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold outline-none focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red transition-all"
                      value={profile.fullName}
                      onChange={e => setProfile({...profile, fullName: e.target.value})}
                      placeholder="Họ và tên"
                    />
                    <input 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm text-gray-500 outline-none focus:ring-2 focus:ring-ptit-red/20 focus:border-ptit-red transition-all"
                      value={profile.headline}
                      onChange={e => setProfile({...profile, headline: e.target.value})}
                      placeholder="Chức danh / Tiêu đề"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{profile.fullName}</h2>
                    <p className="text-ptit-red font-bold text-sm uppercase tracking-wider mt-1">{profile.headline || 'Sinh viên PTIT'}</p>
                  </>
                )}

                <div className="mt-8 pt-6 border-t border-gray-50 space-y-4 text-left">
                  <div className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-ptit-red flex items-center justify-center shrink-0 group-hover:bg-ptit-red group-hover:text-white transition-all">
                      <Mail size={16} />
                    </div>
                    {isEditing ? (
                      <input 
                        className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red py-1 bg-transparent"
                        value={profile.email}
                        onChange={e => setProfile({...profile, email: e.target.value})}
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-600">{profile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Phone size={16} />
                    </div>
                    {isEditing ? (
                      <input 
                        className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red py-1 bg-transparent"
                        value={profile.phone}
                        onChange={e => setProfile({...profile, phone: e.target.value})}
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-600">{profile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <MapPin size={16} />
                    </div>
                    {isEditing ? (
                      <input 
                        className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red py-1 bg-transparent"
                        value={profile.address}
                        onChange={e => setProfile({...profile, address: e.target.value})}
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-600">{profile.address}</span>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <Github size={20} className="text-slate-300 hover:text-slate-900 cursor-pointer transition-all hover:scale-125" />
                  <Linkedin size={20} className="text-slate-300 hover:text-blue-600 cursor-pointer transition-all hover:scale-125" />
                  <Globe size={20} className="text-slate-300 hover:text-ptit-red cursor-pointer transition-all hover:scale-125" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50"
            >
              <h3 className="font-black text-slate-900 mb-6 flex items-center justify-between text-lg tracking-tight">
                <span>Kỹ năng chuyên môn</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl flex items-center gap-2 border border-slate-100 hover:bg-white hover:border-ptit-red hover:text-ptit-red transition-all cursor-default">
                    {skill}
                    {isEditing && (
                      <button onClick={() => deleteSkill(skill)}>
                        <Trash2 size={12} className="text-red-400 hover:text-red-600" />
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <button 
                    onClick={addSkill}
                    className="px-4 py-2 border border-dashed border-slate-300 text-slate-400 text-sm font-bold rounded-xl hover:border-ptit-red hover:text-ptit-red hover:bg-red-50/50 transition-all flex items-center gap-2"
                  >
                    <Plus size={14} /> Thêm mới
                  </button>
                )}
              </div>
            </motion.div>

            {/* CV Management */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-ptit-red" />
                Hồ sơ CV
              </h3>
              {profile.hasCv ? (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-ptit-red" />
                      <span className="text-sm font-bold text-gray-700">CV_Cua_Toi.pdf</span>
                    </div>
                    <a 
                      href={getMyCvUrl()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-ptit-red hover:underline"
                    >
                      Xem CV
                    </a>
                  </div>
                  <label className="block w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-center text-xs text-gray-400 hover:border-ptit-red hover:text-ptit-red cursor-pointer transition">
                    <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} disabled={uploadingCv} />
                    {uploadingCv ? 'Đang tải lên...' : 'Thay đổi CV khác'}
                  </label>
                </div>
              ) : (
                <label className="block w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 hover:border-ptit-red hover:text-ptit-red cursor-pointer transition">
                  <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} disabled={uploadingCv} />
                  <Upload className="mx-auto mb-2" />
                  <span className="text-sm font-medium">{uploadingCv ? 'Đang tải lên...' : 'Tải lên CV (PDF)'}</span>
                </label>
              )}
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/30 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ptit-red rounded-full"></div>
                Giới thiệu bản thân
              </h3>
              {isEditing ? (
                <textarea 
                  className="w-full p-6 bg-gray-50 border border-gray-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-ptit-red/5 focus:border-ptit-red transition-all resize-none font-medium text-slate-600"
                  rows={5}
                  value={profile.summary}
                  onChange={e => setProfile({...profile, summary: e.target.value})}
                  placeholder="Viết một đoạn ngắn giới thiệu về bản thân, mục tiêu nghề nghiệp của bạn..."
                />
              ) : (
                <p className="text-slate-600 text-lg leading-relaxed font-medium italic relative pl-8">
                  <span className="absolute left-0 top-0 text-6xl text-ptit-red/10 font-serif leading-none">“</span>
                  {profile.summary || 'Chưa có thông tin giới thiệu. Hãy nhấn "Chỉnh sửa hồ sơ" để cập nhật bản thân nhé!'}
                </p>
              )}
            </motion.div>

            {/* Work Experience */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                  <div className="w-1.5 h-8 bg-ptit-red rounded-full"></div>
                  Kinh nghiệm làm việc
                </h3>
                {isEditing && (
                  <button 
                    onClick={addExperience}
                    className="bg-red-50 text-ptit-red hover:bg-ptit-red hover:text-white font-bold flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                  >
                    <Plus size={18} /> THÊM MỚI
                  </button>
                )}
              </div>
              <div className="space-y-10 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {profile.experience.map((exp, idx) => (
                  <motion.div 
                    key={exp.id} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12 group"
                  >
                    <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-slate-200 rounded-full z-10 flex items-center justify-center group-hover:border-ptit-red transition-all duration-500">
                      <div className="w-2.5 h-2.5 bg-slate-200 rounded-full group-hover:bg-ptit-red transition-all duration-500"></div>
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] relative shadow-inner border border-slate-100">
                          <button 
                            onClick={() => deleteExperience(exp.id)}
                            className="absolute top-4 right-4 w-8 h-8 bg-white text-red-400 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm border border-slate-100 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chức danh</label>
                              <input 
                                className="w-full font-bold bg-white border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-4 focus:ring-ptit-red/5 focus:border-ptit-red transition-all"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                placeholder="Ví dụ: Lập trình viên Web"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Công ty</label>
                              <input 
                                className="w-full text-ptit-red font-bold bg-white border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-4 focus:ring-ptit-red/5 focus:border-ptit-red transition-all"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="Ví dụ: FPT Software"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời gian</label>
                            <input 
                              className="w-full text-sm font-medium text-slate-500 bg-white border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-4 focus:ring-ptit-red/5 focus:border-ptit-red transition-all"
                              value={exp.period}
                              onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                              placeholder="01/2022 - Hiện tại"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả</label>
                            <textarea 
                              className="w-full text-slate-600 text-sm font-medium bg-white border border-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-4 focus:ring-ptit-red/5 focus:border-ptit-red transition-all resize-none"
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              rows={3}
                              placeholder="Mô tả tóm tắt công việc và thành tựu..."
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white p-6 rounded-[2rem] border border-transparent hover:border-slate-100 hover:bg-slate-50/30 transition-all duration-500">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-black text-slate-900 text-xl tracking-tight">{exp.position}</h4>
                             <span className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">{exp.period}</span>
                          </div>
                          <p className="text-ptit-red font-bold mb-4">{exp.company}</p>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium">{exp.description || 'Chưa có mô tả chi tiết cho kinh nghiệm này.'}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                  <div className="w-1.5 h-8 bg-ptit-red rounded-full"></div>
                  Học vấn
                </h3>
                {isEditing && (
                  <button 
                    onClick={addEducation}
                    className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white font-bold flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                  >
                    <Plus size={18} /> THÊM MỚI
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.education.map((edu, idx) => (
                  <motion.div 
                    key={edu.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-5 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 shrink-0 shadow-sm group-hover:text-ptit-red transition-colors">
                      <GraduationCap size={28} />
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3 relative">
                          <button 
                            onClick={() => deleteEducation(edu.id)}
                            className="absolute -top-1 -right-1 w-7 h-7 bg-white text-red-400 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm border border-slate-100 transition-all z-10"
                          >
                            <Trash2 size={14} />
                          </button>
                          <input 
                            className="w-full font-bold bg-white border border-slate-200 p-2 rounded-xl text-sm outline-none focus:border-ptit-red transition-all"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="Trường học"
                          />
                          <input 
                            className="w-full text-slate-600 bg-white border border-slate-200 p-2 rounded-xl text-sm outline-none focus:border-ptit-red transition-all"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bằng cấp"
                          />
                          <input 
                            className="w-full text-xs text-slate-400 bg-white border border-slate-200 p-2 rounded-xl outline-none focus:border-ptit-red transition-all"
                            value={edu.period}
                            onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                            placeholder="2018 - 2022"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-black text-slate-900 tracking-tight">{edu.school}</h4>
                          <p className="text-slate-500 font-bold text-sm">{edu.degree}</p>
                          <span className="inline-block mt-2 text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{edu.period}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
