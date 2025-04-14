import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const UpdatePackageComponent = () => {
  const { packageId } = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    hotel_name: '',
    place_from: '',
    place_to: '',
    room_type: '',
    start_date: '',
    end_date: '',
    price: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/package/${packageId}`);
        const pkg = res.data;

        setFormData({
          name: pkg.name,
          hotel_name: pkg.hotel_name,
          place_from: pkg.place_from,
          place_to: pkg.place_to,
          room_type: pkg.room_type,
          start_date: pkg.start_date,
          end_date: pkg.end_date,
          price: pkg.price,
        });

        setImagePreview(pkg.image_url);
      } catch (error) {
        console.error("Error fetching package:", error);
        Swal.fire("Error", "Could not fetch package details.", "error");
      }
    };

    fetchPackage();
  }, [packageId]);

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
      await axios.put(`http://localhost:8000/package/${packageId}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire("Success", "Package updated successfully!", "success");
      navigate("/packages");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Update failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: '700px', width: '100%', marginTop: '5rem', marginBottom: '4rem' }}>
          <h2 className="mb-4 text-center text-primary">Update Package</h2>

          <form onSubmit={handleSubmit}>
            {[
            { label: 'Package Name', name: 'name', type: 'text' },
            { label: 'Hotel Name', name: 'hotel_name', type: 'text' },
            { label: 'From (Place)', name: 'place_from', type: 'text' },
            { label: 'To (Place)', name: 'place_to', type: 'text' },
            { label: 'Room Type', name: 'room_type', type: 'text' },
            { label: 'Start Date', name: 'start_date', type: 'date' },
            { label: 'End Date', name: 'end_date', type: 'date' },
            { label: 'Price', name: 'price', type: 'number' },
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
              <label className="form-label">Package Image:</label>
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
              {loading ? 'Updating...' : 'Update Package'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackageComponent;
