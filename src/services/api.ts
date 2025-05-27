import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Project API
export const projectApi = {
  getAll: () => api.get('/api/projects'),
  getById: (id: string) => api.get(`/api/projects/${id}`),
  create: (project: any) => api.post('/api/projects', project),
  update: (id: string, project: any) => api.put(`/api/projects/${id}`, project),
  delete: (id: string) => api.delete(`/api/projects/${id}`),
};

// Skills API
export const skillsApi = {
  getAll: () => api.get('/api/skills'),
  create: (skill: any) => api.post('/api/skills', skill),
  update: (id: string, skill: any) => api.put(`/api/skills/${id}`, skill),
  delete: (id: string) => api.delete(`/api/skills/${id}`),
};

// Auth API
export const authApi = {
  login: (username: string, password: string) => 
    api.post('/api/auth/login', { username, password }),
  register: (username: string, password: string) => 
    api.post('/api/auth/register', { username, password }),
  getMe: () => api.get('/api/auth/me'),
};

// Contact API
export const contactApi = {
  sendEmail: (data: { name: string; email: string; message: string }) =>
    api.post('/api/contact', data),
};

export default api;
