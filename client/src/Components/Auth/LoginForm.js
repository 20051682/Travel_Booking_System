import React, { useState } from 'react';
import { loginUser } from '../../Controllers/authController';
import '../../styles/LoginForm.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
    
    if (result?.access_token) {
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("role", result.role);

      navigate("/home");
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      setErrors({ email: "Incorrect email or password!" });
      setErrors({ password: "Incorrect email or password!" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed. Please check your credentials!',
      });
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="Email" onChange={handleChange} required />
        {errors.email && <p className="error">{errors.email}</p>}
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="login-link">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
