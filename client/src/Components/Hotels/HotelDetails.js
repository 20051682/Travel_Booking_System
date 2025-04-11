// HotelDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';

const HotelDetails = () => {
  const { hotelId } = useParams();
  console.log("hotelId:",hotelId);
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  const getRatingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/hotel/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="card mb-4">
          <img src={hotel.image_url} className="card-img-top" alt={hotel.name} />
          <div className="card-body">
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>{hotel.description}</p>
            <p><strong>Single: €{hotel.price_per_single_room}</strong></p>
            <p><strong>Double: €{hotel.price_double_room}</strong></p>
            <p><strong>Large: €{hotel.price_per_large_room}</strong></p>
            <p><strong>Rating: </strong>{getRatingStars(4)}</p>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
        <button onClick={() => navigate('/hotels')} className="btn btn-secondary">Back to Listings</button>
      </div>
    </>
  );
};

export default HotelDetails;
