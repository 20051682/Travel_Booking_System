import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import '../../styles/Hotels.css';
import { useNavigate } from 'react-router-dom';

const HotelComponent = () => { 
  // Dummy hotel data for now
  const hotelData = [
    { id: 1, name: "Hotel Paradise", description: "A luxurious hotel with amazing views", price: "$150/night", image: "hotel1" },
    { id: 2, name: "Ocean Breeze Resort", description: "Relax by the beach with top-tier amenities", price: "$200/night", image: "https://via.placeholder.com/300x200?text=Hotel+2" },
    { id: 3, name: "Mountain Escape", description: "Escape to the mountains for a peaceful stay", price: "$180/night", image: "https://via.placeholder.com/300x200?text=Hotel+3" },
    { id: 4, name: "Luxury Inn", description: "A 5-star experience in the heart of the city", price: "$220/night", image: "https://via.placeholder.com/300x200?text=Hotel+4" },
    { id: 5, name: "Desert Oasis", description: "Stay in the middle of the desert with all the comforts", price: "$160/night", image: "https://via.placeholder.com/300x200?text=Hotel+5" },
    { id: 6, name: "City Lights Hotel", description: "A hotel in the city center with a stunning skyline view", price: "$250/night", image: "https://via.placeholder.com/300x200?text=Hotel+6" },
    { id: 7, name: "Seaside Retreat", description: "Wake up to the sound of the waves and a beautiful sunrise", price: "$170/night", image: "https://via.placeholder.com/300x200?text=Hotel+7" },
    { id: 8, name: "Forest Lodge", description: "Stay surrounded by nature and tranquility", price: "$140/night", image: "https://via.placeholder.com/300x200?text=Hotel+8" },
    { id: 9, name: "Island Getaway", description: "Your private island paradise awaits", price: "$300/night", image: "https://via.placeholder.com/300x200?text=Hotel+9" },
    { id: 10, name: "Urban Stay", description: "Convenience and luxury in the heart of the city", price: "$210/night", image: "https://via.placeholder.com/300x200?text=Hotel+10" },
    { id: 11, name: "Countryside Retreat", description: "A peaceful stay in the heart of the countryside", price: "$190/night", image: "https://via.placeholder.com/300x200?text=Hotel+11" },
    { id: 12, name: "Luxury Palace", description: "Stay like royalty in our luxurious rooms", price: "$350/night", image: "https://via.placeholder.com/300x200?text=Hotel+12" },
    // You can add more data as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;
  const navigate = useNavigate();

  // Calculate current hotels to show
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotelData.slice(indexOfFirstHotel, indexOfLastHotel);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Determine the total pages for pagination
  const totalPages = Math.ceil(hotelData.length / hotelsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleAddHotel = () => {
    navigate('/add_hotel');
  };

  const handleViewHotel = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  // const handleDeleteHotel = (hotelId) => {
    //const updatedHotels = hotelData.filter((hotel) => hotel.id !== hotelId);
    //setHotelData(updatedHotels);
 // };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-auto">Hotel Listings</h2>

          {role === "admin" && (
            <button className="btn btn-primary" onClick={handleAddHotel}>
              <span className="me-2">+</span>Add Hotel
            </button>
          )}
        </div>

        <div className="row">
          {currentHotels.map((hotel) => (
            <div key={hotel.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.description}</p>
                  <p className="card-text"><strong>{hotel.price}</strong></p>

                  {role === "admin" && (
                    <>
                        <button className="btn btn-warning me-2" onClick={() => navigate(`/update_hotel/${hotel.id}`)}>
                        Update Hotel
                        </button>

                        <button className="btn btn-danger">Delete Hotel</button>
                    </>
                  )}
                  {role === "user" && (
                    <>
                     <button className="btn btn-warning me-2" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                     View
                     </button>

                      <button className="btn btn-primary">Book</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between">
          <button onClick={handlePrev} className="btn btn-secondary" disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNext} className="btn btn-secondary" disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HotelComponent;
