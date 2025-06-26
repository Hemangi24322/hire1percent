import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle unauthorized errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getProfile = async (userId) => {
  try {
    // If no userId is provided, get the current user's profile
    const endpoint = userId ? `/profile/${userId}` : '/profile';
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, {
      userId,
      ...profileData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error;
  }
}; 