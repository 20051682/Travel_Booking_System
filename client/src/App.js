import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/Auth/RegisterForm';
import LoginForm from './Components/Auth/LoginForm';
import HomePage from './Components/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import BookingForm from './Components/Booking/BookingForm';
import NotFound from './Components/NotFound'; 
import HotelPage from './Components/Hotels/HotelComponent';
import AddHotelPage from './Components/Hotels/AddHotelPage';
import HotelDetails from './Components/Hotels/HotelDetails';
import Packages from './Components/Packages/Packages';
import UpdateHotelComponent from './Components/Hotels/UpdateHotelComponent';
import ProfilePage from './Components/User/UserProfileComponent';
import AddPackage from './Components/Packages/AddPackagePage';
import UpdateUserComponent from './Components/User/UpdateUserComponent';
import AddDestinationComponent from './Components/Booking/AddDestinationComponent';
import UpdateDestinationComponent from './Components/Booking/UpdateDestinationComponent'
import PaymentPage from './Components/Booking/PaymentPage';

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
              <AddHotelPage />
            </PrivateRoute>
          }
        />
        <Route path="/hotel/:hotelId"
          element={
            <PrivateRoute>
              <HotelDetails />
            </PrivateRoute>
          }
        /> 
        <Route path="/update_hotel/:hotelId"
         element={
          <PrivateRoute>
            <UpdateHotelComponent />
          </PrivateRoute>
         }
        />
        <Route path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        
         <Route path="/packages"
          element={
            <PrivateRoute>
              <Packages />
            </PrivateRoute>
          }
        />
        <Route path="/add_package"
          element={
            <PrivateRoute>
              <AddPackage />
            </PrivateRoute>
          }
        />
        <Route path="/edit_profile"
          element={
            <PrivateRoute>
              <UpdateUserComponent />
            </PrivateRoute>
          }
        />
        <Route path="/add_destination"
          element={
            <PrivateRoute>
              <AddDestinationComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/update_destination/:destinationId"
          element={
            <PrivateRoute>
              <UpdateDestinationComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentPage />
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
