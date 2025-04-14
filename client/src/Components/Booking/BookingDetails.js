import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { getBookingById, cancelBooking } from "../../Controllers/bookingController";
import Swal from 'sweetalert2';
import NavBar from "../NavBar";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBookingById(bookingId);
      setBooking(data);
      setLoading(false);
    };

    fetchBooking();
  }, [bookingId]);

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingId);

      Swal.fire({
        icon: 'success',
        title: 'Booking cancled successfully!',
        text: 'Thank you!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/bookings");
    } catch (err) {
      console.error("Cancel failed", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error canceling booking! Please try again!',
      });

    }
  };

  const handleUpdate = () => {
    navigate(`/booking/${bookingId}/update`);
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (!booking) return <p className="text-center text-danger mt-4">Booking not found.</p>;

  return (
    <>
        <NavBar/>
        <Card className="p-4 mt-5 shadow-sm rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
            <h4 className="mb-3">Booking Details</h4>
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>User:</strong> {booking.username}</p>
            <p><strong>From:</strong> {booking.location_from}</p>
            <p><strong>To:</strong> {booking.location_to}</p>
            <p><strong>Passengers:</strong> {booking.passengers}</p>
            <p><strong>Mode:</strong> {booking.mode}</p>
            <p><strong>Start:</strong> {booking.start_date}</p>
            {booking.end_date && <p><strong>End:</strong> {booking.end_date}</p>}
            <p><strong>Payment Status:</strong> <span className={`badge ${booking.payment_status === 'paid' ? 'bg-success' : 'bg-danger'}`}>{booking.payment_status}</span></p>
            <p><strong>Booking Status:</strong> <span className={`badge ${booking.booking_status === 'confirmed' ? 'bg-primary' : 'bg-warning text-dark'}`}>{booking.booking_status}</span></p>

            <div className="d-flex justify-content-between mt-4">
                <Button variant="danger" onClick={handleCancel}>Cancel Booking</Button>
                <Button variant="outline-secondary" onClick={handleUpdate}>Update</Button>
            </div>
        </Card>
    </>
  );
};

export default BookingDetails;
