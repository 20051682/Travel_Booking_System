import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../images/logo2.jpeg';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="/home">
        <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
        />
        <span style={{ marginTop: '5px', display: 'inline-block' }}>AHP Travels</span>
        </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`} href="/bookings">Bookings</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`} href="/packages">Packages</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/hotels' ? 'active' : ''}`} href="/hotels">Hotels</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} href="/profile">Profile</a>
          </li>
        </ul>
        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
