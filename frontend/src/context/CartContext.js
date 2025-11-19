import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCart = async () => {
        if (!localStorage.getItem('token')) return;

        setLoading(true);
        try {
            const response = await cartAPI.getCart();
            setCart(response.data);
            setError(null);
        } catch (error) {
            console.error('Error loading cart:', error);
            setError('Не удалось загрузить корзину');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (plantId, quantity = 1) => {
        try {
            const response = await cartAPI.addToCart(plantId, quantity);
            setCart(response.data.cart);
            setError(null);
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.error || 'Не удалось добавить в корзину';
            setError(message);
            return { success: false, message };
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const response = await cartAPI.updateCartItem(itemId, quantity);
            setCart(response.data.cart);
            setError(null);
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.error || 'Не удалось обновить корзину';
            setError(message);
            return { success: false, message };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await cartAPI.removeFromCart(itemId);
            setCart(response.data.cart);
            setError(null);
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.error || 'Не удалось удалить из корзины';
            setError(message);
            return { success: false, message };
        }
    };

    const clearCart = async () => {
        try {
            const response = await cartAPI.clearCart();
            setCart(response.data.cart);
            setError(null);
            return { success: true, message: response.data.message };
        } catch (error) {
            const message = error.response?.data?.error || 'Не удалось очистить корзину';
            setError(message);
            return { success: false, message };
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const value = {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loadCart,
        setError
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};