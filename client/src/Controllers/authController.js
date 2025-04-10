import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, formData);
    return response.data;
  } catch (error) {
    console.error('Register Error:', error);
    return null;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, formData);
    console.log("This is Login section!");
    console.log("response:", response);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    return null;
  }
};
