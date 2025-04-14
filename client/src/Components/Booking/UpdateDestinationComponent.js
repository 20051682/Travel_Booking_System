import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateDestination, fetchDestinationById } from '../../Controllers/destinationController';
import NavBar from '../NavBar';

const UpdateDestinationComponent = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', description: '', url: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        const data = await fetchDestinationById(destinationId);
        setFormData({ name: data.name, description: data.description, url: data.url });
        setImagePreview(data.image_url); // Show image
      } catch (error) {
        console.error(error);
      }
    };

    loadDestination();
  }, [destinationId]);

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
    updateDestination(destinationId, formData, image, navigate, setLoading);
  };

  return (
    <>
    <NavBar />
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="mb-4 text-center text-primary">Update Destination</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input type="text" name="description" className="form-control" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Wikipedia Url:</label>
            <input type="text" name="url" className="form-control" value={formData.url} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Image:</label>
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
            {loading ? 'Updating...' : 'Update Destination'}
          </button>
        </form>
      </div>
    </div>
    </>

  );
};

export default UpdateDestinationComponent;
