import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const UpdateUserComponent = () => {
    const [role, setRole] = useState("");
    
    useEffect(() => {
        const userRole = localStorage.getItem("role");
        setRole(userRole);
    }, []);

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        number: '',
        role: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user_info = JSON.parse(localStorage.getItem("user_info"));
        const user_id = user_info.id;

        if (!token) {
        navigate('/login');
        return;
        }

        axios.get(`http://127.0.0.1:8000/users/${user_id}`)
        .then((res) => {
            setUser({ ...res.data, password: '' }); // Keep password empty for security
        })
        .catch((err) => {
            console.error("Error fetching user:", err);
            Swal.fire('Error', 'Failed to fetch user details', 'error');
        });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const user_info = JSON.parse(localStorage.getItem("user_info"));
        const user_id = user_info.id;

        axios.put(`http://127.0.0.1:8000/users/${user_id}`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then(() => {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        navigate('/profile');
        })
        .catch((err) => {
        console.error(err);
        Swal.fire('Error', 'Profile update failed', 'error');
        });
    };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mt-4">
          <div className="mb-3">
            <label>First Name</label>
            <input type="text" name="first_name" className="form-control" value={user.first_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" name="last_name" className="form-control" value={user.last_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Phone Number</label>
            <input type="text" name="number" className="form-control" value={user.number} onChange={handleChange} required />
          </div>
          {role === "admin" && (
                <div className="mb-3">
                    <label>Role</label>
                        <select name="role" className="form-control" value={user.role} onChange={handleChange} required>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                </div>
            )}
            {role === "admin" && (
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
                </div>
            )}

          <button type="submit" className="btn btn-success">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateUserComponent;
