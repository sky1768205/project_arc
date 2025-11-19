import React, { useState, useEffect } from 'react';
import { plantsAPI, mockPlantsAPI } from '../../services/api';
import PlantCard from './PlantCard';
import './PlantList.css';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [filteredPlants, setFilteredPlants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useMockData, setUseMockData] = useState(false);

    useEffect(() => {
        loadPlants();
        loadCategories();
    }, []);

    useEffect(() => {
        filterPlants();
    }, [plants, selectedCategory, searchTerm]);

    const loadPlants = async () => {
        try {
            // Сначала пробуем загрузить с бэкенда
            const response = await plantsAPI.getPlants();
            setPlants(response.data);
            setError(null);
            setUseMockData(false);
        } catch (error) {
            console.error('Error loading plants from backend, using mock data:', error);
            // Если бэкенд недоступен, используем мок-данные
            try {
                const mockResponse = await mockPlantsAPI.getPlants();
                setPlants(mockResponse.data);
                setUseMockData(true);
                setError('Бэкенд недоступен. Используются демо-данные.');
            } catch (mockError) {
                setError('Не удалось загрузить растения');
            }
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await plantsAPI.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error loading categories from backend, using mock data:', error);
            try {
                const mockResponse = await mockPlantsAPI.getCategories();
                setCategories(mockResponse.data);
            } catch (mockError) {
                console.error('Error loading mock categories:', mockError);
            }
        }
    };

    const filterPlants = () => {
        let filtered = plants;

        if (selectedCategory) {
            filtered = filtered.filter(plant => plant.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(plant =>
                plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (plant.description && plant.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredPlants(filtered);
    };

    if (loading) {
        return <div className="loading">Загрузка растений...</div>;
    }

    return (
        <div className="plant-list-container">
            {error && (
                <div className="error-message">
                    {error}
                    {useMockData && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            Для работы с реальными данными убедитесь, что Django сервер запущен на порту 8000
                        </div>
                    )}
                </div>
            )}

            <div className="filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Поиск растений..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="category-filter">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="">Все категории</option>
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="plants-grid">
                {filteredPlants.map(plant => (
                    <PlantCard key={plant.id} plant={plant} useMockData={useMockData} />
                ))}
            </div>

            {filteredPlants.length === 0 && !loading && (
                <div className="no-plants">
                    {plants.length === 0 ? 'Растения не найдены' : 'Нет растений по выбранным фильтрам'}
                </div>
            )}
        </div>
    );
};

export default PlantList;