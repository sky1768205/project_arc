import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './PlantCard.css';

const PlantCard = ({ plant, useMockData = false }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddToCart = async () => {
        if (!user) {
            setMessage('Для добавления в корзину необходимо войти в систему');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        setAdding(true);
        setMessage('');

        const result = await addToCart(plant.id, 1);

        if (result.success) {
            setMessage(result.message);
        } else {
            setMessage(result.message);
        }

        setAdding(false);
        setTimeout(() => setMessage(''), 3000);
    };

    // Функция для получения URL изображения
    const getImageUrl = () => {
        if (plant.image_url) {
            if (useMockData || plant.image_url.startsWith('http')) {
                return plant.image_url;
            }
            return `http://localhost:8000${plant.image_url}`;
        }
        return null;
    };

    const imageUrl = getImageUrl();

    return (
        <div className="plant-card">
            <div className="plant-image">
                {imageUrl ? (
                    <img src={imageUrl} alt={plant.name} onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }} />
                ) : null}
                <div className="no-image" style={{ display: imageUrl ? 'none' : 'flex' }}>
                    🌱
                </div>
            </div>

            <div className="plant-info">
                <h3 className="plant-name">{plant.name}</h3>
                <p className="plant-category">
                    {plant.get_category_display ||
                        (plant.category === 'INDOOR' ? 'Комнатные растения' :
                            plant.category === 'OUTDOOR' ? 'Садовые растения' :
                                plant.category === 'SUCCULENT' ? 'Суккуленты' :
                                    plant.category === 'FLOWERING' ? 'Цветущие растения' : plant.category)}
                </p>
                <p className="plant-description">
                    {plant.description && plant.description.length > 100
                        ? `${plant.description.substring(0, 100)}...`
                        : plant.description
                    }
                </p>

                <div className="plant-details">
                    <span className="plant-price">{plant.price} ₽</span>
                    <span className={`stock-status ${plant.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                        {plant.in_stock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                </div>

                {message && (
                    <div className={`cart-message ${message.includes('добавлено') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <div className="plant-actions">
                    <Link to={`/plants/${plant.id}`} className="details-btn">
                        Подробнее
                    </Link>
                    {user && plant.in_stock && (
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn"
                            disabled={adding}
                        >
                            {adding ? 'Добавление...' : 'В корзину'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantCard;