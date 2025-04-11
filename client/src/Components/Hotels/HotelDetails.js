// HotelDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar'; // Import NavBar component

const HotelDetails = () => {
//   const { hotelId } = useParams(); // Get the hotelId from the URL
  const hotelId = 2;
  console.log("hotel cheeeeeck",hotelId);
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  const getRatingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating); // 5-star rating system
  };

  useEffect(() => {
    // Mock hotel data
    const hotelData = [
      { id: 1, name: "Hotel Paradise", description: "A luxurious hotel with amazing views", price: "$150/night", image: "https://via.placeholder.com/300x200?text=Hotel+1", rating: 4, detailedDescription: "This is a luxurious hotel with the best views of the city. Offering top-notch amenities and a great location for tourists." },
      { id: 2, name: "Ocean Breeze Resort", description: "Relax by the beach with top-tier amenities", price: "$200/night", image: "https://via.placeholder.com/300x200?text=Hotel+2", rating: 5, detailedDescription: "This resort offers a relaxing escape right by the beach, with excellent dining, spas, and beach views." },
      { id: 3, name: "Mountain Escape", description: "Escape to the mountains for a peaceful stay", price: "$180/night", image: "https://via.placeholder.com/300x200?text=Hotel+3", rating: 3, detailedDescription: "Situated in the mountains, this hotel offers a serene escape with great hiking trails and breathtaking views." },
      { id: 4, name: "Luxury Inn", description: "A 5-star experience in the heart of the city", price: "$220/night", image: "https://via.placeholder.com/300x200?text=Hotel+4", rating: 5, detailedDescription: "This 5-star hotel is located in the heart of the city, offering luxury accommodations with all the finest amenities." },
      { id: 5, name: "Desert Oasis", description: "Stay in the middle of the desert with all the comforts", price: "$160/night", image: "https://via.placeholder.com/300x200?text=Hotel+5", rating: 4, detailedDescription: "An oasis in the desert, providing a unique and luxurious stay with stunning desert views and a tranquil environment." },
      { id: 6, name: "City Lights Hotel", description: "A hotel in the city center with a stunning skyline view", price: "$250/night", image: "https://via.placeholder.com/300x200?text=Hotel+6", rating: 4, detailedDescription: "Located in the heart of the city, City Lights Hotel offers a beautiful skyline view with modern amenities." },
      { id: 7, name: "Seaside Retreat", description: "Wake up to the sound of the waves and a beautiful sunrise", price: "$170/night", image: "https://via.placeholder.com/300x200?text=Hotel+7", rating: 5, detailedDescription: "This hotel provides an unforgettable seaside experience, perfect for those looking for relaxation by the beach." },
      { id: 8, name: "Forest Lodge", description: "Stay surrounded by nature and tranquility", price: "$140/night", image: "https://via.placeholder.com/300x200?text=Hotel+8", rating: 3, detailedDescription: "Nestled in a forest, this lodge offers a peaceful retreat away from the hustle and bustle of the city." },
      { id: 9, name: "Island Getaway", description: "Your private island paradise awaits", price: "$300/night", image: "https://via.placeholder.com/300x200?text=Hotel+9", rating: 5, detailedDescription: "An exclusive island resort offering privacy, luxury, and pristine beaches." },
      { id: 10, name: "Urban Stay", description: "Convenience and luxury in the heart of the city", price: "$210/night", image: "https://via.placeholder.com/300x200?text=Hotel+10", rating: 4, detailedDescription: "Located in the bustling heart of the city, Urban Stay offers modern accommodations and luxury amenities." },
      { id: 11, name: "Countryside Retreat", description: "A peaceful stay in the heart of the countryside", price: "$190/night", image: "https://via.placeholder.com/300x200?text=Hotel+11", rating: 4, detailedDescription: "Escape to the countryside for a tranquil stay, surrounded by nature and beauty." },
      { id: 12, name: "Luxury Palace", description: "Stay like royalty in our luxurious rooms", price: "$350/night", image: "https://via.placeholder.com/300x200?text=Hotel+12", rating: 5, detailedDescription: "Luxury Palace offers royal accommodations with lavish rooms, private services, and the best amenities." },
    ];

    // Find the hotel by ID from the hotelData array
    const foundHotel = hotelData.find((h) => h.id === parseInt(hotelId));

    if (foundHotel) {
      setHotel(foundHotel); // Set the hotel data if found
    } else {
      console.log('Hotel not found');
    }
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>; // Loading state if hotel data is not yet fetched
  }

  return (
    <>
        <NavBar />
        <div className="container mt-5">
        <div className="card mb-4">
            <img src={hotel.image} className="card-img-top" alt={hotel.name} />
            <div className="card-body">
            <h3>{hotel.name}</h3>
            <p>{hotel.detailedDescription}</p> {/* Detailed description */}
            <p><strong>{hotel.price}</strong></p>
            <p><strong>Rating: </strong>{getRatingStars(hotel.rating)}</p> {/* Display rating stars */}
            <button className="btn btn-primary">Book Now</button>
            </div>
        </div>
        <button onClick={() => navigate('hotels')} className="btn btn-secondary">Back to Listings</button>
        </div>
    </>

  );
};

export default HotelDetails;

