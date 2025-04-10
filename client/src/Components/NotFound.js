import React from 'react';
import NavBar from './NavBar';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <>
        <NavBar />
        <div className="text-center notfound-margin">
        <h1 className="display-4">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        </div>
    </>

  );
};

export default NotFound;
