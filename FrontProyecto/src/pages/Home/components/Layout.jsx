import { useState, useEffect } from 'react';
import './layout.css';

export default function Layout() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://i.pinimg.com/736x/80/e2/5c/80e25c2cec16d99e3b681167348132b8.jpg',
        'https://www.pngkit.com/png/detail/383-3832200_bts-plant-pot-stickers-individual-bts-png-individual.png',
        'https://dslv9ilpbe7p1.cloudfront.net/-27HuMrq16pc9W0_64ufyQ_store_banner_image.png',
        'https://kpopfevershop.com/wp-content/uploads/2019/01/Banners-CardsIMG_1994.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="slider-container">
            <div
                className="slider"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>
            <div className="dots-container">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

