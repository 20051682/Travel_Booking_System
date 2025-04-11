import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const UserProfileComponent = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    const user_id = user_info.id;
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8000/users/${user_id}`)
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Error fetching user profile:', err);
      Swal.fire('Error', 'Unable to fetch user details', 'error');
    });
  }, [navigate]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/user/delete', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
          localStorage.clear();
          navigate('/login');
        })
        .catch((err) => {
          console.error(err);
          Swal.fire('Error', 'Account deletion failed', 'error');
        });
      }
    });
  };

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>User Profile</h2>
        <div className="card mt-4 p-4 shadow-sm">
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Number:</strong> {user.number}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <div className="mt-3">
            <button className="btn btn-primary me-3" onClick={handleEdit}>Edit Profile</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete My Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileComponent;