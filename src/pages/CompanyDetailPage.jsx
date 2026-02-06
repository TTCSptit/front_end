import React from 'react';
import { MapPin, Globe, Mail, Users, Calendar, Clock, DollarSign, Briefcase, ChevronRight, CheckCircle, Star } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const CompanyDetailPage = () => {
  const { id } = useParams();

  // Mock Data
  const company = {
    name: "Tập đoàn ABC Technology",
    logo: "https://ui-avatars.com/api/?name=ABC+Tech&background=0D8ABC&color=fff&size=128",
    banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    slogan: "Tiên phong công nghệ - Dẫn lối tương lai",
    description: "ABC Technology là công ty công nghệ hàng đầu Việt Nam, chuyên cung cấp các giải pháp phần mềm toàn diện cho doanh nghiệp. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến những sản phẩm chất lượng cao, giúp khách hàng tối ưu hóa quy trình vận hành và tăng trưởng doanh thu.\n\nChúng tôi luôn tìm kiếm những tài năng đam mê công nghệ, sáng tạo và mong muốn cống hiến để cùng nhau xây dựng những sản phẩm mang tầm quốc tế.",
    founded: "2010",
    size: "500-1000 nhân viên",
    industry: "Công nghệ thông tin",
    website: "https://abc-tech.com",
    email: "hr@abc-tech.com",
    address: "Tầng 12, Tòa nhà Innovation, Quận Cầu Giấy, Hà Nội",
    benefits: [
      "Mức lương cạnh tranh, thưởng dự án hấp dẫn",
      "Bảo hiểm sức khỏe toàn diện cho nhân viên và người thân",
      "Môi trường làm việc trẻ trung, năng động, chuẩn quốc tế",
      "Cơ hội onsite tại Nhật, Mỹ, Singapore",
      "Du lịch công ty hàng năm, team building hàng quý"
    ]
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer (React/Vue)",
      salary: "20 - 35 Triệu",
      location: "Hà Nội",
      deadline: "30/04/2026",
      tags: ["ReactJS", "VueJS", "JavaScript"]
    },
    {
      id: 2,
      title: "Backend Developer (NodeJS/Go)",
      salary: "25 - 40 Triệu",
      location: "Hà Nội",
      deadline: "15/05/2026",
      tags: ["NodeJS", "GoLang", "MySQL"]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      salary: "15 - 25 Triệu",
      location: "Hà Nội",
      deadline: "01/05/2026",
      tags: ["Figma", "Adobe XD", "UI/UX"]
    },
    {
      id: 4,
      title: "Business Analyst",
      salary: "18 - 30 Triệu",
      location: "Hà Nội",
      deadline: "20/04/2026",
      tags: ["Analysis", "Communication", "SQL"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={company.banner} 
          alt="Company Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 animate-fade-in-up">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-white p-2 shadow-md flex-shrink-0">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
            <p className="text-gray-500 font-medium mb-4">{company.slogan}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Users size={18} className="text-ptit-red" />
                <span>{company.size}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={18} className="text-ptit-red" />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={18} className="text-ptit-red" />
                <span>Thành lập: {company.founded}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-ptit-red hover:bg-ptit-darkred text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
              <Star size={20} />
              Theo dõi
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
              Chia sẻ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-ptit-red pl-4">Giới thiệu công ty</h2>
              <div className="prose text-gray-600 max-w-none text-justify whitespace-pre-line">
                {company.description}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-ptit-red pl-4">Tại sao bạn sẽ yêu thích làm việc tại đây?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                    <CheckCircle className="text-ptit-red flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-ptit-red pl-4">Tuyển dụng ({jobs.length})</h2>
                <Link to="/" className="text-ptit-red font-bold hover:underline flex items-center gap-1 text-sm">
                  Xem tất cả <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="animate-fade-in-up">
                     {/* We can reuse JobCard here but maybe tweak styles slightly or just map manually if structure differs. 
                         For consistency, let's use the layout from JobCard but adapted or just reuse components. 
                         Wait, the design in CompanyDetail was manual. I should probably replace it with JobCard for consistency 
                         OR just update the button here. 
                         Actually, in the previous turn I wrote manual JSX for jobs in CompanyDetailPage. Let's update THAT manually. 
                      */}
                     <div className="group border border-gray-200 rounded-xl p-5 hover:border-ptit-red hover:shadow-md transition-all bg-white relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-ptit-red transition-colors mb-1">
                              {job.title}
                            </h3>
                            {/* ... existing details ... */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1.5 text-green-600 font-medium">
                                <DollarSign size={16} />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={16} />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <Clock size={16} />
                                Hạn nộp: {job.deadline}
                              </div>
                            </div>
                             <div className="flex gap-2">
                              {job.tags.map((tag, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Link to={`/job/${job.id}`} className="bg-white text-ptit-red border-2 border-ptit-red font-bold py-2 px-6 rounded-lg hover:bg-ptit-red hover:text-white transition-all whitespace-nowrap inline-flex items-center justify-center">
                            Ứng tuyển ngay
                          </Link>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-lg text-gray-900 mb-4 pb-4 border-b border-gray-100">Thông tin liên hệ</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="bg-red-50 p-2 rounded-lg text-ptit-red">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Địa chỉ</span>
                    <p className="text-gray-900 font-medium text-sm leading-relaxed">{company.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                   <div className="bg-red-50 p-2 rounded-lg text-ptit-red">
                    <Globe size={20} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Website</span>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-ptit-red font-medium text-sm hover:underline block truncate max-w-[200px]">
                      {company.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                   <div className="bg-red-50 p-2 rounded-lg text-ptit-red">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Email</span>
                    <a href={`mailto:${company.email}`} className="text-gray-900 font-medium text-sm hover:text-ptit-red">
                      {company.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Xem bản đồ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
