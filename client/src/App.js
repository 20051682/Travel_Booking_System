import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/Auth/RegisterForm';
import LoginForm from './Components/Auth/LoginForm';
import HomePage from './Components/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import BookingForm from './Components/Booking/BookingForm';
import NotFound from './Components/NotFound'; 
import HotelPage from './Components/Hotels/HotelComponent';
import AddHotel from './Components/Hotels/AddHotelComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/bookings"
          element={
            <PrivateRoute>
              <BookingForm />
            </PrivateRoute>
          }
        />
        <Route path="/hotels"
          element={
            <PrivateRoute>
              <HotelPage />
            </PrivateRoute>
          }
        />
        <Route path="/add_hotel"
          element={
            <PrivateRoute>
              <AddHotel />
            </PrivateRoute>
          }
        />
        {/* 404 error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
