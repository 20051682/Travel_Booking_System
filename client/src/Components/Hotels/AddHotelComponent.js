import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddHotelComponent = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price_per_single_room: '',
        price_per_double_room: '',
        price_per_large_room: '',
        start_date: '',
        end_date: '',
        location: '',
    });
    const [image, setImage] = useState(null);
    // const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
    if (image) {
      payload.append('image_file', image);
    }

    try {
        const response = await axios.post('http://localhost:8000/hotel', payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        navigate("/hotels");

        // setMessage('Hotel added successfully!');
        Swal.fire({
            icon: 'success',
            title: 'Hotel added successfully!',
            text: 'Welcome back!',
            timer: 2000,
            showConfirmButton: false,
        });
      
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Adding failed!',
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Hotel</h2>
      {/* {message && <div className="alert alert-info">{message}</div>} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Description:</label>
          <input type="text" name="description" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Price (Single Room):</label>
          <input type="number" name="price_per_single_room" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Price (Double Room):</label>
          <input type="number" name="price_per_double_room" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Price (Large Room):</label>
          <input type="number" name="price_per_large_room" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Start Date:</label>
          <input type="date" name="start_date" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>End Date:</label>
          <input type="date" name="end_date" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Location:</label>
          <input type="text" name="location" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Hotel Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Adding...' : 'Add Hotel'}
        </button>

      </form>
    </div>
  );
};

export default AddHotelComponent;
