import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { plantsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './PlantDetail.css';

const PlantDetail = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const { addToCart } = useCart();

    useEffect(() => {
        loadPlant();
    }, [id]);

    const loadPlant = async () => {
        try {
            const response = await plantsAPI.getPlant(id);
            setPlant(response.data);
            setError(null);
        } catch (error) {
            console.error('Error loading plant:', error);
            setError('Не удалось загрузить информацию о растении');
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return <div className="loading">Загрузка растения...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!plant) {
        return <div className="error">Растение не найдено</div>;
    }

    return (
        <div className="plant-detail">
            <div className="plant-detail-container">
                <div className="plant-image-section">
                    {plant.image_url ? (
                        <img
                            src={`http://localhost:8000${plant.image_url}`}
                            alt={plant.name}
                            className="plant-detail-image"
                        />
                    ) : (
                        <div className="no-image-large">🌱</div>
                    )}
                </div>

                <div className="plant-info-section">
                    <h1 className="plant-detail-name">{plant.name}</h1>
                    <p className="plant-detail-category">{plant.get_category_display}</p>

                    <div className="plant-price-section">
                        <span className="plant-detail-price">{plant.price} ₽</span>
                        <span className={`stock-status-large ${plant.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                            {plant.in_stock ? 'В наличии' : 'Нет в наличии'}
                        </span>
                    </div>

                    {message && (
                        <div className={`cart-message-large ${message.includes('добавлено') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="plant-description-full">
                        <h3>Описание</h3>
                        <p>{plant.description}</p>
                    </div>

                    <div className="plant-care">
                        <h3>Уход за растением</h3>
                        <div className="care-details">
                            <div className="care-item">
                                <strong>Освещение:</strong> {plant.light_requirements}
                            </div>
                            <div className="care-item">
                                <strong>Полив:</strong> {plant.watering_needs}
                            </div>
                            <div className="care-item">
                                <strong>Инструкции по уходу:</strong> {plant.care_instructions}
                            </div>
                        </div>
                    </div>

                    {user && plant.in_stock && (
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn-large"
                            disabled={adding}
                        >
                            {adding ? 'Добавление...' : 'Добавить в корзину'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantDetail;