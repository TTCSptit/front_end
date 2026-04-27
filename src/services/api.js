// ============================================================
//  Centralized API Service
//  Base URL: .NET backend chạy ở localhost:5227 (hoặc port của bạn)
// ============================================================

const BASE_URL = 'https://jobptit-api-fbevbkfre0c4h4g4.southeastasia-01.azurewebsites.net/api';

// Helper: lấy token từ sessionStorage
const getToken = () => sessionStorage.getItem('token');

// Helper: fetch có kèm Authorization header tự động
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Lấy message từ ApiResponse chuẩn của backend
    const message = data?.message || `HTTP Error ${response.status}`;
    throw new Error(message);
  }

  return data;
};

// ============================================================
//  AUTH
// ============================================================

/**
 * Đăng nhập – POST /api/Auth/login
 * @param {string} email
 * @param {string} password
 * @param {'Candidate'|'Recruiter'} role
 * @returns {{ token: string, user: { email, userName } }}
 */
export const login = async (email, password, role) => {
  const data = await apiFetch('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
  return data.data; // { token, user }
};

/**
 * Đăng ký – POST /api/Auth/register
 * @param {object} dto  { fullName, userName, email, password, role }
 */
export const register = async (dto) => {
  const data = await apiFetch('/Auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return data.data;
};

/**
 * Đăng nhập Google – POST /api/Auth/login-google
 * @param {string} idToken  token Google trả về
 * @param {'Candidate'|'Recruiter'} role
 */
export const loginGoogle = async (idToken, role) => {
  const data = await apiFetch('/Auth/login-google', {
    method: 'POST',
    body: JSON.stringify({ idToken, role }),
  });
  return data.data; // { token, user }
};

// ============================================================
//  JOBS
// ============================================================

/**
 * Lấy danh sách job (Candidate) – GET /api/Jobs?keyword=&location=&page=&pageSize=
 * @param {object} filters  { keyword, location, type, experience, page, pageSize }
 */
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''))
  ).toString();
  const data = await apiFetch(`/Jobs${params ? `?${params}` : ''}`);
  return data.data; // PagedResult<JobCardDto>
};

/**
 * Lấy chi tiết job – GET /api/Jobs/:id
 */
export const getJob = async (id) => {
  const data = await apiFetch(`/Jobs/${id}`);
  return data.data; // JobCardDto
};

/**
 * Lấy featured jobs (Candidate) – GET /api/Jobs/featured?count=6
 */
export const getFeaturedJobs = async (count = 6) => {
  const data = await apiFetch(`/Jobs/featured?count=${count}`);
  return data.data; // List<JobCardDto>
};

/**
 * Ứng tuyển job (Candidate) – POST /api/Jobs/:id/apply
 */
export const applyJob = async (jobId) => {
  const data = await apiFetch(`/Jobs/${jobId}/apply`, { method: 'POST' });
  return data;
};

/**
 * Lấy danh sách job của recruiter (có stats) – GET /api/Jobs/manage-listings?keyword=
 */
export const getEmployerJobsWithStats = async (keyword = '') => {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  const data = await apiFetch(`/Jobs/manage-listings${params}`);
  return data.data; // EmployerJobOverviewDto
};

/**
 * Đăng tin mới (Recruiter) – POST /api/Jobs
 * @param {object} dto  CreateJobDto
 */
export const postJob = async (dto) => {
  const data = await apiFetch('/Jobs', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return data;
};

/**
 * Cập nhật tin (Recruiter) – PUT /api/Jobs/:id
 */
export const updateJob = async (id, dto) => {
  await apiFetch(`/Jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
};

/**
 * Xoá tin (Recruiter) – DELETE /api/Jobs/:id
 */
export const deleteJob = async (id) => {
  await apiFetch(`/Jobs/${id}`, { method: 'DELETE' });
};

// ============================================================
//  APPLICATIONS
// ============================================================

/**
 * Lịch sử ứng tuyển (Candidate) – GET /api/Applications/my-applications
 */
export const getMyApplications = async () => {
  const data = await apiFetch('/Applications/my-applications');
  return data.data; // List<ApplicationCardDto>
};

/**
 * Danh sách ứng viên theo job (Recruiter) – GET /api/Applications/job/:jobId
 */
export const getApplicants = async (jobId) => {
  const data = await apiFetch(`/Applications/job/${jobId}`);
  return data.data; // JobApplicantsDashboardDto
};

/**
 * Cập nhật trạng thái ứng tuyển (Recruiter) – PUT /api/Applications/update-status
 */
export const updateApplicationStatus = async (dto) => {
  const data = await apiFetch('/Applications/update-status', {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
  return data;
};

/**
 * Tải CV ứng viên (Recruiter) – GET /api/Applications/:applicationId/cv
 * Trả về URL dạng blob để mở/tải file
 */
export const getApplicantCvUrl = (applicationId) => {
  const token = getToken();
  // Dùng trực tiếp URL để mở file download qua <a href> hoặc window.open
  return `${BASE_URL}/Applications/${applicationId}/cv`;
};

// ============================================================
//  COMPANIES
// ============================================================

/**
 * Lấy thông tin công ty của tôi (Recruiter) – GET /api/Companies/my-company
 */
export const getMyCompany = async () => {
  const data = await apiFetch('/Companies/my-company');
  return data.data; // CompanyDetailDto
};

/**
 * Chi tiết công ty – GET /api/Companies/:id
 */
export const getCompany = async (id) => {
  const data = await apiFetch(`/Companies/${id}`);
  return data.data; // CompanyDetailDto
};

/**
 * Cập nhật công ty (Recruiter) – PUT /api/Companies/:id
 */
export const updateCompany = async (id, dto) => {
  await apiFetch(`/Companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
};

// ============================================================
//  PROFILES (Candidate)
// ============================================================

/**
 * Lấy profile bản thân – GET /api/Profiles/me
 */
export const getMyProfile = async () => {
  const data = await apiFetch('/Profiles/me');
  return data.data; // ProfileDto
};

/**
 * Cập nhật profile – PUT /api/Profiles
 */
export const updateProfile = async (dto) => {
  const data = await apiFetch('/Profiles', {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
  return data;
};

/**
 * Upload CV – POST /api/Profiles/upload-cv  (multipart/form-data)
 * @param {File} file
 */
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

/**
 * Download CV của bản thân – GET /api/Profiles/my-cv
 * Trả về URL để mở trong tab mới
 */
export const getMyCvUrl = () => `${BASE_URL}/Profiles/my-cv`;

// ============================================================
//  CATEGORIES
// ============================================================

/**
 * Lấy danh sách ngành nghề – GET /api/Categories?keyword=
 */
export const getCategories = async (keyword = '') => {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  const data = await apiFetch(`/Categories${params}`);
  return data.data; // List<CategoryCardDto>
};

/**
 * Lấy danh sách ngành nghề nổi bật – GET /api/Categories/featured?count=6&days=30
 */
export const getFeaturedCategories = async (count = 8, days = 30) => {
  const data = await apiFetch(`/Categories/featured?count=${count}&days=${days}`);
  return data.data; // List<FeaturedCategoryCardDto>
};

// ============================================================
//  NEWS
// ============================================================

/**
 * Lấy danh sách tin tức – GET /api/News
 */
export const getNews = async () => {
  const data = await apiFetch('/News');
  return data.data; // List<News>
};

/**
 * Lấy chi tiết tin tức – GET /api/News/:id
 */
export const getNewsById = async (id) => {
  const data = await apiFetch(`/News/${id}`);
  return data.data; // News
};

// ============================================================
//  MESSAGING
// ============================================================

/**
 * Lấy danh sách hội thoại – GET /api/Messages/conversations
 */
export const getConversations = async () => {
  const data = await apiFetch('/Messages/conversations');
  return data.data;
};

/**
 * Lấy tin nhắn với một người – GET /api/Messages/:contactId
 */
export const getChatMessages = async (contactId) => {
  const data = await apiFetch(`/Messages/${contactId}`);
  return data.data; // List<ChatMessage>
};

/**
 * Gửi tin nhắn – POST /api/Messages
 */
export const sendMessage = async (receiverId, message) => {
  const data = await apiFetch('/Messages', {
    method: 'POST',
    body: JSON.stringify({ receiverId, message }),
  });
  return data.data;
};
