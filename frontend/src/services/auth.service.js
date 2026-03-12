import API from "./api";

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getEquipment = (search = "") => API.get(`/equipment?search=${search}`);
export const createEquipment = (formData) => API.post("/equipment", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const createBooking = (data) => API.post("/bookings", data);
export const getBookings = () => API.get("/bookings");
