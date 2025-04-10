import React, { useState } from 'react';
import { userModel } from '../../Models/userModel';
import { registerUser } from '../../Controllers/authController';
import '../../styles/RegisterForm.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../images/logo2.jpeg';

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
        title: 'Registration Successful',
        text: 'Please login to continue!',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registration failed. Please check your credentials!',
      });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow-lg rounded p-4 bg-white w-100" style={{ maxWidth: '900px' }}>
        {/* Logo / Left Side */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center border-end">
          <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
          <h3 className="text-primary mt-3" style={{fontFamily: "fangsong"}}>Welcome to AHP Travels</h3>
        </div>

        {/* Form / Right Side */}
        <div className="col-md-6 px-4">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input name="first_name" type="text" className="form-control" placeholder="First Name" onChange={handleChange} required />
              {errors.first_name && <p className="text-danger small">{errors.first_name}</p>}
            </div>
            <div className="mb-3">
              <input name="last_name" type="text" className="form-control" placeholder="Last Name" onChange={handleChange} required />
              {errors.last_name && <p className="text-danger small">{errors.last_name}</p>}
            </div>
            <div className="mb-3">
              <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input name="number" type="text" className="form-control" placeholder="Mobile Number" onChange={handleChange} required />
              {errors.number && <p className="text-danger small">{errors.number}</p>}
            </div>
            <div className="mb-3">
              <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" onChange={handleChange} required />
              {errors.confirmPassword && <p className="text-danger small">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className="mt-3">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
