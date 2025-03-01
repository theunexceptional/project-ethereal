import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Matches server.js

// 📝 Signup Function
export const signup = async (username, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, { username, email, password }, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 🔐 Login Function
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 🔒 Check Protected Route
export const checkProtected = async () => {
  try {
    const res = await axios.get(`${API_URL}/protected`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
