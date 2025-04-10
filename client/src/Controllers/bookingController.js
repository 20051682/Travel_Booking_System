import axios from 'axios';

export const submitBookingForm = async (formData) => {
  try {
    console.log(formData)
    const response = await axios.post('http://127.0.0.1:8000/bookings', formData);
    console.log('Booking submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting booking:', error);
    return null;
  }
};
