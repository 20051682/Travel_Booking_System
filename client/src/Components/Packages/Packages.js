import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useNavigate } from 'react-router-dom';

const travelPackages = [
  {
    id: 1,
    title: "Emerald Odyssey Escape",
    description: "Explore the Cliffs of Moher, wander through Dublin’s historic Trinity College, and sip whiskey in a charming Galway distillery. Includes a private castle dinner.",
    details: "This package includes 5 nights in 4-star hotels, daily breakfast, guided tours to the Cliffs of Moher and Trinity College, a whiskey tasting session in Galway, and a private dinner in a historic castle. Transportation is provided via luxury coach.",
    price: "€150.765",
    image: "https://source.unsplash.com/400x250/?goa,beach",
  },
  {
    id: 2,
    title: "Celtic Dreamweaver Journey",
    description: "Visit the Ring of Kerry, marvel at the Giant’s Causeway, and enjoy a traditional Irish music night in Killarney. Features a guided hike in Wicklow Mountains.",
    details: "Enjoy 7 nights in boutique accommodations, a full Irish breakfast daily, guided tours of the Ring of Kerry and Giant’s Causeway, a private music night with local musicians in Killarney, and a guided hike in the Wicklow Mountains. Includes all transfers and entry fees.",
    price: "€203.289",
    image: "https://source.unsplash.com/400x250/?manali,snow",
  },
  {
    id: 3,
    title: "Mystic Shamrock Sojourn",
    description: "Discover ancient Newgrange, stroll through colorful Cork, and experience a falconry session at a countryside estate. Perfect for a short, magical getaway.",
    details: "This 4-night package offers stays in charming guesthouses, daily breakfast, a guided tour of Newgrange, a walking tour of Cork’s vibrant streets, and a unique falconry experience at a countryside estate. Airport transfers are included.",
    price: "€100.631",
    image: "https://source.unsplash.com/400x250/?kerala,boat",
  },
];

const Packages = () => {
  const [role, setRole] = useState("");
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleAddPackage = () => {
    navigate('/add_package');
  };

  const toggleDetails = (id) => {
    setExpandedCard(expandedCard === id ? null : id); // Toggle the card's details
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Explore Our Travel Packages</h2>

        {role === "admin" && (
          <button className="btn btn-primary mb-4" onClick={handleAddPackage}>
            <span className="me-2">+</span>Add Package
          </button>
        )}

        <div className="row">
          {travelPackages.map((pkg) => (
            <div className="col-md-4 mb-4" key={pkg.id}>
              <div
                className="card h-100 shadow-sm"
                onClick={() => toggleDetails(pkg.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={pkg.image}
                  className="card-img-top"
                  alt={pkg.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pkg.title}</h5>
                  <p className="card-text">{pkg.description}</p>
                  {expandedCard === pkg.id && (
                    <div className="card-details mt-3 p-3 bg-light rounded">
                      <p>{pkg.details}</p>
                    </div>
                  )}
                  <div className="mt-auto">
                    <h6 className="text-success fw-bold mb-2">{pkg.price}</h6>
                    <button
                      className="btn btn-primary w-100"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from toggling details
                        // Add booking logic here if needed
                        alert(`Booking ${pkg.title}`);
                      }}
                    >
                      Book Now
                    </button>
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

      {/* Inline CSS for smooth transitions */}
      <style jsx>{`
        .card-details {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default Packages;