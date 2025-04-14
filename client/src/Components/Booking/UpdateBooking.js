import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById, submitBookingForm } from "../../Controllers/bookingController";
import { Button, Form, Spinner } from "react-bootstrap";
import Swal from 'sweetalert2';
import NavBar from "../NavBar";

const UpdateBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    username: '',
    email: '',
    location_from: '',
    location_to: '',
    start_date: '',
    end_date: '',
    passengers: 1,
    trip_type: 'oneway',
    mode: 'bus',
    total_price: 0.00,
    payment_status: 'pending',
    booking_status: 'pending',
    status: 'pending',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBookingById(bookingId);
      if (data) {
        setBooking(data);
        setFormData({
            user_id: data.user_id,
            username: data.username,
            email: data.email,
            location_from: data.location_from,
            location_to: data.location_to,
            start_date: data.start_date,
            end_date: data.end_date || '',
            passengers: data.passengers,
            trip_type: data.trip_type,
            mode: data.mode,
            total_price: data.total_price,
            payment_status: data.payment_status,
            booking_status: data.booking_status,
            status: data.status,
        });
      }
      setLoading(false);
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBooking = await submitBookingForm(bookingId, formData);
      if (updatedBooking) {
        Swal.fire({
          icon: 'success',
          title: 'Booking updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
        navigate(`/booking/${bookingId}`);
      }
    } catch (err) {
      console.error('Error updating booking:', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating booking! Please try again.'
      });
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (!booking) return <p className="text-center text-danger mt-4">Booking not found.</p>;

  return (
    <>
      <NavBar />
      <Form onSubmit={handleSubmit} className="p-4 mt-5 shadow-sm rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-3">Update Booking</h4>

        <Form.Group className="mb-3">
          <Form.Label>Location From</Form.Label>
          <Form.Control
            type="text"
            name="location_from"
            value={formData.location_from}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location To</Form.Label>
          <Form.Control
            type="text"
            name="location_to"
            value={formData.location_to}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Date (Only for Round Trip)</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Passengers</Form.Label>
          <Form.Control
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trip Type</Form.Label>
          <Form.Select
            name="trip_type"
            value={formData.trip_type}
            onChange={handleChange}
            required
          >
            <option value="oneway">One Way</option>
            <option value="round">Round Trip</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mode</Form.Label>
          <Form.Select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            <option value="bus">Bus</option>
            <option value="car">Car</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">Update Booking</Button>
      </Form>
    </>
  );
};

export default UpdateBooking;
