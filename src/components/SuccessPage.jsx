import React from 'react';
import '../pages/SuccessPage.css'; // CSS import

function SuccessPage({ orderData }) {
  return (
    <div className="success-page">
      <h1>Sipariş Onaylandı</h1>
      <p>Başarı sayfası gelecek</p>
      {orderData && (
        <div>
          <p>Sipariş ID: {orderData.id}</p>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;