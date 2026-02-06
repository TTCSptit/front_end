# PTIT Jobs - Website Tuyển dụng & Tìm việc

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)

Website kết nối nhà tuyển dụng và sinh viên/ứng viên PTIT. Hỗ trợ đăng tin tuyển dụng, tìm kiếm việc làm, và quản lý ứng viên.

## 🚀 Tính năng

### Dành cho Ứng viên
- 🔍 Tìm kiếm việc làm theo ngành nghề, địa điểm
- 📄 Xem chi tiết công việc và công ty
- 📝 CV Templates sẵn có
- 💬 Chatbot hỗ trợ tìm việc

### Dành cho Nhà tuyển dụng  
- 📢 Đăng tin tuyển dụng
- 📊 Dashboard quản lý tin đăng
- 👥 Xem và quản lý ứng viên
- 💬 Chat với Admin hỗ trợ

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React

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
├── components/     # Các component dùng chung
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ChatBot.jsx
│   └── Layout.jsx
├── pages/          # Các trang
│   ├── HomePage.jsx
│   ├── RecruiterPage.jsx
│   ├── RecruiterDashboardPage.jsx
│   ├── PostJobPage.jsx
│   ├── JobApplicantsPage.jsx
│   └── ...
└── App.jsx         # Routing chính
```

## 🔗 Routes

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/industries` | Danh sách ngành nghề |
| `/job/:id` | Chi tiết công việc |
| `/cv-templates` | Mẫu CV |
| `/news` | Tin tức |
| `/recruiter` | Trang nhà tuyển dụng |
| `/recruiter/dashboard` | Quản lý tin đăng |
| `/recruiter/post-job` | Đăng tin mới |
| `/recruiter/jobs/:id/applicants` | Xem ứng viên |

## 👨‍💻 Tác giả

Sinh viên Học viện Công nghệ Bưu chính Viễn thông (PTIT)

## 📄 License

MIT License
