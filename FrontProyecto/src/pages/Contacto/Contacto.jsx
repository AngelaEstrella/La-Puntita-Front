import React from 'react';
import './Contacto.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Contacto = () => {
  return (
    <div className="contacto-container">
        <div className="contacto-info">
            <h2>#Contáctanos</h2>
            <div className="social-links">
                <div className="social-item-whatsapp">
                <a
                    href="https://api.whatsapp.com/send?phone=51940259838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-whatsapp"
                >
                    <WhatsAppIcon className="social-icon-whatsapp" />
                </a>
                <p>La Puntita</p>
                </div>
                <div className="social-item-instagram">
                <a
                    href="https://www.instagram.com/lapuntita.peru/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-instagram"
                >
                    <InstagramIcon className="social-icon-instagram" />
                </a>
                <p>@lapuntita.peru</p>
                </div>


                <div className="social-item-facebook">
                <a
                    href="https://www.facebook.com/LaPuntitaPeru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-facebook"
                >
                    <FacebookIcon className="social-icon-facebook" />
                </a>
                <p>LaPuntitaPeru</p>
                </div>

            </div>
        </div>
        <div className="store-info">
            <h2>Nuestros Locales</h2>
            <div className="store-image">
                <p>Imagen o dirección del local 1</p>
            </div>
            <div className="store-image">
                <p>Imagen o dirección del local 2</p>
            </div>
        </div>
    </div>
  );
};

export default Contacto;

