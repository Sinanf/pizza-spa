import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { asset } from '../utils/asset';

function HomePage() {
  const navigate = useNavigate();

  const goToOrder = () => {
    navigate('/siparis');
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <img src={asset('images/iteration-1-images/logo.svg')} alt="Logo" className="logo" />
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-text">
          <p className="hero-subtitle">fırsatı kaçırma</p>
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
            src={asset('images/iteration-1-images/home-banner.png')} 
            alt="Pizza" 
            className="main-pizza" 
          />
        </div>
      </main>

      {/* Menu Categories */}
      <section className="menu-categories">
        <div className="category-nav">
          <div className="category-item active">
            <img src="/images/iteration-2-images/icons/1.svg" alt="YENİ! Kore" />
            <span>YENİ! Kore</span>
          </div>
          <div className="category-item">
            <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
            <span>Pizza</span>
          </div>
          <div className="category-item">
            <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
            <span>Burger</span>
          </div>
          <div className="category-item">
            <img src="/images/iteration-2-images/icons/4.svg" alt="Kızartmalar" />
            <span>Kızartmalar</span>
          </div>
          <div className="category-item">
            <img src="/images/iteration-2-images/icons/5.svg" alt="Fast food" />
            <span>Fast food</span>
          </div>
          <div className="category-item">
            <img src="/images/iteration-2-images/icons/6.svg" alt="Gazlı İçecek" />
            <span>Gazlı İçecek</span>
          </div>
        </div>
      </section>

      {/* CTA Cards Section */}
      <section className="cta-section">
        <div className="cta-cards">
          <div className="cta-card cta-card-large">
            <div className="cta-content">
              <h3>Özel <br />Lezzetus</h3>
              <p>Position: Absolute Acı Burger</p>
              <button className="cta-btn">SİPARİŞ VER</button>
            </div>
            <img src="/images/iteration-2-images/cta/kart-1.png" alt="Özel Burger" />
          </div>
          
          <div className="cta-cards-right">
            <div className="cta-card cta-card-dark">
              <div className="cta-content">
                <h3>Hackathlon <br /> Burger Menü</h3>
                <button className="cta-btn">SİPARİŞ VER</button>
              </div>
              <img src="/images/iteration-2-images/cta/kart-2.png" alt="Hackathlon Burger" />
            </div>
            
            <div className="cta-card cta-card-light">
              <div className="cta-content">
                <h3>Çooooook hızlı <br/> npm gibi kurye</h3>
                <button className="cta-btn">SİPARİŞ VER</button>
              </div>
              <img src="/images/iteration-2-images/cta/kart-3.png" alt="Hızlı Kurye" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <p className="products-subtitle">en çok paketlenen menüler</p>
        <h2 className="products-title">Acıktıran Kodlara Doyuran Lezzetler</h2>
        
        <div className="products-nav">
          <div className="product-category active">
            <img src="/images/iteration-2-images/icons/1.svg" alt="Ramen" />
            <span>Ramen</span>
          </div>
          <div className="product-category">
            <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
            <span>Pizza</span>
          </div>
          <div className="product-category">
            <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
            <span>Burger</span>
          </div>
          <div className="product-category">
            <img src="/images/iteration-2-images/icons/4.svg" alt="French fries" />
            <span>French fries</span>
          </div>
          <div className="product-category">
            <img src="/images/iteration-2-images/icons/5.svg" alt="Fast food" />
            <span>Fast food</span>
          </div>
          <div className="product-category">
            <img src="/images/iteration-2-images/icons/6.svg" alt="Soft drinks" />
            <span>Soft drinks</span>
          </div>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <img src="/images/iteration-2-images/pictures/food-1.png" alt="Terminal Pizza" />
            <h4>Terminal Pizza</h4>
            <div className="product-info">
              <span className="rating">4.9</span>
              <span className="reviews">(200)</span>
              <span className="price">60₺</span>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/iteration-2-images/pictures/food-2.png" alt="Position Absolute Acı Pizza" />
            <h4>Position Absolute Acı Pizza</h4>
            <div className="product-info">
              <span className="rating">4.9</span>
              <span className="reviews">(928)</span>
              <span className="price">85₺</span>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/iteration-2-images/pictures/food-3.png" alt="useEffect Tavuklu Burger" />
            <h4>useEffect Tavuklu Burger</h4>
            <div className="product-info">
              <span className="rating">4.9</span>
              <span className="reviews">(462)</span>
              <span className="price">75₺</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Logo" className="footer-logo" />
            <div className="footer-info">
              <p><img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Address" /> 341 Londonderry Road, Istanbul Türkiye</p>
              <p><img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Email" /> aciktim@teknolojikyemekler.com</p>
              <p><img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Phone" /> +90 216 123 45 67</p>
            </div>
          </div>
          
          <div className="footer-center">
            <h4>Sıcacık Menüler</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
          
          <div className="footer-right">
            <h4>Instagram</h4>
            <div className="instagram-grid">
              <img src="/images/iteration-2-images/footer/insta/li-0.png" alt="Instagram 1" />
              <img src="/images/iteration-2-images/footer/insta/li-1.png" alt="Instagram 2" />
              <img src="/images/iteration-2-images/footer/insta/li-2.png" alt="Instagram 3" />
              <img src="/images/iteration-2-images/footer/insta/li-3.png" alt="Instagram 4" />
              <img src="/images/iteration-2-images/footer/insta/li-4.png" alt="Instagram 5" />
              <img src="/images/iteration-2-images/footer/insta/li-5.png" alt="Instagram 6" />
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 Teknolojik Yemekler.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
