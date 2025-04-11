import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';

const HotelComponent = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>This is Hotel Page!</h2>

        {role === "admin" && (
          <button className="btn btn-danger mt-3">Admin Panel</button>
        )}
      </div>
    </>
  );
};

export default HotelComponent;
