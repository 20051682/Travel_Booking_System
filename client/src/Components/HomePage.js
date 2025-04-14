import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/HomePage.css';

const HomePage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const goToHotels = () => navigate('/hotels');
  const goToPackages = () => navigate('/packages');
  const goToBookings = () => navigate('/bookings');

  return (
    <>
      <NavBar />
      <div className="container mt-5 text-center animate-fade-in">
        <h1 className="display-4 fw-bold mb-3">🌍 Welcome to AHP Travel Booking System!</h1>
        <p className="lead">Plan your perfect trip with our curated hotels, packages, and easy booking system.</p>
      </div>

      {role === "admin" && (
        <div className="text-center mt-5">
          <span className="badge bg-danger fs-5 px-4 py-3 rounded-pill shadow-sm" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>
            🔧 Admin Panel
          </span>
          <p className="mt-2 text-muted">You have administrator access.</p>
        </div>
      )}

      <div className="container mt-5 animate-fade-in-slow">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 hover-card" onClick={goToPackages}>
              <img src="https://storage.googleapis.com/travel-booking-system-e9a0c.firebasestorage.app/hotels/package.jpg" className="card-img-top" alt="Packages" />
              <div className="card-body text-center">
                <h5 className="card-title">Travel Packages</h5>
                <p className="card-text">Browse exclusive travel packages tailored for you and your family.</p>
                <button className="btn btn-primary">View Packages</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 hover-card" onClick={goToBookings}>
              <img src="https://storage.googleapis.com/travel-booking-system-e9a0c.firebasestorage.app/hotels/travel.avif" className="card-img-top" alt="Bookings" />
              <div className="card-body text-center">
                <h5 className="card-title">Bookings</h5>
                <p className="card-text">Book flights, hotels, and packages with just a few clicks.</p>
                <button className="btn btn-primary">Start Booking</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 hover-card" onClick={goToHotels}>
              <img src="https://storage.googleapis.com/travel-booking-system-e9a0c.firebasestorage.app/hotels/home-h.jpg" className="card-img-top" alt="Hotels" />
              <div className="card-body text-center">
                <h5 className="card-title">Hotels</h5>
                <p className="card-text">Discover comfortable stays at the best prices and ratings.</p>
                <button className="btn btn-primary">Browse Hotels</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer mt-5 py-4 text-center text-white bg-dark">
        <p className="mb-0">&copy; 2025 Travel Booking System</p>
      </footer>
    </>
  );
};

export default HomePage;
