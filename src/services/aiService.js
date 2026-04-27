const AI_BASE_URL = 'https://jobptit-api-fbevbkfre0c4h4g4.southeastasia-01.azurewebsites.net/api/Ai';

/**
 * Gửi tin nhắn và nhận stream từ AI qua Backend proxy
 */
export const chatWithAiStream = async (message, sessionId, userId, cvFile) => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('session_id', sessionId);
  formData.append('user_id', userId || 'guest');
  
  if (cvFile) {
    formData.append('cv_file', cvFile);
  }

  const response = await fetch(`${AI_BASE_URL}/chat`, {
    method: 'POST',
    body: formData,
    // Không set Content-Type để trình duyệt tự động set boundary cho FormData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Lỗi kết nối AI Service qua Backend');
  }

  return response.body; // ReadableStream
};

/**
 * Lấy dữ liệu kỹ năng từ AI Service
 */
export const getAiSkills = async (userId) => {
  try {
    const response = await fetch(`${AI_BASE_URL}/skills/${userId || 'guest'}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching AI skills:', error);
    return null;
  }
};

/**
 * Lấy lịch sử chat từ AI Service
 */
export const getAiChatHistory = async (userId) => {
  try {
    const response = await fetch(`${AI_BASE_URL}/history/${userId || 'guest'}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.messages || []; // Đồng bộ với schema .NET Backend mới
  } catch (error) {
    console.error('Error fetching AI chat history:', error);
    return [];
  }
};

/**
 * Tạo kết nối WebSocket tới AI qua .NET Backend proxy
 */
export const createAiWebSocket = (userId) => {
  const wsUrl = `wss://jobptit-api-fbevbkfre0c4h4g4.southeastasia-01.azurewebsites.net/ws/chat/${userId || 'guest'}`;
  return new WebSocket(wsUrl);
};
