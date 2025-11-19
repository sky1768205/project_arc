import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    const handleLogout = () => {
        logout();
    };

    const cartItemsCount = cart?.total_quantity || 0;

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    🌿 PlantStore
                </Link>

                <nav className="nav">
                    <Link to="/plants" className="nav-link">Каталог</Link>
                    {user ? (
                        <>
                            {user.is_staff && (
                                <Link to="/create-plant" className="nav-link">Добавить растение</Link>
                            )}
                            <Link to="/cart" className="nav-link cart-link">
                                Корзина
                                {cartItemsCount > 0 && (
                                    <span className="cart-badge">{cartItemsCount}</span>
                                )}
                            </Link>
                            <span className="user-greeting">Привет, {user.username}!</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Войти</Link>
                            <Link to="/register" className="nav-link">Регистрация</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;