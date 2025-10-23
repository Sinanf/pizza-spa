import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';
import { asset } from '../utils/asset';

function OrderPage({ setOrderData }) {
  const navigate = useNavigate();

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
    'Pepperoni', 'Domates', 'Biber', 'Sosis', 'MÄ±sÄ±r', 'Sucuk',
    'Kanadali Jambon', 'Tavuk Izgara', 'SoÄŸan', 'Ananas',
    'Jalapeno', 'Kabak', 'SarÄ±msak'
  ];

  // Input deÄŸiÅŸiklik handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Radio button seÃ§imi iÃ§in class gÃ¼ncellemesi
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

  // Adet deÄŸiÅŸtirme
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
          newErrors.isim = 'Ä°sim en az 3 karakter olmalÄ±dÄ±r';
        } else {
          delete newErrors.isim;
        }
        break;
      case 'boyut':
        if (!value) {
          newErrors.boyut = 'Pizza boyutu seÃ§iniz';
        } else {
          delete newErrors.boyut;
        }
        break;
        case 'hamur':                   
      if (!value) {
        newErrors.hamur = 'Hamur kalÄ±nlÄ±ÄŸÄ± seÃ§iniz';
      } else {
        delete newErrors.hamur;
      }
      break;
      case 'malzemeler':
        if (value.length < 4) {
          newErrors.malzemeler = 'En az 4 malzeme seÃ§iniz';
        } else if (value.length > 10) {
          newErrors.malzemeler = 'En fazla 10 malzeme seÃ§ebilirsiniz';
        } else {
          delete newErrors.malzemeler;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Form geÃ§erliliÄŸi kontrolÃ¼
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

      // REQRES.IN API KEY Ä°LE 
      const response = await axios.post('https://reqres.in/api/pizza', orderData, {
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json'
        }
      });
      
      // Console'a yazdÄ±r (IT1 gereksinimi)
      console.log('SipariÅŸ YanÄ±tÄ±:', response.data);
      console.log('Form Verileri:', orderData);

      // State lifting ile API response'unu Ã¼st componente gÃ¶nder
      setOrderData(response.data);

      // BaÅŸarÄ± sayfasÄ±na yÃ¶nlendir
      navigate('/onay');

    } catch (error) {
      console.error('SipariÅŸ hatasÄ±:', error);
      
      // GerÃ§ek API hatalarÄ±nÄ± yakala
      if (error.response?.status === 401) {
        setSubmitError('API anahtarÄ± hatasÄ±. LÃ¼tfen tekrar deneyin.');
      } else if (error.response?.status === 404) {
        setSubmitError('API endpoint bulunamadÄ±. LÃ¼tfen tekrar deneyin.');
      } else if (!error.response) {
        setSubmitError('Ä°nternet baÄŸlantÄ±nÄ±zÄ± kontrol edin ve tekrar deneyin.');
      } else if (error.response?.status >= 500) {
        setSubmitError('Sunucu hatasÄ± oluÅŸtu. LÃ¼tfen daha sonra tekrar deneyin.');
      } else {
        setSubmitError('SipariÅŸ gÃ¶nderilirken bir hata oluÅŸtu. LÃ¼tfen tekrar deneyin.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="order-page">
      {/* Header */}
      <header className="order-header">
        <img src={asset('images/iteration-1-images/logo.svg')} alt="Logo" className="logo" />
        <nav className="breadcrumb">
          Anasayfa - SeÃ§enekler - <strong>SipariÅŸ OluÅŸtur</strong>
        </nav>
      </header>

      {/* Main Content */}
      <main className="order-main">
        {/* Pizza Info */}
        <section className="pizza-info">
          <section className="pizza-hero">
            <img
              src={asset('images/iteration-2-images/pictures/form-banner.png')}
              alt="Position Absolute AcÄ± Pizza"
              className="pizza-image"
            />
          </section>
          <h2>Position Absolute AcÄ± Pizza</h2>
          <div className="pizza-details">
            <span className="price">85.50â‚º</span>
            <div className="rating">
              <div className="stars">
                â˜…â˜…â˜…â˜…â˜…
              </div>
              <span>4.9</span>
              <span>(200)</span>
            </div>
          </div>
          <p className="pizza-description">
            Frontend Dev olarak hala position:absolute kullanÄ±yorsan bu Ã§ok acÄ± pizza tam sana gÃ¶re.
            Pizza, domates, peynir ve genellikle Ã§eÅŸitli diÄŸer malzemelerle kaplanmÄ±ÅŸ, daha
            sonra geleneksel olarak odun ateÅŸinde bir fÄ±rÄ±nda yÃ¼ksek sÄ±caklÄ±kta piÅŸirilen,
            genellikle yuvarlak, dÃ¼zleÅŸtirilmiÅŸ mayalÄ± buÄŸday bazlÄ± hamurdan oluÅŸan Ä°talyan
            kÃ¶kenli lezzetli bir yemektir. KÃ¼Ã§Ã¼k bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pizza-form">
          {/* Error Notification - YENÄ° EKLENEN */}
          {submitError && (
            <div className="error-notification">
              <div className="error-content">
                <span className="error-icon">âš ï¸</span>
                <p className="error-message">{submitError}</p>
                <button 
                  type="button"
                  onClick={() => setSubmitError('')} 
                  className="close-error"
                  aria-label="HatayÄ± kapat"
                >
                  Ã—
                </button>
              </div>
            </div>
          )}

          <div className="form-row">
            {/* Boyut SeÃ§imi */}
            <div className="form-group">
              <label>Boyut SeÃ§ *</label>
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

            {/* Hamur SeÃ§imi */}
            <div className="form-group">
              <label htmlFor="hamur">Hamur SeÃ§ *</label>
              <select
                id="hamur"
                name="hamur"
                value={formData.hamur}
                onChange={handleInputChange}
                className={`hamur-select ${formData.hamur ? 'selected' : ''}`}
              >
                <option value="">Hamur KalÄ±nlÄ±ÄŸÄ±</option>
                <option value="ince">Ä°nce</option>
                <option value="normal">Normal</option>
                <option value="kalin">KalÄ±n</option>
              </select>
            </div>
          </div>

          {/* Malzemeler */}
          <div className="form-group">
            <label>Ek Malzemeler</label>
            <p className="malzeme-info">En fazla 10 malzeme seÃ§ebilirsiniz. 5â‚º</p>
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

          {/* Ä°sim */}
          <div className="form-group">
            <label htmlFor="isim">Ä°sim Soyisim</label>
            <input
              type="text"
              id="isim"
              name="isim"
              value={formData.isim}
              onChange={handleInputChange}
              placeholder="Ä°sminizi giriniz"
              className="name-input"
            />
            {errors.isim && <span className="error">{errors.isim}</span>}
          </div>

          {/* Notlar */}
          <div className="form-group">
            <label htmlFor="ozelNotlar">SipariÅŸ Notu</label>
            <textarea
              id="ozelNotlar"
              name="ozelNotlar"
              value={formData.ozelNotlar}
              onChange={handleInputChange}
              placeholder="SipariÅŸinize eklemek istediÄŸiniz bir not var mÄ±?"
              className="order-note"
              rows="3"
            />
          </div>

          {/* Alt KÄ±sÄ±m - Adet ve Toplam */}
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
              <h3>SipariÅŸ ToplamÄ±</h3>
              <div className="summary-line">
                <span>SeÃ§imler</span>
                <span>{(formData.malzemeler.length * 5).toFixed(2)}â‚º</span>
              </div>
              <div className="summary-line total">
                <span>Toplam</span>
                <span>{calculatePrice().toFixed(2)}â‚º</span>
              </div>
            </div>
          </div>

          {/* Submit Button - GÃœNCELLENDÄ° */}
          <button
            type="submit"
            className={`submit-btn ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'GÃ–NDERÄ°LÄ°YOR...' : 'SÄ°PARÄ°Åž VER'}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Logo" className="footer-logo" />
            <div className="footer-info">
              <p><img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Address" /> 341 Londonderry Road, Istanbul TÃ¼rkiye</p>
              <p><img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Email" /> aciktim@teknolojikyemekler.com</p>
              <p><img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Phone" /> +90 216 123 45 67</p>
            </div>
          </div>

          <div className="footer-center">
            <h4>SÄ±cacÄ±k MenÃ¼ler</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 KiÅŸilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler GeÃ§ti Mutlu Burger</li>
              <li>Position Absolute AcÄ± Burger</li>
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
          <p>Â© 2023 Teknolojik Yemekler.</p>
        </div>
      </footer>
    </div>
  );
}

export default OrderPage;
