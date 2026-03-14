import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Keep existing helpers for now to avoid breaking other components
export const loginUser = authService.login;
export const registerUser = authService.register;

export const getEquipment = (search = "") => api.get(`/equipment?search=${search}`);
export const createEquipment = (formData) => api.post("/equipment", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const createBooking = (data) => api.post("/bookings", data);
export const getBookings = () => api.get("/bookings");
export const getUserProfile = () => api.get("/users/me");
export const updateUserProfile = (data) => api.put("/users/me", data);

export default authService;
