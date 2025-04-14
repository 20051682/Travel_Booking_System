import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PaymentPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const [booking, setBooking] = useState(null);
  const [cardInfo, setCardInfo] = useState({ number: '', month: '', cvv: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = location.state?.booking_id;

  useEffect(() => {
    if (bookingId) {
      axios.get(`http://localhost:8000/booking/${bookingId}`).then((res) => {
        setBooking(res.data);
      });
    }
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handlePayment = async () => {
    try {
      await axios.put(`http://localhost:8000/booking/${bookingId}/pay`);
      Swal.fire('Payment Successful!', 'Thank you for booking.', 'success');
      navigate('/bookings');
    } catch (err) {
      Swal.fire('Error', 'Payment failed.', 'error');
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="payment-container mt-5">
      <h2>Payment Details</h2>
      <div className="booking-info">
        <p><strong>From:</strong> {booking.location_from}</p>
        <p><strong>To:</strong> {booking.location_to}</p>
        <p><strong>Trip Type:</strong> {booking.trip_type}</p>
        <p><strong>Start Date:</strong> {booking.start_date}</p>
        {booking.end_date && <p><strong>End Date:</strong> {booking.end_date}</p>}
        <p><strong>Mode:</strong> {booking.mode}</p>
        <p><strong>Passengers:</strong> {booking.passengers}</p>
        <p><strong>Distance:</strong> {booking.distance_km} km</p>
        <p><strong>Duration:</strong> {booking.duration_min} min</p>
        <p><strong>Total Price:</strong> €{booking.total_price}</p>
      </div>

      <h3>Card Information</h3>
      <input type="text" name="number" placeholder="Card Number" value={cardInfo.number} onChange={handleChange} />
      <input type="text" name="month" placeholder="MM/YY" value={cardInfo.month} onChange={handleChange} />
      <input type="text" name="cvv" placeholder="CVV" value={cardInfo.cvv} onChange={handleChange} />

      <div className="button-group">
        <button onClick={handlePayment}>Pay Now</button>
        <button onClick={() => navigate('/bookings')}>Do it Later</button>
      </div>
    </div>
  );
};

export default PaymentPage;
