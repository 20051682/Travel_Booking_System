import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useNavigate } from 'react-router-dom';

const travelPackages = [
  {
    id: 1,
    title: "Goa Beach Escape",
    description: "Enjoy 5 nights in Goa with beach-side resorts and local tours.",
    price: "₹24,999",
    image: "https://source.unsplash.com/400x250/?goa,beach",
  },
  {
    id: 2,
    title: "Manali Snow Adventure",
    description: "3-night trip to the snowy hills of Manali including skiing.",
    price: "₹18,499",
    image: "https://source.unsplash.com/400x250/?manali,snow",
  },
  {
    id: 3,
    title: "Kerala Backwaters",
    description: "4 nights of serene boat rides and Ayurvedic spa in Kerala.",
    price: "₹22,999",
    image: "https://source.unsplash.com/400x250/?kerala,boat",
  },
];

const Packages = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleAddPackage = () => {
    navigate('/add_package');
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Explore Our Travel Packages</h2>

        {role === "admin" && (
            <button className="btn btn-primary" onClick={handleAddPackage}>
              <span className="me-2">+</span>Add Hotel
            </button>
        )}

        <div className="row">
          {travelPackages.map((pkg) => (
            <div className="col-md-4 mb-4" key={pkg.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={pkg.image}
                  className="card-img-top"
                  alt={pkg.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pkg.title}</h5>
                  <p className="card-text">{pkg.description}</p>
                  <div className="mt-auto">
                    <h6 className="text-success fw-bold mb-2">{pkg.price}</h6>
                    <button className="btn btn-primary w-100">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {role === "admin" && (
          <div className="mt-5">
            <button className="btn btn-danger">Go to Admin Panel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Packages;
