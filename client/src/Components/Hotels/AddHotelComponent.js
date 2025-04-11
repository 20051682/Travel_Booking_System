import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';

const AddHotel = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>Welcome to the Travel Booking System!</h2>
        <p>You are successfully logged in.</p>

        {role === "admin" && (
          <button className="btn btn-danger mt-3">Admin Panel</button>
        )}
      </div>
    </>
  );
};

export default AddHotel;
