import React from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();

  const goToOrder = () => {
    history.push('/siparis');
  };

  return (
    <div className="homepage">
      <header className="header">
        <img src="/images/iteration-1-images/logo.svg" alt="Logo" className="logo" />
      </header>

      <main className="hero">
        <div className="hero-text">
          <h2 className="hero-title">
            KOD ACIKTIRIR<br />
            PİZZA, DOYURUR
          </h2>
          <button onClick={goToOrder} className="order-btn">
            ACIKTIM
          </button>
        </div>
        
        <div className="pizza-section">
          <img 
            src="/images/iteration-1-images/home-banner.png" 
            alt="Pizza" 
            className="main-pizza" 
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;