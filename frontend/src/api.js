import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('velocityUser');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getCars = (params) => API.get('/cars', { params });
export const addCar = (data) => API.post('/cars', data);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
export const getGarage = () => API.get('/garage');
export const addToGarage = (carId) => API.post(`/garage/add/${carId}`);
export const removeFromGarage = (carId) => API.delete(`/garage/remove/${carId}`);
export const updateCarStatus = (id, status) => API.patch(`/cars/${id}/status`, { status });