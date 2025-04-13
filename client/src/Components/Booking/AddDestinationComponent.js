// components/AddDestinationComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDestination } from '../../Controllers/destinationController';
import DestinationModel from '../../Models/destinationModel';

const AddDestinationComponent = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ ...DestinationModel });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addDestination(formData, image, navigate, setLoading);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '700px', width: '100%', marginTop: '5rem', marginBottom: '4rem' }}>
        <h2 className="mb-4 text-center text-primary">Add a New Destination</h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Description', name: 'description', type: 'text' },
          ].map(({ label, name, type }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}:</label>
              <input
                type={type}
                name={name}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Destination Image:</label>
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
            {loading ? 'Adding...' : 'Add Destination'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDestinationComponent;
