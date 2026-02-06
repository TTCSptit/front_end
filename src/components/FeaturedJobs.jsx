import React from 'react';
import JobCard from './JobCard';
import { ArrowRight } from 'lucide-react';

const FeaturedJobs = ({ onChatOpen }) => {
  // Dummy data
  const jobs = [
    {
       id: 1,
       title: "Lập trình viên Java (Java Developer)",
       company: "FPT Software",
       location: "Hà Nội",
       salary: "15 - 25 Triệu",
       deadline: "30/03/2026",
       logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/FPT_Software_Logo.png"
    },
    {
       id: 2,
       title: "Thực tập sinh Marketing / Content Creator",
       company: "Viettel Telecom",
       location: "Hà Nội",
       salary: "Thỏa thuận",
       deadline: "15/03/2026",
       logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Viettel_logo_2021.png"
    },
    {
       id: 3,
       title: "Kỹ sư hệ thống mạng (Network Engineer)",
       company: "VNPT Technology",
       location: "Hà Nội",
       salary: "12 - 20 Triệu",
       deadline: "20/03/2026",
       logo: "https://vnpt-technology.vn/wp-content/uploads/2023/07/Logo-VNPT-Technology-01-e1688528994519.png"
    },
    {
       id: 4,
       title: "Senior ReactJS/NodeJS Developer",
       company: "CMC Global",
       location: "TP. HCM",
       salary: "Up to $2000",
       deadline: "01/04/2026",
       logo: "https://inkythuatso.com/uploads/images/2021/11/logo-cmc-corp-inkythuatso-01-13-16-17-06.jpg"
    },
    {
        id: 5,
        title: "Chuyên viên ATTT (Security Specialist)",
        company: "VCS - Viettel Cyber Security",
        location: "Hà Nội",
        salary: "20 - 35 Triệu",
        deadline: "10/04/2026",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Viettel_logo_2021.png"
    },
    {
        id: 6,
        title: "Tuyển dụng Fresh Mobile Developer (iOS/Android)",
        company: "MISA JSC",
        location: "Hà Nội",
        salary: "10 - 15 Triệu",
        deadline: "25/03/2026",
        logo: "https://misa.vn/wp-content/uploads/2020/10/logo-misa.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Việc làm nổi bật</h2>
             <div className="h-1 w-20 bg-ptit-red rounded"></div>
          </div>
          <a href="#" className="hidden md:flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1 group">
             Xem tất cả việc làm
             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard job={job} onChatOpen={onChatOpen} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
           <a href="#" className="inline-flex items-center text-ptit-red font-medium hover:text-ptit-darkred transition-colors gap-1">
             Xem tất cả việc làm
             <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
