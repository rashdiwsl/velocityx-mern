import axios from "axios";

const API_URL = "http://localhost:5000/api"; // your backend URL

export const getCars = async () => {
  try {
    const res = await axios.get(`${API_URL}/cars`);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};