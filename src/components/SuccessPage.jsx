import React from 'react';
import '../pages/SuccessPage.css';

function SuccessPage({ orderData }) {
  return (
    <div className="success-page">
      {/* Header */}
      <header className="success-header">
        <img src="/images/iteration-1-images/logo.svg" alt="Logo" className="logo" />
      </header>

      {/* Success Content */}
      <main className="success-main">
        <div className="success-content">
          <h2 className="success-title">TEBRİKLER!</h2>
          <h3 className="success-subtitle">SİPARİŞİNİZ ALINDI!</h3>
          
          {orderData && (
            <div className="order-info">
              <p>Sipariş No: <strong>{orderData.id}</strong></p>
              <p>Toplam Tutar: <strong>{orderData.totalPrice?.toFixed(2)}₺</strong></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SuccessPage;