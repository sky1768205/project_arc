import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>🌿 PlantStore</h3>
                        <p>Ваш надежный партнер в мире комнатных растений</p>
                    </div>
                    <div className="footer-section">
                        <h4>Контакты</h4>
                        <p>Email: info@plantstore.ru</p>
                        <p>Телефон: +7 (999) 123-45-67</p>
                    </div>
                    <div className="footer-section">
                        <h4>Часы работы</h4>
                        <p>Пн-Пт: 9:00 - 18:00</p>
                        <p>Сб-Вс: 10:00 - 16:00</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 PlantStore. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;