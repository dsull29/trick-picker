// index.js (already provided by you, looks good)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You might have global styles here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);