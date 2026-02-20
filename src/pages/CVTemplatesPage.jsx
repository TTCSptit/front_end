import React, { useState } from 'react';
import { Download, Eye, Star, Filter } from 'lucide-react';

const CVTemplatesPage = () => {
    const templates = [
        { id: 1, name: 'CV Sinh viên / Thực tập', image: 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg', downloads: 1205 },
        { id: 2, name: 'CV Lập trình viên (IT)', image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/resume-cv-design-template-fe8c48a734e568ba454044199a5e828d_screen.jpg?ts=1658826555', downloads: 3420 },
        { id: 3, name: 'CV Marketing / Sáng tạo', image: 'https://cdn.venngage.com/template/thumbnail/small/b93557e8-3487-4348-8123-575a7b67b93f.webp', downloads: 2100 },
        { id: 4, name: 'CV Quản lý / Senior', image: 'https://marketplace.canva.com/EAFcO7D2Zms/1/0/1131w/canva-grey-clean-professional-resume-J-7vK2w5v2Y.jpg', downloads: 890 },
        { id: 5, name: 'CV Tiếng Anh chuẩn', image: 'https://cdn.enhancv.com/predefined-examples/software-engineer-resume-example-v4.jpg', downloads: 1540 },
        { id: 6, name: 'CV Thiết kế đồ họa', image: 'https://images.pikbest.com/templates/20210518/bg/6fc5a2008779c.png!w700wp', downloads: 1120 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Mẫu CV Chuyên Nghiệp</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tạo ấn tượng đầu tiên hoàn hảo với nhà tuyển dụng bằng các mẫu CV được thiết kế chuẩn ATS, hiện đại và chuyên nghiệp.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div key={template.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
                            <div className="relative h-96 bg-gray-100 overflow-hidden">
                                <img 
                                    src={template.image} 
                                    alt={template.name} 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                                    <button className="bg-ptit-red text-white font-bold py-3 px-8 rounded-full hover:bg-ptit-darkred transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        <Download size={20} />
                                        Tải xuống
                                    </button>
                                    <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-500">
                                        <Eye size={20} />
                                        Xem trước
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-ptit-red transition-colors">{template.name}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm font-bold text-gray-700">4.9</span>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center text-sm text-gray-500">
                                    <span>{template.downloads.toLocaleString()} lượt tải</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CVTemplatesPage;
