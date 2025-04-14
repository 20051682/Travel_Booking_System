import React, { useEffect, useState } from 'react';
import { bookingModel } from '../../Models/bookingModel';
import { submitBookingForm, getUserBookings, getAllBookings, deleteBooking, cancelBooking } from '../../Controllers/bookingController';
import '../../styles/BookingForm.css';
import NavBar from '../NavBar'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Card, Row, Col, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import { deleteDestination, fetchDestinations } from '../../Controllers/destinationController';

const BookingForm = () => {
  const [formData, setFormData] = useState(bookingModel);
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsModal, setBookingsModal] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [adminBookings, setAdminBookings] = useState([]);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const itemsPerPage = 6;
  const user_id = JSON.parse(localStorage.getItem("user_info")).id;
  const first_name = JSON.parse(localStorage.getItem("user_info")).first_name;
  const last_name = JSON.parse(localStorage.getItem("user_info")).last_name;
  const username = first_name + " " + last_name;
  const email = JSON.parse(localStorage.getItem("user_info")).email;
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole === "admin") {
      getAllBookings().then(setAdminBookings);
    }

    const getDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };

    getDestinations();
  }, []);

  const navigateToAddDestination = () => {
    navigate('/add_destination');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, user_id, username, email, [name]: value };
    const errors = { ...formErrors };
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (name === 'location_to' && value === formData.location_from) {
      errors.location_to = 'Destination cannot be the same as origin.';
    } else if (name === 'location_to') {
      delete errors.location_to;
    }
  
    if (name === 'start_date') {
      const startDate = new Date(value);
      startDate.setHours(0, 0, 0, 0);
      if (startDate < today) {
        errors.start_date = 'Start date cannot be in the past.';
      } else {
        delete errors.start_date;
      }
  
      // Also check end_date if it's already filled
      if (formData.end_date) {
        const endDate = new Date(formData.end_date);
        endDate.setHours(0, 0, 0, 0);
        if (endDate < startDate) {
          errors.end_date = 'End date cannot be before start date.';
        } else {
          delete errors.end_date;
        }
      }
    }
  
    if (name === 'end_date') {
      const endDate = new Date(value);
      endDate.setHours(0, 0, 0, 0);
      const startDate = new Date(updatedFormData.start_date);
      startDate.setHours(0, 0, 0, 0);
  
      if (endDate < today) {
        errors.end_date = 'End date cannot be in the past.';
      } else if (endDate < startDate) {
        errors.end_date = 'End date cannot be before start date.';
      } else {
        delete errors.end_date;
      }
    }
  
    if (name === 'trip_type' && value === 'round' && !formData.end_date) {
      errors.end_date = 'End date is required for round trips.';
    } else if (name === 'trip_type' && value === 'oneway') {
      delete errors.end_date; // if user switches back to one-way
      updatedFormData.end_date = '';
    }
  
    setFormErrors(errors);
    setFormData(updatedFormData);
  };
  
  const fetchUserBookings = async () => {
    const bookings = await getUserBookings(user_id);
    setUserBookings(bookings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startDate = new Date(formData.start_date);
    startDate.setHours(0, 0, 0, 0);
  
    if (!formData.start_date) {
      errors.start_date = 'Start date is required.';
    } else if (startDate < today) {
      errors.start_date = 'Start date cannot be in the past.';
    }
  
    if (formData.end_date) {
      const endDate = new Date(formData.end_date);
      endDate.setHours(0, 0, 0, 0);
      if (endDate < today) {
        errors.end_date = 'End date cannot be in the past.';
      } else if (endDate < startDate) {
        errors.end_date = 'End date cannot be before start date.';
      }
    }
  
    if (formData.trip_type === 'round' && !formData.end_date) {
      errors.end_date = 'End date is required for round trips.';
    }
  
    if (formData.location_from === formData.location_to) {
      errors.location_to = 'Destination cannot be the same as origin.';
    }
  
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      return;
    }

    const result = await submitBookingForm(formData);
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Booking submitted successfully!',
        text: 'Enjoy your travel!',
        timer: 2000,
        showConfirmButton: false,
      });
      setFormData(bookingModel);

      setTimeout(() => {
        navigate('/payment', { state: { booking_id: result.booking_id } });
      }, 2000);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error submitting booking! Please try again!',
      });

    }
  };

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (destinationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDestination(destinationId);
          const updatedData = await fetchDestinations();
          setDestinations(updatedData);
        } catch (error) {
          console.error("Failed to delete or refresh", error);
        }
      }
    });
  };
  
  const handleBookingDelete = async (bookingId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBooking(bookingId);
          const updatedData = await getAllBookings();
          setAdminBookings(updatedData);
          Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting booking:', error);
          Swal.fire('Error', 'Failed to delete booking', 'error');
        }
      }
    });
  };  

  // const handleCancel = async () => {
  //   try {
  //     await cancelBooking(bookingId);

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Booking cancled successfully!',
  //       text: 'Thank you!',
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     navigate("/bookings");
  //   } catch (err) {
  //     console.error("Cancel failed", err);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Error canceling booking! Please try again!',
  //     });

  //   }
  // };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <span className="badge bg-success">Paid</span>;
      case 'pending':
        return <span className="badge bg-warning">Unpaid</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getBookingBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'booked':
        return <span className="badge bg-primary">Booked</span>;
      case 'canceled':
        return <span className="badge bg-danger text-white">Cancelled</span>;
      case 'pending':
          return <span className="badge bg-warning text-white">Pending</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row>
          {role === "user" && (
            <Col md={6} className="mb-4">
              <h3>Book Your Trip</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Location From</Form.Label>
                  <Form.Select name="location_from" value={formData.location_from} onChange={handleChange} required>
                    <option value="">Select starting location</option>
                    {destinations.map((destination) => (
                      <option key={destination.name} value={destination.name}>
                        {destination.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Location To</Form.Label>
                  <Form.Select
                    name="location_to"
                    value={formData.location_to}
                    onChange={handleChange}
                    isInvalid={!!formErrors.location_to}
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((destination) => (
                      <option key={destination.name} value={destination.name}>
                        {destination.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.location_to}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    isInvalid={!!formErrors.start_date}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Date (Only for Round Trip)</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={formData.end_date || ''}
                    onChange={handleChange}
                    isInvalid={!!formErrors.end_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Passengers</Form.Label>
                  <Form.Control type="number" name="passengers" value={formData.passengers} onChange={handleChange} min="1" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Select name="trip_type" value={formData.trip_type} onChange={handleChange} required>
                    <option value="">Select trip type</option>
                    <option value="oneway">One Way</option>
                    <option value="round">Round Trip</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mode</Form.Label>
                  <Form.Select name="mode" value={formData.mode} onChange={handleChange} required>
                    <option value="">Select mode</option>
                    <option value="bus">Bus</option>
                    <option value="car">Car</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Submit Booking</Button>
                <Button variant="secondary" className="ms-3"
                  onClick={() => {
                    fetchUserBookings();
                    setBookingsModal(true);
                  }}
                >
                  My Bookings
                </Button>

              </Form>

            </Col>
          )}

          {role === "admin" && (
            <Col md={6} className="mb-4">
              <h3>User Bookings</h3>

              {adminBookings.length === 0 ? (
                <p>No bookings available.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Passengers</th>
                        <th>Type</th>
                        <th>Mode</th>
                        <th>Price</th>
                        <th>Payment Status</th>
                        <th>Booking Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminBookings.map((booking, index) => (
                        <tr key={booking._id}>
                          <td>{index + 1}</td>
                          <td>{booking.username}</td>
                          <td>{booking.location_from}</td>
                          <td>{booking.location_to}</td>
                          <td>{booking.start_date}</td>
                          <td>{booking.end_date || '-'}</td>
                          <td>{booking.passengers}</td>
                          <td>{booking.trip_type}</td>
                          <td>{booking.mode}</td>
                          <td>€{booking.total_price}</td>
                          <td>{getStatusBadge(booking.payment_status)}</td>
                          <td>{getBookingBadge(booking.booking_status)}</td>
                          <td>
                          {/* <Button variant="danger" onClick={handleCancel(booking._id)}>
                            Cancel Booking
                          </Button> */}
                          <Button variant="danger" onClick={() => handleBookingDelete(booking._id)}>
                            Delete
                          </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Col>
          )}

              {/* Destination  */}
          <Col md={6} className="mb-4">
          <Row className="align-items-center mb-3">
            <Col>
              <h4>Search Destination</h4>
            </Col>
            <Col className="text-end">
              {role === "admin" && (
                <Button variant="info"
                onClick={() => {
                  navigateToAddDestination();
                }}
                >Add Destination</Button>
              )}
            </Col>
          </Row>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Row className="flex-column">
              {paginatedDestinations.map((destination) => (
                <Col key={destination._id} className="mb-3">
                  <Card className="d-flex flex-row align-items-center">
                    <Card.Img
                      variant="left"
                      src={destination.image_url}
                      style={{ width: '150px', height: '100px', objectFit: 'cover', marginLeft: "1rem" }}
                    />

                    <Card.Body>
                      <Card.Title>{destination.name}</Card.Title>
                      <Card.Text>{destination.description}</Card.Text>
                      <Card.Text>
                        {destination.web_description.length > 50
                          ? `${destination.web_description.slice(0, 50)}...`
                          : destination.web_description}
                      </Card.Text>

                      {role === "user" && (
                        <Button
                          variant="info"
                          onClick={() => {
                            setSelectedDestination(destination);
                            setShowDestinationModal(true);
                          }}
                        >
                          View
                        </Button>

                      )}

                      {role === "admin" && (
                        <div className="d-flex gap-2">
                          <Button variant="warning" onClick={() => navigate(`/update_destination/${destination._id}`)}>
                            Update
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(destination._id)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>

                  </Card>
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="outline-secondary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setCurrentPage((prev) =>
                  prev * itemsPerPage < filteredDestinations.length ? prev + 1 : prev
                )}
                disabled={currentPage * itemsPerPage >= filteredDestinations.length}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>

        {/* show booking model */}
        <Modal show={bookingsModal} onHide={() => setBookingsModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>My Bookings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userBookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              <ul className="list-group">
                {userBookings.map((booking, index) => (
                  <li className="list-group-item d-flex flex-column gap-2" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>
                        {booking.location_from} → {booking.location_to}
                      </strong>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/booking/${booking._id}`)}
                      >
                        View
                      </Button>
                    </div>
                    <div>Mode: {booking.mode} | Passengers: {booking.passengers}</div>
                    <div>Date: {booking.start_date} {booking.end_date && `to ${booking.end_date}`}</div>
                    <div className="d-flex gap-2">
                      Payment: {getStatusBadge(booking.payment_status)}
                      Booking: {getBookingBadge(booking.booking_status)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setBookingsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
        {/* show destination view model */}
        <Modal show={showDestinationModal} onHide={() => setShowDestinationModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Destination Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDestination && (
              <>
                <img
                  src={selectedDestination.image_url}
                  alt={selectedDestination.name}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                />
                <h4>{selectedDestination.name}</h4>
                <p><strong>Description:</strong> {selectedDestination.description}</p>
                <p><strong>Website Description:</strong> {selectedDestination.web_description}</p>
                {/* Add more fields if needed */}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDestinationModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
};

export default BookingForm;
