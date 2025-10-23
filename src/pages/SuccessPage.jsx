import React from 'react';
import './SuccessPage.css';
import { asset } from '../utils/asset';

function SuccessPage({ orderData }) {
  const sizeMap = {
    S: 'Küçük',
    M: 'Orta',
    L: 'Büyük',
  };

  const hamurMap = {
    ince: 'İnce',
    normal: 'Normal',
    kalin: 'Kalın',
  };

  return (
    <div className="success-page">
      {/* Header */}
      <header className="success-header">
        <img src={asset('images/iteration-1-images/logo.svg')} alt="Teknolojik Yemekler" className="logo" />
      </header>

      {/* Success Content */}
      <main className="success-main">
        <div className="success-content">
          <p className="delivery-text">lezzetin yolda</p>
          <h2 className="success-title">SİPARİŞİNİZ ALINDI</h2>
          <hr className="success-divider" />

          {orderData ? (
            <>
              <h3 className="pizza-name">Position Absolute Aç Pizza</h3>
              <div className="order-details">
                <div className="detail-line">
                  <span className="detail-label">Boyut:</span>
                  {sizeMap[orderData.boyut] || orderData.boyut}
                </div>
                <div className="detail-line">
                  <span className="detail-label">Hamur:</span>
                  {hamurMap[orderData.hamur] || orderData.hamur}
                </div>
                <div className="detail-line">
                  <span className="detail-label">Ek Malzemeler:</span>
                  <div className="ingredients-list">
                    {orderData.malzemeler && orderData.malzemeler.length > 0
                      ? orderData.malzemeler.map((malzeme, index) => (
                          <span key={index} className="ingredient-item">
                            {malzeme}
                            {index < orderData.malzemeler.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      : 'Yok'}
                  </div>
                </div>
              </div>

              <div className="order-summary-box">
                <h4 className="summary-title">Sipariş Toplamı</h4>
                <div className="summary-details">
                  <div className="summary-line">
                    <span>Seçimler</span>
                    <span>₺{((orderData.malzemeler?.length || 0) * 5).toFixed(2)}</span>
                  </div>
                  <div className="summary-line total-line">
                    <span>Toplam</span>
                    <span>₺{orderData.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-order-data">
              <p>Sipariş bilgileri bulunamadı.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SuccessPage;

