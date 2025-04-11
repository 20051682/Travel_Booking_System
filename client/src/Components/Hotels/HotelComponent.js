import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import '../../styles/Hotels.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const HotelComponent = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    // Fetch hotel data
    axios.get('http://localhost:8000/hotels/')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        Swal.fire('Error', 'Failed to load hotels', 'error');
      });
  }, []);

  // Pagination logic
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels
  .filter(hotel => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .slice(indexOfFirstHotel, indexOfLastHotel);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAddHotel = () => {
    navigate('/add_hotel');
  };

  const handleViewHotel = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleDeleteHotel = (hotelId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/hotel/${hotelId}`)
          .then(() => {
            setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelId));
            Swal.fire('Deleted!', 'Hotel has been deleted.', 'success');
          })
          .catch((error) => {
            console.error("Error deleting hotel:", error);
            Swal.fire('Error', 'Failed to delete hotel', 'error');
          });
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">      
        <div className="mb-4" style={{ width:"30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search hotels by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
            <div key={hotel._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={hotel.image_url}
                  className="card-img-top"
                  alt={hotel.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.location}</p>
                  <p className="card-text">
                    <strong>Single:</strong> €{hotel.price_per_single_room} <br />
                    <strong>Double:</strong> €{hotel.price_per_double_room} <br />
                    <strong>Large:</strong> €{hotel.price_per_large_room}
                  </p>
                  <div className="mt-auto">
                    {role === "admin" && (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => navigate(`/update_hotel/${hotel._id}`)}
                        >
                          Update Hotel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeleteHotel(hotel._id)}>Delete Hotel</button>
                      </>
                    )}
                    {role === "user" && (
                      <button className="btn btn-primary" onClick={() => handleViewHotel(hotel._id)}>
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-between mt-4">
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
