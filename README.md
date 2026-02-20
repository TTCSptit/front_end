# PTIT Jobs - Website Tuyển dụng & Tìm việc

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)

Website kết nối nhà tuyển dụng và sinh viên/ứng viên PTIT. Hỗ trợ đăng tin tuyển dụng, tìm kiếm việc làm, và quản lý ứng viên chuyên nghiệp.

## 🚀 Tính năng

### Dành cho Ứng viên
- 🔍 **Tìm kiếm việc làm**: Lọc theo ngành nghề, địa điểm và từ khóa.
- 📄 **Chi tiết công việc**: Xem thông tin chi tiết về yêu cầu, quyền lợi và thông tin công ty.
- 📝 **Quản lý CV**: Tiếp cận các mẫu CV chuyên nghiệp.
- 📊 **Theo dõi ứng tuyển**: Quản lý danh sách các công việc đã ứng tuyển và trạng thái.
- 👤 **Trang cá nhân**: Cập nhật thông tin ứng viên và kỹ năng.
- 💬 **Hỗ trợ AI**: Chatbot tư vấn việc làm và giải đáp thắc mắc.

### Dành cho Nhà tuyển dụng  
- 📢 **Tuyển dụng**: Đăng và chỉnh sửa tin tuyển dụng dễ dàng.
- 📊 **Dashboard điều khiển**: Theo dõi hiệu quả tuyển dụng và thông số thống kê.
- 👥 **Quản lý ứng viên**: Xem hồ sơ, đánh giá và lưu trữ ứng viên tiềm năng.
- 🏢 **Hồ sơ doanh nghiệp**: Xây dựng thương hiệu nhà tuyển dụng.
- 📈 **Báo cáo nhu cầu**: Xem báo cáo phân tích nhu cầu tuyển dụng thị trường.

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 19 + Vite 7
- **Styling**: TailwindCSS 4 (Modern CSS-first framework)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Development**: ESLint + PostCSS

## 📦 Cài đặt

```bash
# Clone repo
git clone https://github.com/your-username/ptit-jobs.git

# Di chuyển vào thư mục
cd ptit-jobs

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## 📁 Cấu trúc thư mục

```
src/
├── components/     # Các component dùng chung (Header, Footer, ChatBot, Layout...)
├── pages/          # Các trang chức năng của hệ thống
├── assets/         # Hình ảnh, font và tài nguyên tĩnh
├── App.jsx         # Cấu hình Routing và logic chính
└── main.jsx        # Entry point của ứng dụng
```

## 🔗 Hệ thống Routes

| Route | Mô tả |
|-------|-------|
| `/home` | Trang chủ - Danh sách việc làm |
| `/login` | Đăng nhập hệ thống |
| `/register` | Đăng ký tài khoản mới |
| `/forgot-password` | Khôi phục mật khẩu |
| `/company/:id` | Thông tin chi tiết công ty |
| `/industries` | Danh mục các ngành nghề |
| `/industry/:id` | Việc làm theo ngành nghề |
| `/job/:id` | Chi tiết tin tuyển dụng |
| `/cv-templates` | Thư viện mẫu CV |
| `/news` | Tin tức và hướng nghiệp |
| `/profile` | Trang cá nhân Ứng viên |
| `/applied-jobs` | Danh sách việc làm đã ứng tuyển |
| `/market-demand` | Báo cáo nhu cầu thị trường |
| `/recruiter` | Landing page cho Nhà tuyển dụng |
| `/recruiter/dashboard` | Bảng điều khiển Nhà tuyển dụng |
| `/recruiter/post-job` | Đăng tin tuyển dụng mới |
| `/recruiter/edit-job/:id` | Chỉnh sửa tin tuyển dụng |
| `/recruiter/jobs/:id/applicants` | Danh sách ứng viên ứng tuyển |
| `/recruiter/company-profile` | Quản lý thông tin công ty |
| `/recruiter/stats` | Thống kê hiệu quả tuyển dụng |
| `/recruiter/saved-candidates` | Danh sách ứng viên đã lưu |
| `/recruiter/demand-report` | Báo cáo nhu cầu tuyển dụng |

## 👨‍💻 Tác giả

Sinh viên Học viện Công nghệ Bưu chính Viễn thông (PTIT)

## 📄 License

MIT License
