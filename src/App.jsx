// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrderPage from './components/OrderPage';
import SuccessPage from './components/SuccessPage';
import './App.css';

function App() {
  // IT2 için state lifting yapacağız
  const [orderData, setOrderData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/siparis" 
            render={() => <OrderPage setOrderData={setOrderData} />} 
          />
          <Route path="/onay" 
            render={() => <SuccessPage orderData={orderData} />} 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;