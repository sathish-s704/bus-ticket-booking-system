// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if you need cookies
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Bus API
export const busAPI = {
  getBuses: (params) => api.get('/buses', { params }),
  getBusById: (busId, date) => api.get(`/buses/${busId}?date=${date}`),
  addBus: (busData) => api.post('/buses/add', busData),
  importBuses: () => api.post('/buses/import'),
};

// Admin API
export const adminAPI = {
  syncBuses: () => api.post('/admin/sync-buses'),
  addBus: (busData) => api.post('/buses/add', busData),
};

// Booking API
export const bookingAPI = {
  bookTicket: (bookingData) => api.post('/bookings/book', bookingData),
  getMyBookings: () => api.get('/bookings/my'),
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (bookingId) => api.get(`/bookings/${bookingId}`),
  updatePaymentStatus: (bookingId, paymentData) => 
    api.put(`/bookings/${bookingId}/payment`, paymentData),
  cancelBooking: (bookingId) => api.put(`/bookings/${bookingId}/cancel`),
};

export default api;
