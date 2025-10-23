import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../pages/OrderPage.css';

function OrderPage({ setOrderData }) {
  const history = useHistory();

  // Form State
  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    ozelNotlar: '',
    adet: 1
  });

  // Error State
  const [errors, setErrors] = useState({});
  
  // Error handling states 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Malzeme listesi
  const malzemeler = [
    'Pepperoni', 'Domates', 'Biber', 'Sosis', 'Mısır', 'Sucuk',
    'Kanadali Jambon', 'Tavuk Izgara', 'Soğan', 'Ananas',
    'Jalapeno', 'Kabak', 'Sarımsak'
  ];

  // Input değişiklik handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Radio button seçimi için class güncellemesi
    if (name === 'boyut') {
      
      document.querySelectorAll('.radio-label').forEach(label => {
        label.classList.remove('selected');
      });
      
      e.target.closest('.radio-label').classList.add('selected');
    }

    validateField(name, value);
  };

  // Malzeme checkbox handler
  const handleMalzemeChange = (malzeme) => {
    setFormData(prev => {
      const yeniMalzemeler = prev.malzemeler.includes(malzeme)
        ? prev.malzemeler.filter(m => m !== malzeme)
        : [...prev.malzemeler, malzeme];

      if (yeniMalzemeler.length <= 10) {
        validateField('malzemeler', yeniMalzemeler);
        return { ...prev, malzemeler: yeniMalzemeler };
      }
      return prev;
    });
  };

  // Adet değiştirme
  const handleAdetChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      adet: Math.max(1, prev.adet + delta)
    }));
  };

  // Field validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'isim':
        if (value.length < 3) {
          newErrors.isim = 'İsim en az 3 karakter olmalıdır';
        } else {
          delete newErrors.isim;
        }
        break;
      case 'boyut':
        if (!value) {
          newErrors.boyut = 'Pizza boyutu seçiniz';
        } else {
          delete newErrors.boyut;
        }
        break;
        case 'hamur':                   
      if (!value) {
        newErrors.hamur = 'Hamur kalınlığı seçiniz';
      } else {
        delete newErrors.hamur;
      }
      break;
      case 'malzemeler':
        if (value.length < 4) {
          newErrors.malzemeler = 'En az 4 malzeme seçiniz';
        } else if (value.length > 10) {
          newErrors.malzemeler = 'En fazla 10 malzeme seçebilirsiniz';
        } else {
          delete newErrors.malzemeler;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Form geçerliliği kontrolü
  const isFormValid = () => {
    return formData.isim.length >= 3 &&
      formData.boyut &&
      formData.hamur &&
      formData.malzemeler.length >= 4 &&
      formData.malzemeler.length <= 10 &&
      Object.keys(errors).length === 0;
  };

  // Fiyat hesaplama
  const calculatePrice = () => {
    const basePrice = 85.50;
    const extraIngredientPrice = formData.malzemeler.length * 5;
    return (basePrice + extraIngredientPrice) * formData.adet;
  };

  // Form submit - AXIOS REQRES.IN ENTEGRASYONu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsSubmitting(true);
    setSubmitError(''); 

    try {
      const orderData = {
        ...formData,
        totalPrice: calculatePrice(),
        timestamp: new Date().toISOString()
      };

      // REQRES.IN API KEY İLE 
      const response = await axios.post('https://reqres.in/api/pizza', orderData, {
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json'
        }
      });
      
      // Console'a yazdır (IT1 gereksinimi)
      console.log('Sipariş Yanıtı:', response.data);
      console.log('Form Verileri:', orderData);

      // State lifting ile API response'unu üst componente gönder
      setOrderData(response.data);

      // Başarı sayfasına yönlendir
      history.push('/onay');

    } catch (error) {
      console.error('Sipariş hatası:', error);
      
      // Gerçek API hatalarını yakala
      if (error.response?.status === 401) {
        setSubmitError('API anahtarı hatası. Lütfen tekrar deneyin.');
      } else if (error.response?.status === 404) {
        setSubmitError('API endpoint bulunamadı. Lütfen tekrar deneyin.');
      } else if (!error.response) {
        setSubmitError('İnternet bağlantınızı kontrol edin ve tekrar deneyin.');
      } else if (error.response?.status >= 500) {
        setSubmitError('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
      } else {
        setSubmitError('Sipariş gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="order-page">
      {/* Header */}
      <header className="order-header">
        <img src="\images\iteration-1-images\logo.svg" alt="Logo" className="logo" />
        <nav className="breadcrumb">
          Anasayfa - Seçenekler - <strong>Sipariş Oluştur</strong>
        </nav>
      </header>

      {/* Main Content */}
      <main className="order-main">
        {/* Pizza Info */}
        <section className="pizza-info">
          <section className="pizza-hero">
            <img
              src="\images\iteration-2-images\pictures\form-banner.png"
              alt="Position Absolute Acı Pizza"
              className="pizza-image"
            />
          </section>
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizza-details">
            <span className="price">85.50₺</span>
            <div className="rating">
              <div className="stars">
                ★★★★★
              </div>
              <span>4.9</span>
              <span>(200)</span>
            </div>
          </div>
          <p className="pizza-description">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
            Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha
            sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
            genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pizza-form">
          {/* Error Notification - YENİ EKLENEN */}
          {submitError && (
            <div className="error-notification">
              <div className="error-content">
                <span className="error-icon">⚠️</span>
                <p className="error-message">{submitError}</p>
                <button 
                  type="button"
                  onClick={() => setSubmitError('')} 
                  className="close-error"
                  aria-label="Hatayı kapat"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="form-row">
            {/* Boyut Seçimi */}
            <div className="form-group">
              <label>Boyut Seç *</label>
              <div className="radio-group">
                {['S', 'M', 'L'].map(boyut => (
                  <label key={boyut} className="radio-label">
                    <input
                      type="radio"
                      name="boyut"
                      value={boyut}
                      checked={formData.boyut === boyut}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    {boyut}
                  </label>
                ))}
              </div>
              {errors.boyut && <span className="error">{errors.boyut}</span>}
            </div>

            {/* Hamur Seçimi */}
            <div className="form-group">
              <label htmlFor="hamur">Hamur Seç *</label>
              <select
                id="hamur"
                name="hamur"
                value={formData.hamur}
                onChange={handleInputChange}
                className={`hamur-select ${formData.hamur ? 'selected' : ''}`}
              >
                <option value="">Hamur Kalınlığı</option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
                <option value="kalin">Kalın</option>
              </select>
            </div>
          </div>

          {/* Malzemeler */}
          <div className="form-group">
            <label>Ek Malzemeler</label>
            <p className="malzeme-info">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="checkbox-grid">
              {malzemeler.map(malzeme => (
                <label key={malzeme} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.malzemeler.includes(malzeme)}
                    onChange={() => handleMalzemeChange(malzeme)}
                  />
                  <span className="checkbox-custom"></span>
                  {malzeme}
                </label>
              ))}
            </div>
            {errors.malzemeler && <span className="error">{errors.malzemeler}</span>}
          </div>

          {/* İsim */}
          <div className="form-group">
            <label htmlFor="isim">İsim Soyisim</label>
            <input
              type="text"
              id="isim"
              name="isim"
              value={formData.isim}
              onChange={handleInputChange}
              placeholder="İsminizi giriniz"
              className="name-input"
            />
            {errors.isim && <span className="error">{errors.isim}</span>}
          </div>

          {/* Notlar */}
          <div className="form-group">
            <label htmlFor="ozelNotlar">Sipariş Notu</label>
            <textarea
              id="ozelNotlar"
              name="ozelNotlar"
              value={formData.ozelNotlar}
              onChange={handleInputChange}
              placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
              className="order-note"
              rows="3"
            />
          </div>

          {/* Alt Kısım - Adet ve Toplam */}
          <div className="order-bottom">
            <div className="quantity-section">
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleAdetChange(-1)}
                disabled={isSubmitting}
              >
                -
              </button>
              <span className="quantity">{formData.adet}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleAdetChange(1)}
                disabled={isSubmitting}
              >
                +
              </button>
            </div>

            <div className="order-summary">
              <h3>Sipariş Toplamı</h3>
              <div className="summary-line">
                <span>Seçimler</span>
                <span>{(formData.malzemeler.length * 5).toFixed(2)}₺</span>
              </div>
              <div className="summary-line total">
                <span>Toplam</span>
                <span>{calculatePrice().toFixed(2)}₺</span>
              </div>
            </div>
          </div>

          {/* Submit Button - GÜNCELLENDİ */}
          <button
            type="submit"
            className={`submit-btn ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="\images\iteration-2-images\footer\logo-footer.svg" alt="Logo" className="footer-logo" />
            <div className="footer-info">
              <p><img src="\images\iteration-2-images\footer\icons\icon-1.png" alt="Address" /> 341 Londonderry Road, Istanbul Türkiye</p>
              <p><img src="\images\iteration-2-images\footer\icons\icon-2.png" alt="Email" /> aciktim@teknolojikyemekler.com</p>
              <p><img src="\images\iteration-2-images\footer\icons\icon-3.png" alt="Phone" /> +90 216 123 45 67</p>
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
              <img src="\images\iteration-2-images\footer\insta\li-0.png" alt="Instagram 1" />
              <img src="\images\iteration-2-images\footer\insta\li-1.png" alt="Instagram 2" />
              <img src="\images\iteration-2-images\footer\insta\li-2.png" alt="Instagram 3" />
              <img src="\images\iteration-2-images\footer\insta\li-3.png" alt="Instagram 4" />
              <img src="\images\iteration-2-images\footer\insta\li-4.png" alt="Instagram 5" />
              <img src="\images\iteration-2-images\footer\insta\li-5.png" alt="Instagram 6" />
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

export default OrderPage;