import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart } = useCart();
    const [updating, setUpdating] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity === quantity) return;

        setUpdating(true);
        const result = await updateCartItem(item.id, newQuantity);
        if (result.success) {
            setQuantity(newQuantity);
        }
        setUpdating(false);
    };

    const handleRemove = async () => {
        setRemoving(true);
        await removeFromCart(item.id);
        setRemoving(false);
    };

    const incrementQuantity = () => {
        handleQuantityChange(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            handleQuantityChange(quantity - 1);
        }
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                {item.plant.image_url ? (
                    <img
                        src={`http://localhost:8000${item.plant.image_url}`}
                        alt={item.plant.name}
                    />
                ) : (
                    <div className="no-image">🌱</div>
                )}
            </div>

            <div className="cart-item-info">
                <Link to={`/plants/${item.plant.id}`} className="cart-item-name">
                    {item.plant.name}
                </Link>
                <p className="cart-item-category">{item.plant.get_category_display}</p>
                <p className="cart-item-price">{item.plant.price} ₽/шт</p>
            </div>

            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button
                        onClick={decrementQuantity}
                        disabled={updating || quantity <= 1}
                        className="quantity-btn"
                    >
                        -
                    </button>
                    <span className="quantity-display">
                        {updating ? '...' : quantity}
                    </span>
                    <button
                        onClick={incrementQuantity}
                        disabled={updating}
                        className="quantity-btn"
                    >
                        +
                    </button>
                </div>

                <div className="cart-item-total">
                    {item.total_price} ₽
                </div>

                <button
                    onClick={handleRemove}
                    disabled={removing}
                    className="remove-item-btn"
                    title="Удалить из корзины"
                >
                    {removing ? '...' : '🗑️'}
                </button>
            </div>
        </div>
    );
};

export default CartItem;