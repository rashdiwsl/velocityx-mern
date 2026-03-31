import axios from "axios";

const API = "http://localhost:5000/api";

export const getCars = () => axios.get(`${API}/cars`);
export const getGarage = () => axios.get(`${API}/garage`);
export const addToGarage = (id) =>
  axios.post(`${API}/garage/add`, { carId: id });
export const removeFromGarage = (id) =>
  axios.delete(`${API}/garage/${id}`);