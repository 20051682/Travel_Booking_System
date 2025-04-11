// HotelDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetails = () => {
  const { hotelId } = useParams(); // Get the hotelId from the URL
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  const getRatingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating); // 5-star rating system
  };

  useEffect(() => {
    const hotelData = [
        { id: 1, name: "Hotel Paradise", description: "A luxurious hotel with amazing views", price: "$150/night", image: "https://via.placeholder.com/300x200?text=Hotel+1" },
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

    const foundHotel = hotelData.find((h) => h.id === parseInt(hotelId));
    setHotel(foundHotel);
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>; // Loading state if hotel data is not yet fetched
  }

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <img src={hotel.image} className="card-img-top" alt={hotel.name} />
        <div className="card-body">
          <h3>{hotel.name}</h3>
          <p>{hotel.detailedDescription}</p>
          <p><strong>{hotel.price}</strong></p>
          <p><strong>Rating: </strong>{getRatingStars(hotel.rating)}</p>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="btn btn-secondary">Back to Listings</button>
    </div>
  );
};

export default HotelDetails;
