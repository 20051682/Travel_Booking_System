import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const HomePage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  // Function to navigate to Hotels page
  const goToHotels = () => {
    navigate('/hotels');
  };

  // Function to navigate to Packages page
  const goToPackages = () => {
    navigate('/packages');
  };

  // Function to navigate to Bookings page
  const goToBookings = () => {
    navigate('/bookings');
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="text-center">Welcome to the Travel Booking System!</h2>
        <p className="text-center">You are successfully logged in.</p>
      </div>

      {/* Boxes outside the welcome message */}
      <div className="container mt-5">
        <div className="row">
          {/* Packages Box */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg" style={{cursor: "pointer"}} onClick={goToPackages}>
              <img src="https://via.placeholder.com/350x200?text=Package" className="card-img-top" alt="Package" />
              <div className="card-body text-center">
                <h5 className="card-title">Packages</h5>
                <p className="card-text">Explore our travel packages and make your dream vacation come true.</p>
                <button className="btn btn-success">View Packages</button>
              </div>
            </div>
          </div>

          {/* Booking Box */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg" style={{cursor: "pointer"}} onClick={goToBookings}>
              <img src="https://via.placeholder.com/350x200?text=Booking" className="card-img-top" alt="Booking" />
              <div className="card-body text-center">
                <h5 className="card-title">Bookings</h5>
                <p className="card-text">Book your travel, hotels, and packages in one click.</p>
                <button className="btn btn-success">Start Booking</button>
              </div>
            </div>
          </div>

          {/* Hotel Box */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg" style={{cursor: "pointer"}} onClick={goToHotels}>
              <img src="https://via.placeholder.com/350x200?text=Hotel" className="card-img-top" alt="Hotel" />
              <div className="card-body text-center">
                <h5 className="card-title">Hotels</h5>
                <p className="card-text">Find the best hotels for your stay, with amazing offers!</p>
                <button className="btn btn-success">Browse Hotels</button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel Button (Only for admin users) */}
        {role === "admin" && (
          <div className="text-center mt-4">
            <button className="btn btn-danger">Go to Admin Panel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
