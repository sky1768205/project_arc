import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { plantsAPI } from '../../services/api';
import './PlantForm.css';

const PlantForm = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        care_instructions: '',
        light_requirements: '',
        watering_needs: '',
        in_stock: true,
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await plantsAPI.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    submitData.append(key, formData[key]);
                }
            });

            await plantsAPI.createPlant(submitData);
            setMessage('Растение успешно добавлено!');
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                care_instructions: '',
                light_requirements: '',
                watering_needs: '',
                in_stock: true,
                image: null
            });
        } catch (error) {
            setMessage('Ошибка при добавлении растения');
            console.error('Error creating plant:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.is_staff) {
        return <div className="access-denied">Доступ запрещен. Только администраторы могут добавлять растения.</div>;
    }

    return (
        <div className="plant-form-container">
            <h1>Добавить новое растение</h1>

            <form onSubmit={handleSubmit} className="plant-form">
                <div className="form-group">
                    <label htmlFor="name">Название растения</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Цена (₽)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Категория</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="light_requirements">Требования к освещению</label>
                    <input
                        type="text"
                        id="light_requirements"
                        name="light_requirements"
                        value={formData.light_requirements}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="watering_needs">Полив</label>
                    <input
                        type="text"
                        id="watering_needs"
                        name="watering_needs"
                        value={formData.watering_needs}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="care_instructions">Инструкции по уходу</label>
                    <textarea
                        id="care_instructions"
                        name="care_instructions"
                        value={formData.care_instructions}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label htmlFor="in_stock">
                        <input
                            type="checkbox"
                            id="in_stock"
                            name="in_stock"
                            checked={formData.in_stock}
                            onChange={handleChange}
                        />
                        В наличии
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Изображение растения</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Добавление...' : 'Добавить растение'}
                </button>

                {message && (
                    <div className={`form-message ${message.includes('успешно') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PlantForm;