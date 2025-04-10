import React, { useState } from 'react';
import { bookingModel } from '../Models/bookingModel';
import { submitBookingForm } from '../Controllers/bookingController';
import '../styles/BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState(bookingModel);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    
    const result = await submitBookingForm(formData);
    if (result) {
      alert('Booking submitted successfully!');
      setFormData(bookingModel); // Reset the form
    } else {
      alert('Error submitting booking');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Your Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
