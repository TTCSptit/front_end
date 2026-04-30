import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Clock, Building2, ChevronLeft, CheckCircle, Share2, Briefcase, Calendar, Upload, ArrowRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getJob, applyJob } from '../services/api';

const JobDetailPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (!id || id === 'undefined') { setLoading(false); return; }
            try {
                const data = await getJob(id);
                setJob(data);
            } catch (err) {
                setError(err.message || 'Không thể tải chi tiết công việc.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        setApplying(true);
        try {
            await applyJob(id);
            setShowApplyForm(false);
            setShowSuccessModal(true);
        } catch (err) {
            alert(err.message || 'Ứng tuyển thất bại. Bạn có thể đã ứng tuyển tin này rồi.');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    if (!job) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy công việc.</div>;


    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back Link */}
                <Link to="/home" className="inline-flex items-center text-gray-500 hover:text-ptit-red mb-6 transition-colors">
                    <ChevronLeft size={20} />
                    Quay lại trang công ty
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    <DollarSign size={18} className="text-green-600" />
                                    {job.salaryMin && job.salaryMax 
                                        ? `${job.salaryMin} - ${job.salaryMax} triệu` 
                                        : job.isNegotiable ? 'Thỏa thuận' : 'Lương hấp dẫn'}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    <MapPin size={18} className="text-blue-500" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    <Clock size={18} className="text-orange-500" />
                                    Hạn nộp: {job.expiredAt ? new Date(job.expiredAt).toLocaleDateString('vi-VN') : 'Đang cập nhật'}
                                </span>
                            </div>

                            <button
                                onClick={() => setShowApplyForm(true)}
                                className="w-full md:w-auto bg-ptit-red text-white font-bold py-3 px-8 rounded-lg hover:bg-ptit-darkred transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                            >
                                <Upload size={20} />
                                Ứng tuyển ngay
                            </button>
                        </div>

                        {/* Job Description */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-ptit-red pl-3">Mô tả công việc</h2>
                            <div className="prose text-gray-600 max-w-none whitespace-pre-line">
                                {job.description || 'Chưa có mô tả chi tiết.'}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-ptit-red pl-3">Yêu cầu ứng viên</h2>
                            <ul className="space-y-3">
                                {(job.requirements || []).length > 0 ? (job.requirements || []).map((req, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="text-ptit-red flex-shrink-0 mt-1" size={18} />
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                )) : <p className="text-gray-500">Xem chi tiết trong phần mô tả.</p>}
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-ptit-red pl-3">Quyền lợi</h2>
                            <ul className="space-y-3">
                                {(job.benefits || []).length > 0 ? (job.benefits || []).map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                )) : <p className="text-gray-500">Trao đổi trực tiếp khi phỏng vấn.</p>}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Company Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={job.companyLogoUrl} alt={job.companyName} className="w-16 h-16 rounded-lg object-contain border border-gray-200 p-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight mb-1">{job.companyName}</h3>
                                    <Link to={`/company/${job.companyId}`} className="text-sm text-ptit-red hover:underline">Xem trang công ty</Link>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Briefcase size={18} />
                                    <span>Kinh nghiệm: {job.experience}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Building2 size={18} />
                                    <span>Cấp bậc: {job.level}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={18} />
                                    <span>Loại hình: {job.type}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-gray-50 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                <Share2 size={18} />
                                Chia sẻ tin tuyển dụng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Form Modal (Mock) */}
            {showApplyForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 animate-fade-in-up shadow-2xl relative">
                        <button 
                            onClick={() => setShowApplyForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ứng tuyển ngay</h2>
                        <h3 className="text-ptit-red font-medium mb-6">{job.title}</h3>

                        <form className="space-y-4" onSubmit={handleApply}>
                            <p className="text-sm text-gray-500 mb-4">Hệ thống sẽ sử dụng CV hiện tại trong hồ sơ của bạn để ứng tuyển. Hãy đảm bảo hồ sơ của bạn đã được cập nhật.</p>
                            
                            <button 
                                type="submit" 
                                disabled={applying}
                                className="w-full bg-ptit-red text-white font-bold py-3 rounded-lg hover:bg-ptit-darkred transition-all mt-4 disabled:opacity-70"
                            >
                                {applying ? 'Đang gửi hồ sơ...' : 'Xác nhận ứng tuyển'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Application Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 text-center shadow-2xl animate-fade-in-up relative overflow-hidden">
                        {/* Decorative Background Blob */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-50 rounded-full blur-3xl opacity-50"></div>
                        
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce transition-all">
                                <CheckCircle size={48} />
                            </div>
                            
                            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Nộp hồ sơ thành công!</h2>
                            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                                Chúc mừng! Hồ sơ của bạn đã được gửi đến <span className="text-gray-900 font-bold">{job.companyName}</span>. 
                                Bạn có thể theo dõi tiến độ ứng tuyển ngay bây giờ.
                            </p>
                            
                            <div className="flex flex-col gap-4">
                                <Link 
                                    to="/applied-jobs" 
                                    className="w-full bg-ptit-red text-white font-black py-4 rounded-2xl hover:bg-ptit-darkred transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2 group"
                                >
                                    Xem việc làm đã nộp
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button 
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full bg-gray-50 text-gray-500 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all font-sans"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetailPage;
