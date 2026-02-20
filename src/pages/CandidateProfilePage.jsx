import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Plus, Trash2, Save, Camera, 
  ArrowLeft, Github, Linkedin, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CandidateProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Văn A',
    headline: 'Senior Full Stack Developer',
    email: 'nguyenvana@example.com',
    phone: '0987 654 321',
    address: 'Quận Cầu Giấy, Hà Nội',
    summary: 'Tôi là một lập trình viên Full Stack với hơn 5 năm kinh nghiệm trong việc xây dựng và phát triển các ứng dụng web quy mô lớn. Đam mê học hỏi công nghệ mới và tối ưu hóa trải nghiệm người dùng.',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    experience: [
      {
        id: 1,
        company: 'Công ty Công nghệ ABC',
        position: 'Senior Developer',
        period: '2021 - Hiện tại',
        description: 'Phát triển các tính năng cốt lõi cho nền tảng thương mại điện tử.'
      },
      {
        id: 2,
        company: 'Startup XYZ',
        position: 'Full Stack Developer',
        period: '2018 - 2021',
        description: 'Xây dựng ứng dụng quản lý tài chính từ con số 0.'
      }
    ],
    education: [
      {
        id: 1,
        school: 'Học viện Công nghệ Bưu chính Viễn thông',
        degree: 'Kỹ sư Công nghệ thông tin',
        period: '2014 - 2018'
      }
    ]
  });

  // Load from localStorage if exists
  useEffect(() => {
    const savedProfile = localStorage.getItem('candidateProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('candidateProfile', JSON.stringify(profile));
    setIsEditing(false);
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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 text-gray-600 hover:text-ptit-red transition">
            <ArrowLeft size={20} />
            Quay lại trang chủ
          </Link>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition shadow-lg ${
              isEditing 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-ptit-red text-white hover:bg-ptit-darkred'
            }`}
          >
            {isEditing ? <Save size={20} /> : <User size={20} />}
            {isEditing ? 'Lưu hồ sơ' : 'Chỉnh sửa hồ sơ'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-red-50 border-4 border-white shadow-xl flex items-center justify-center text-ptit-red text-4xl font-bold mx-auto">
                  {profile.fullName.charAt(0)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-ptit-red text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg hover:bg-ptit-darkred transition">
                    <Camera size={18} />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <input 
                    className="w-full p-2 border border-gray-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-ptit-red"
                    value={profile.fullName}
                    onChange={e => setProfile({...profile, fullName: e.target.value})}
                    placeholder="Họ và tên"
                  />
                  <input 
                    className="w-full p-2 border border-gray-200 rounded-lg text-center text-sm text-gray-600 outline-none focus:ring-2 focus:ring-ptit-red"
                    value={profile.headline}
                    onChange={e => setProfile({...profile, headline: e.target.value})}
                    placeholder="Chức danh"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                  <p className="text-ptit-red font-medium">{profile.headline}</p>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-gray-400" />
                  {isEditing ? (
                    <input 
                      className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red"
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                    />
                  ) : (
                    <span className="text-sm">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-gray-400" />
                  {isEditing ? (
                    <input 
                      className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red"
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : (
                    <span className="text-sm">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-gray-400" />
                  {isEditing ? (
                    <input 
                      className="flex-1 text-sm outline-none border-b border-gray-200 focus:border-ptit-red"
                      value={profile.address}
                      onChange={e => setProfile({...profile, address: e.target.value})}
                    />
                  ) : (
                    <span className="text-sm">{profile.address}</span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Github size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer transition" />
                <Linkedin size={20} className="text-gray-400 hover:text-blue-600 cursor-pointer transition" />
                <Globe size={20} className="text-gray-400 hover:text-ptit-red cursor-pointer transition" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>Kỹ năng</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-2">
                    {skill}
                    {isEditing && (
                      <button onClick={() => deleteSkill(skill)}>
                        <Trash2 size={12} className="text-red-500 hover:text-red-700" />
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <button 
                    onClick={addSkill}
                    className="px-3 py-1 border border-dashed border-gray-300 text-gray-400 text-sm rounded-full hover:border-ptit-red hover:text-ptit-red transition flex items-center gap-1"
                  >
                    <Plus size={14} /> Thêm
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu bản thân</h3>
              {isEditing ? (
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ptit-red resize-none"
                  rows={4}
                  value={profile.summary}
                  onChange={e => setProfile({...profile, summary: e.target.value})}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed italic border-l-4 border-ptit-red pl-4">
                  "{profile.summary}"
                </p>
              )}
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase size={22} className="text-ptit-red" />
                  Kinh nghiệm làm việc
                </h3>
                {isEditing && (
                  <button 
                    onClick={addExperience}
                    className="text-ptit-red hover:text-ptit-darkred font-medium flex items-center gap-1 uppercase text-xs tracking-wider border border-ptit-red px-3 py-1 rounded-lg hover:bg-red-50 transition"
                  >
                    <Plus size={16} /> Thêm mới
                  </button>
                )}
              </div>
              <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-6.5 h-6.5 bg-white border-4 border-ptit-red rounded-full z-10"></div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2 bg-gray-50 p-4 rounded-xl relative shadow-inner border border-gray-100">
                          <button 
                            onClick={() => deleteExperience(exp.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                          <input 
                            className="w-full font-bold bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="Chức danh"
                          />
                          <input 
                            className="w-full text-ptit-red font-medium bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Tên công ty"
                          />
                          <input 
                            className="w-full text-sm text-gray-500 bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={exp.period}
                            onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                            placeholder="MM/YYYY - Present"
                          />
                          <textarea 
                            className="w-full text-gray-600 text-sm bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={2}
                            placeholder="Mô tả công việc"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{exp.position}</h4>
                          <p className="text-ptit-red font-semibold">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap size={22} className="text-ptit-red" />
                  Học vấn
                </h3>
                {isEditing && (
                  <button 
                    onClick={addEducation}
                    className="text-ptit-red hover:text-ptit-darkred font-medium flex items-center gap-1 uppercase text-xs tracking-wider border border-ptit-red px-3 py-1 rounded-lg hover:bg-red-50 transition"
                  >
                    <Plus size={16} /> Thêm mới
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                      <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2 bg-gray-50 p-4 rounded-xl relative shadow-inner border border-gray-100">
                          <button 
                            onClick={() => deleteEducation(edu.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                          <input 
                            className="w-full font-bold bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="Tên trường"
                          />
                          <input 
                            className="w-full text-gray-700 bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bằng cấp"
                          />
                          <input 
                            className="w-full text-sm text-gray-500 bg-white border border-gray-200 p-2 rounded outline-none focus:ring-2 focus:ring-ptit-red"
                            value={edu.period}
                            onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                            placeholder="YYYY - YYYY"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-gray-900">{edu.school}</h4>
                          <p className="text-gray-600 font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-500">{edu.period}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
