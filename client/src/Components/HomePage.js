import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to the Travel Booking System!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
    </div>
  );
};

// Optional inline style for the button
const logoutBtnStyle = {
  marginTop: '1rem',
  padding: '0.6rem 1.2rem',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default HomePage;
