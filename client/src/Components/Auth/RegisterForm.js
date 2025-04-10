import React, { useState } from 'react';
import { userModel } from '../../Models/userModel';
import { registerUser } from '../../Controllers/authController';
import '../../styles/RegisterForm.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ ...userModel, confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.first_name || formData.first_name.length > 20) {
      newErrors.first_name = 'First name should be max 20 characters';
    }
    if (!formData.last_name || formData.last_name.length > 20) {
      newErrors.last_name = 'Last name should be max 20 characters';
    }

    // Mobile number validation
    const numberRegex = /^0\d{9}$/;
    if (!numberRegex.test(formData.number)) {
      newErrors.number = 'Mobile number should be exactly 10 digits and start with 0';
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...submitData } = formData;
    const result = await registerUser({ ...submitData, role: "user" });

    if (result) {
      navigate('/login');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 2000,
        showConfirmButton: false,
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed. Please check your credentials!',
      });
      
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" type="text" placeholder="First Name" onChange={handleChange} required />
        {errors.first_name && <p className="error">{errors.first_name}</p>}

        <input name="last_name" type="text" placeholder="Last Name" onChange={handleChange} required />
        {errors.last_name && <p className="error">{errors.last_name}</p>}

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <input name="number" type="text" placeholder="Mobile Number" onChange={handleChange} required />
        {errors.number && <p className="error">{errors.number}</p>}

        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit">Register</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
