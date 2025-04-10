import React, { useState } from 'react';
import { loginUser } from '../../Controllers/authController';
import '../../styles/LoginForm.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../images/logo2.jpeg'; // update path to your logo

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
      setErrors({
        email: "Incorrect email or password!",
        password: "Incorrect email or password!",
      });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed. Please check your credentials!',
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
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input name="email" type="text" className="form-control" placeholder="Email" onChange={handleChange} required />
              {errors.email && <p className="text-danger small">{errors.email}</p>}
            </div>
            <div className="mb-3">
              <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
              {errors.password && <p className="text-danger small">{errors.password}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-3">
            Do not have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
