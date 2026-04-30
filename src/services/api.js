// ============================================================
//  Centralized API Service
//  Base URL: .NET backend chạy ở localhost:5227 (hoặc port của bạn)
// ============================================================

const BASE_URL = 'https://jobptit-api-fbevbkfre0c4h4g4.southeastasia-01.azurewebsites.net/api';

// Helper: lấy token từ sessionStorage
const getToken = () => sessionStorage.getItem('token');

// Helper: fetch có kèm Authorization header tự động và Timeout
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const timeout = 30000; 
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 401 || response.status === 403) {
       if (!endpoint.includes('/featured') && !endpoint.includes('/public')) {
          console.warn('Phiên làm việc hết hạn, đang đăng xuất...');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userEmail');
          window.location.href = '/login?expired=true';
          return null;
       }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error(`[API Error] ${response.status}:`, data);
      let message = data?.message;
      if (!message && data?.errors) {
        message = Object.values(data.errors).flat().join(', ');
      }
      if (!message) message = `Lỗi hệ thống (${response.status})`;
      throw new Error(message);
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('Request bị Timeout hoặc bị hủy:', endpoint);
      throw new Error('Kết nối quá lâu (Timeout). Vui lòng thử lại!');
    }
    console.error(`[API Fetch Exception] ${endpoint}:`, err);
    throw err;
  }
};

// Helper mới: Tải file an toàn kèm Token
export const downloadProtectedFile = async (url, fileName = 'download') => {
  const token = getToken();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error('Không thể tải file');

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Tạo link ẩn để trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    // Dọn dẹp
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Download error:', err);
    alert('Tải file thất bại: ' + err.message);
  }
};

// AUTH
export const login = async (email, password, role) => {
  const data = await apiFetch('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
  return data.data;
};

export const register = async (dto) => {
  const data = await apiFetch('/Auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return data.data;
};

export const loginGoogle = async (idToken, role) => {
  const data = await apiFetch('/Auth/login-google', {
    method: 'POST',
    body: JSON.stringify({ idToken, role }),
  });
  return data.data;
};

// JOBS
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''))
  ).toString();
  const data = await apiFetch(`/Jobs${params ? `?${params}` : ''}`);
  return data.data;
};

export const getJob = async (id) => {
  const data = await apiFetch(`/Jobs/${id}`);
  return data.data;
};

export const getFeaturedJobs = async (count = 6) => {
  const data = await apiFetch(`/Jobs/featured?count=${count}`);
  return data.data;
};

export const applyJob = async (jobId) => {
  const data = await apiFetch(`/Jobs/${jobId}/apply`, { method: 'POST' });
  return data;
};

export const getEmployerJobsWithStats = async (keyword = '') => {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  const data = await apiFetch(`/Jobs/manage-listings${params}`);
  return data.data;
};

export const postJob = async (dto) => {
  const data = await apiFetch('/Jobs', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return data;
};

export const updateJob = async (id, dto) => {
  await apiFetch(`/Jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
};

export const deleteJob = async (id) => {
  await apiFetch(`/Jobs/${id}`, { method: 'DELETE' });
};

// APPLICATIONS
export const getMyApplications = async () => {
  const data = await apiFetch('/Applications/my-applications');
  return data.data;
};

export const getApplicants = async (jobId) => {
  const data = await apiFetch(`/Applications/job/${jobId}`);
  return data.data;
};

export const updateApplicationStatus = async (dto) => {
  const data = await apiFetch('/Applications/update-status', {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
  return data;
};

export const getApplicantCvUrl = (applicationId) => `${BASE_URL}/Applications/${applicationId}/cv`;

// COMPANIES
export const getMyCompany = async () => {
  const data = await apiFetch('/Companies/my-company');
  return data.data;
};

export const getCompany = async (id) => {
  const data = await apiFetch(`/Companies/${id}`);
  return data.data;
};

export const updateCompany = async (id, dto) => {
  await apiFetch(`/Companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
};

// PROFILES
export const getMyProfile = async () => {
  const data = await apiFetch('/Profiles/me');
  return data.data;
};

export const updateProfile = async (dto) => {
  const data = await apiFetch('/Profiles', {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
  return data;
};

export const uploadCv = async (file) => {
  const token = getToken();
  const formData = new FormData();
  formData.append('cv', file);
  const response = await fetch(`${BASE_URL}/Profiles/upload-cv`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || 'Upload CV failed');
  return data;
};

export const getMyCvUrl = () => `${BASE_URL}/Profiles/my-cv`;

// CATEGORIES
export const getCategories = async (keyword = '') => {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  const data = await apiFetch(`/Categories${params}`);
  return data.data;
};

export const getFeaturedCategories = async (count = 8, days = 30) => {
  const data = await apiFetch(`/Categories/featured?count=${count}&days=${days}`);
  return data.data;
};

// NEWS
export const getNews = async () => {
  const data = await apiFetch('/News');
  return data.data;
};

export const getNewsById = async (id) => {
  const data = await apiFetch(`/News/${id}`);
  return data.data;
};

// MESSAGING
export const getConversations = async () => {
  const data = await apiFetch('/Messages/conversations');
  return data.data;
};

export const getChatMessages = async (contactId) => {
  const data = await apiFetch(`/Messages/${contactId}`);
  return data.data;
};

export const sendMessage = async (receiverId, message) => {
  const data = await apiFetch('/Messages', {
    method: 'POST',
    body: JSON.stringify({ receiverId, message }),
  });
  return data.data;
};

// RESUMES (Multi-CV Management)
export const getResumes = async () => {
  const data = await apiFetch('/Resumes');
  return data; 
};

export const uploadUserResume = async (file) => {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${BASE_URL}/Resumes/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || 'Upload CV failed');
  return data;
};

export const deleteUserResume = async (id) => {
  await apiFetch(`/Resumes/${id}`, { method: 'DELETE' });
};

export const setMainUserResume = async (id) => {
  await apiFetch(`/Resumes/${id}/set-main`, { method: 'PUT' });
};

export const getUserResumeDownloadUrl = (id) => `${BASE_URL}/Resumes/${id}/download`;

// STATS
export const getMarketSummary = async () => {
  const data = await apiFetch('/Stats/market-summary');
  return data.data;
};

export const getMarketInsights = async () => {
  const data = await apiFetch('/Stats/market-insights');
  return data.data;
};
