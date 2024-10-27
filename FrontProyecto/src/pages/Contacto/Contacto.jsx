import React from 'react';
import './Contacto.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>#Contáctanos</h2>
      <div className="social-links">
        <div className="social-item">
          <a
            href="https://wa.me/tu_numero_de_telefono"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <WhatsAppIcon className="social-icon" />
          </a>
          <p>whatsapp</p>
        </div>
        <div className="social-item">
          <a
            href="https://www.instagram.com/lapuntita.peru/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <InstagramIcon className="social-icon" />
          </a>
          <p>@lapuntita.peru</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
