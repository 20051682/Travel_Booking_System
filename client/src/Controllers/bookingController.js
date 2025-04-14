import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const submitBookingForm = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/booking', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting booking:', error);
    return null;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return [];
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/booking/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Cancel booking failed:', error);
    throw error;
  }
};

export const updateBooking = async (bookingId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/booking/${bookingId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};
