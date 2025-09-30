import axios from 'axios';
import { toast } from 'react-toastify';

// Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true // ✅ Important: send cookies (for session or token-based auth)
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 🔐 Set token if available
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Optional: clear user info as well
      toast.error('Session expired. Please login again.');
      window.location.href = '/login'; // ⛔ Redirect to login
    }

    return Promise.reject(error);
  }
);

export default API;
