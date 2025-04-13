import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://localhost:8000';

export const addDestination = async (formData, image, navigate, setLoading) => {
  setLoading(true);

  const payload = new FormData();
  for (let key in formData) {
    payload.append(key, formData[key]);
  }
  if (image) {
    payload.append('image_file', image);
  }

  try {
    await axios.post(`${API_BASE_URL}/destination`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate("/bookings");

    Swal.fire({
      icon: 'success',
      title: 'Destination added successfully!',
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

export const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/destinations`);
      return response.data.reverse();
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
};

export const fetchDestinationById = async (destinationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/destination/${destinationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  };
  

export const updateDestination = async (destinationId, formData, image, navigate, setLoading) => {
    setLoading(true);
  
    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
    if (image) {
      payload.append('image_file', image);
    }
  
    try {
      await axios.put(`${API_BASE_URL}/destination/${destinationId}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Destination updated!',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/bookings");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Update failed!',
      });
    } finally {
      setLoading(false);
    }
  };
  
  export const deleteDestination = async (destinationId) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (confirm.isConfirmed) {
        await axios.delete(`${API_BASE_URL}/destination/${destinationId}`);
        await Swal.fire('Deleted!', 'The destination has been deleted.', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Delete failed.', 'error');
      throw error;
    }
  };
  

