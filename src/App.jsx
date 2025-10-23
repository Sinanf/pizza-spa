// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrderPage from './components/OrderPage';
import SuccessPage from './components/SuccessPage';
import './App.css';

function App() {
  
  const [orderData, setOrderData] = useState(null);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/siparis" element={<OrderPage setOrderData={setOrderData} />} />
          <Route path="/onay" element={<SuccessPage orderData={orderData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
