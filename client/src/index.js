import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root div from HTML
root.render(
  <React.StrictMode> {/* Strict mode for highlighting potential problems */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
