import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';  // Make sure to import NavBar

const UpdateHotelComponent = () => {
  const { hotelId } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_single_room: '',
    price_per_double_room: '',
    price_per_large_room: '',
    location: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/hotel/${hotelId}`);
        const hotel = res.data;

        setFormData({
          name: hotel.name,
          description: hotel.description,
          price_per_single_room: hotel.price_per_single_room,
          price_per_double_room: hotel.price_per_double_room,
          price_per_large_room: hotel.price_per_large_room,
          location: hotel.location,
        });

        setImagePreview(hotel.image_url);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        Swal.fire("Error", "Could not fetch hotel details.", "error");
      }
    };

    fetchHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
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
      await axios.put(`http://localhost:8000/hotel/${hotelId}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire("Success", "Hotel Details updated successfully!", "success");
      navigate("/hotels");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Update failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar /> {/* Add NavBar here */}
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: '700px', width: '100%', marginTop: '5rem', marginBottom: '4rem' }}>
          <h2 className="mb-4 text-center text-primary">Update Hotel Details </h2>

          <form onSubmit={handleSubmit}>
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Description', name: 'description', type: 'text' },
              { label: 'Price (Single Room)', name: 'price_per_single_room', type: 'number' },
              { label: 'Price (Double Room)', name: 'price_per_double_room', type: 'number' },
              { label: 'Price (Large Room)', name: 'price_per_large_room', type: 'number' },
              { label: 'Location', name: 'location', type: 'text' },
            ].map(({ label, name, type }) => (
              <div className="mb-3" key={name}>
                <label className="form-label">{label}:</label>
                <input
                  type={type}
                  name={name}
                  className="form-control"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Hotel Image:</label>
              <input type="file" className="form-control" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-3 text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', border: '1px solid #ccc' }}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update Hotel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotelComponent;
