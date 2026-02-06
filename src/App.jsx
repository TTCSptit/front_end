import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import IndustriesPage from './pages/IndustriesPage';
import JobDetailPage from './pages/JobDetailPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import CVTemplatesPage from './pages/CVTemplatesPage';
import NewsPage from './pages/NewsPage';
import RecruiterPage from './pages/RecruiterPage';
import PostJobPage from './pages/PostJobPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import JobApplicantsPage from './pages/JobApplicantsPage';
import ChatBot from './components/ChatBot';

function App() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const openChatWithJob = (jobTitle) => {
    setIsChatOpen(true);
    // In a real app, we would pass the job context to the chatbot here
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage onChatOpen={openChatWithJob} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/company/:id" element={<CompanyDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industry/:id" element={<IndustryDetailPage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/cv-templates" element={<CVTemplatesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/recruiter/post-job" element={<PostJobPage />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
        <Route path="/recruiter/jobs/:jobId/applicants" element={<JobApplicantsPage />} />
      </Routes>
      <ChatBot isOpen={isChatOpen} onToggle={toggleChat} />
    </Layout>
  );
}

export default App;
