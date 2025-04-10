import React, { useState } from 'react';
import { userModel } from '../Models/userModel';
import { registerUser } from '../Controllers/authController';
import '../styles/RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState(userModel);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser({ ...formData, role: "user" });
    if (result) {
      alert('Registration successful! Please login.');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
