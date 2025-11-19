import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
    const { cart, loading, error, clearCart } = useCart();
    const { user } = useAuth();
    const [clearing, setClearing] = useState(false);
    const [message, setMessage] = useState('');

    const handleClearCart = async () => {
        if (!window.confirm('Вы уверены, что хотите очистить корзину?')) {
            return;
        }

        setClearing(true);
        const result = await clearCart();
        if (result.success) {
            setMessage(result.message);
        } else {
            setMessage(result.message);
        }
        setClearing(false);
        setTimeout(() => setMessage(''), 3000);
    };

    if (!user) {
        return (
            <div className="cart-container">
                <div className="cart-auth-required">
                    <h2>Для просмотра корзины необходимо войти в систему</h2>
                    <div className="auth-links">
                        <Link to="/login" className="auth-btn">Войти</Link>
                        <Link to="/register" className="auth-btn secondary">Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="cart-container">
                <div className="loading">Загрузка корзины...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="cart-container">
                <h1>Корзина</h1>
                <div className="cart-empty">
                    <div className="empty-icon">🛒</div>
                    <h2>Ваша корзина пуста</h2>
                    <p>Добавьте растения из каталога</p>
                    <Link to="/" className="continue-shopping-btn">
                        Перейти к покупкам
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Корзина</h1>
                <div className="cart-summary">
                    <span>{cart.total_quantity} товар(ов) на сумму</span>
                    <span className="cart-total-price">{cart.total_price} ₽</span>
                </div>
            </div>

            {message && (
                <div className={`cart-message ${message.includes('очищена') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="cart-content">
                <div className="cart-items">
                    {cart.items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="cart-sidebar">
                    <div className="cart-totals">
                        <h3>Итого</h3>
                        <div className="total-line">
                            <span>Товары ({cart.total_quantity} шт.)</span>
                            <span>{cart.total_price} ₽</span>
                        </div>
                        <div className="total-line">
                            <span>Доставка</span>
                            <span>Бесплатно</span>
                        </div>
                        <div className="total-line final">
                            <span>Общая сумма</span>
                            <span>{cart.total_price} ₽</span>
                        </div>
                    </div>

                    <button className="checkout-btn">
                        Оформить заказ
                    </button>

                    <button
                        onClick={handleClearCart}
                        className="clear-cart-btn"
                        disabled={clearing}
                    >
                        {clearing ? 'Очистка...' : 'Очистить корзину'}
                    </button>

                    <Link to="/" className="continue-shopping-link">
                        ← Продолжить покупки
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;