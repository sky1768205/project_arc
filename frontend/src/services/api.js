import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Добавляем токен к запросам
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const plantsAPI = {
    getPlants: () => api.get('/plants/'),
    getPlant: (id) => api.get(`/plants/${id}/`),
    createPlant: (data) => api.post('/plants/create/', data),
    getCategories: () => api.get('/categories/'),
};

export const authAPI = {
    login: (credentials) => api.post('/auth/login/', credentials),
    register: (userData) => api.post('/auth/register/', userData),
    getUser: () => api.get('/auth/user/'),
};

export const cartAPI = {
    getCart: () => api.get('/cart/'),
    addToCart: (plantId, quantity = 1) => api.post('/cart/add/', { plant_id: plantId, quantity }),
    updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}/update/`, { quantity }),
    removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}/remove/`),
    clearCart: () => api.delete('/cart/clear/'),
};


// Мок данные для растений (если бэкенд не готов)
export const mockPlantsAPI = {
    getPlants: () => Promise.resolve({
        data: [
            {
                id: 1,
                name: "Монстера Деликатесная",
                description: "Крупное тропическое растение с красивыми резными листьями. Идеально для просторных помещений.",
                price: 2500.00,
                category: "INDOOR",
                image_url: "/media/plants/monstera.jpg",
                care_instructions: "Полив умеренный, опрыскивание листьев, защита от прямых солнечных лучей. Подкормка раз в 2 недели.",
                light_requirements: "Рассеянный свет, полутень",
                watering_needs: "Умеренный полив 2 раза в неделю",
                in_stock: true,
                created_at: "2024-01-15T10:00:00Z"
            },
            {
                id: 2,
                name: "Фикус Бенджамина",
                description: "Элегантное дерево с мелкими глянцевыми листьями. Отлично очищает воздух.",
                price: 1800.00,
                category: "INDOOR",
                image_url: "/media/plants/ficus.jpg",
                care_instructions: "Регулярный полив, яркое рассеянное освещение. Обрезка для формирования кроны.",
                light_requirements: "Яркий рассеянный свет",
                watering_needs: "Полив 1-2 раза в неделю",
                in_stock: true,
                created_at: "2024-01-16T11:00:00Z"
            },
            {
                id: 3,
                name: "Сансевиерия (Тещин язык)",
                description: "Неприхотливое растение с вертикальными полосатыми листьями. Отличный выбор для начинающих.",
                price: 890.00,
                category: "INDOOR",
                image_url: "/media/plants/sansevieria.jpg",
                care_instructions: "Минимальный уход, переносит засуху. Подкормка раз в месяц.",
                light_requirements: "Любое освещение",
                watering_needs: "Редкий полив 1 раз в 2 недели",
                in_stock: true,
                created_at: "2024-01-17T12:00:00Z"
            },
            {
                id: 4,
                name: "Замиокулькас (Долларовое дерево)",
                description: "Современное растение с глянцевыми темно-зелеными листьями. Символ богатства.",
                price: 1200.00,
                category: "INDOOR",
                image_url: "/media/plants/zamioculcas.jpg",
                care_instructions: "Очень неприхотлив, переносит засуху и слабое освещение.",
                light_requirements: "Рассеянный свет, полутень",
                watering_needs: "Полив 1 раз в 2-3 недели",
                in_stock: true,
                created_at: "2024-01-18T13:00:00Z"
            },
            {
                id: 5,
                name: "Спатифиллум (Женское счастье)",
                description: "Нежное цветущее растение с белыми покрывалами. Цветет несколько раз в год.",
                price: 950.00,
                category: "FLOWERING",
                image_url: "/media/plants/spathiphyllum.jpg",
                care_instructions: "Регулярный полив, высокая влажность. Удаление отцветших цветков.",
                light_requirements: "Полутень",
                watering_needs: "Полив 2-3 раза в неделю",
                in_stock: true,
                created_at: "2024-01-19T14:00:00Z"
            },
            {
                id: 6,
                name: "Антуриум (Мужское счастье)",
                description: "Экзотическое растение с яркими красными цветами и глянцевыми листьями.",
                price: 1500.00,
                category: "FLOWERING",
                image_url: "/media/plants/anthurium.jpg",
                care_instructions: "Теплолюбив, требует высокой влажности. Подкормка для цветущих растений.",
                light_requirements: "Яркий рассеянный свет",
                watering_needs: "Полив 2 раза в неделю",
                in_stock: true,
                created_at: "2024-01-20T15:00:00Z"
            },
            {
                id: 7,
                name: "Орхидея Фаленопсис",
                description: "Элегантная орхидея с бабочковидными цветами. Длительный период цветения.",
                price: 2200.00,
                category: "FLOWERING",
                image_url: "/media/plants/orchid.jpg",
                care_instructions: "Специальный субстрат, полив методом погружения. Высокая влажность воздуха.",
                light_requirements: "Рассеянный свет",
                watering_needs: "Полив 1 раз в неделю",
                in_stock: true,
                created_at: "2024-01-21T16:00:00Z"
            },
            {
                id: 8,
                name: "Герань (Пеларгония)",
                description: "Классическое цветущее растение с ароматными листьями. Обильное цветение.",
                price: 650.00,
                category: "FLOWERING",
                image_url: "/media/plants/geranium.jpg",
                care_instructions: "Солнечное местоположение, регулярная обрезка. Подкормка для цветения.",
                light_requirements: "Прямое солнце",
                watering_needs: "Полив по мере просыхания почвы",
                in_stock: true,
                created_at: "2024-01-22T17:00:00Z"
            },
            {
                id: 9,
                name: "Алоэ Вера",
                description: "Лекарственное растение с мясистыми листьями. Обладает целебными свойствами.",
                price: 550.00,
                category: "SUCCULENT",
                image_url: "/media/plants/aloe.jpg",
                care_instructions: "Минимальный уход, хорошо дренированная почва. Легко размножается.",
                light_requirements: "Яркое освещение",
                watering_needs: "Редкий полив 1 раз в 3 недели",
                in_stock: true,
                created_at: "2024-01-23T18:00:00Z"
            },
            {
                id: 10,
                name: "Кактус Цереус",
                description: "Колонновидный кактус с ребристыми стеблями. Ночное цветение.",
                price: 750.00,
                category: "SUCCULENT",
                image_url: "/media/plants/cereus.jpg",
                care_instructions: "Максимальное освещение, минимальный полив. Зимой период покоя.",
                light_requirements: "Прямое солнце",
                watering_needs: "Полив 1 раз в месяц",
                in_stock: true,
                created_at: "2024-01-24T19:00:00Z"
            },
            {
                id: 11,
                name: "Эхеверия",
                description: "Декоративный суккулент с розетками мясистых листьев. Разнообразие окрасок.",
                price: 480.00,
                category: "SUCCULENT",
                image_url: "/media/plants/echeveria.jpg",
                care_instructions: "Яркое освещение для сохранения окраски. Хороший дренаж обязателен.",
                light_requirements: "Прямое солнце",
                watering_needs: "Полив 1 раз в 2 недели",
                in_stock: true,
                created_at: "2024-01-25T20:00:00Z"
            },
            {
                id: 12,
                name: "Хавортия Полосатая",
                description: "Миниатюрный суккулент с полосатыми листьями. Идеально для небольших пространств.",
                price: 420.00,
                category: "SUCCULENT",
                image_url: "/media/plants/haworthia.jpg",
                care_instructions: "Неприхотлив, переносит слабое освещение. Легко размножается детками.",
                light_requirements: "Рассеянный свет",
                watering_needs: "Полив 1 раз в 2 недели",
                in_stock: true,
                created_at: "2024-01-26T21:00:00Z"
            },
            {
                id: 13,
                name: "Роза садовая",
                description: "Классический садовый куст с ароматными цветами. Разнообразие сортов и цветов.",
                price: 1200.00,
                category: "OUTDOOR",
                image_url: "/media/plants/rose.jpg",
                care_instructions: "Регулярная обрезка, подкормка, защита от вредителей. Укрытие на зиму.",
                light_requirements: "Прямое солнце",
                watering_needs: "Регулярный полив",
                in_stock: true,
                created_at: "2024-01-27T22:00:00Z"
            },
            {
                id: 14,
                name: "Лаванда узколистная",
                description: "Ароматный многолетник с фиолетовыми соцветиями. Успокаивающий аромат.",
                price: 680.00,
                category: "OUTDOOR",
                image_url: "/media/plants/lavender.jpg",
                care_instructions: "Солнечное место, хорошо дренированная почва. Обрезка после цветения.",
                light_requirements: "Прямое солнце",
                watering_needs: "Умеренный полив",
                in_stock: true,
                created_at: "2024-01-28T23:00:00Z"
            },
            {
                id: 15,
                name: "Гортензия крупнолистная",
                description: "Кустарник с крупными шаровидными соцветиями. Меняет цвет в зависимости от почвы.",
                price: 1800.00,
                category: "OUTDOOR",
                image_url: "/media/plants/hydrangea.jpg",
                care_instructions: "Кислая почва, регулярный полив. Укрытие на зиму в холодных регионах.",
                light_requirements: "Полутень",
                watering_needs: "Обильный полив",
                in_stock: true,
                created_at: "2024-01-29T10:00:00Z"
            },
            {
                id: 16,
                name: "Петуния гибридная",
                description: "Однолетник с обильным цветением все лето. Разнообразие окрасок и форм.",
                price: 350.00,
                category: "OUTDOOR",
                image_url: "/media/plants/petunia.jpg",
                care_instructions: "Регулярное удаление увядших цветков, подкормка для цветения.",
                light_requirements: "Прямое солнце",
                watering_needs: "Регулярный полив",
                in_stock: true,
                created_at: "2024-01-30T11:00:00Z"
            },
            {
                id: 17,
                name: "Диффенбахия",
                description: "Крупное растение с пестрыми листьями. Быстрорастущее, требует пространства.",
                price: 1300.00,
                category: "INDOOR",
                image_url: "/media/plants/dieffenbachia.jpg",
                care_instructions: "Яркий рассеянный свет, регулярное опрыскивание. Ядовито для животных.",
                light_requirements: "Рассеянный свет",
                watering_needs: "Полив 2 раза в неделю",
                in_stock: true,
                created_at: "2024-01-31T12:00:00Z"
            },
            {
                id: 18,
                name: "Драцена Маргината",
                description: "Пальмоподобное растение с тонкими листьями с красной каймой. Очищает воздух.",
                price: 1600.00,
                category: "INDOOR",
                image_url: "/media/plants/dracaena.jpg",
                care_instructions: "Умеренный полив, периодическое опрыскивание. Обрезка для ветвления.",
                light_requirements: "Рассеянный свет",
                watering_needs: "Полив 1 раз в неделю",
                in_stock: true,
                created_at: "2024-02-01T13:00:00Z"
            },
            {
                id: 19,
                name: "Фиалка узамбарская",
                description: "Компактное цветущее растение с бархатистыми листьями. Длительное цветение.",
                price: 520.00,
                category: "FLOWERING",
                image_url: "/media/plants/violet.jpg",
                care_instructions: "Полив в поддон, избегать попадания воды на листья. Яркий рассеянный свет.",
                light_requirements: "Яркий рассеянный свет",
                watering_needs: "Полив через поддон",
                in_stock: true,
                created_at: "2024-02-02T14:00:00Z"
            },
            {
                id: 20,
                name: "Каланхоэ Блоссфельда",
                description: "Сукулент с яркими соцветиями. Длительное и обильное цветение.",
                price: 620.00,
                category: "SUCCULENT",
                image_url: "/media/plants/kalanchoe.jpg",
                care_instructions: "Яркое освещение, умеренный полив. После цветения обрезка.",
                light_requirements: "Яркий свет",
                watering_needs: "Полив по мере просыхания",
                in_stock: true,
                created_at: "2024-02-03T15:00:00Z"
            },
            {
                id: 21,
                name: "Туя западная",
                description: "Вечнозеленое хвойное дерево для живой изгороди. Морозоустойчива.",
                price: 950.00,
                category: "OUTDOOR",
                image_url: "/media/plants/thuja.jpg",
                care_instructions: "Регулярный полив после посадки. Формирующая обрезка.",
                light_requirements: "Солнце, полутень",
                watering_needs: "Регулярный полив",
                in_stock: true,
                created_at: "2024-02-04T16:00:00Z"
            },
            {
                id: 22,
                name: "Бегония королевская",
                description: "Декоративнолиственное растение с асимметричными узорчатыми листьями.",
                price: 780.00,
                category: "INDOOR",
                image_url: "/media/plants/begonia.jpg",
                care_instructions: "Высокая влажность, защита от сквозняков. Регулярное опрыскивание.",
                light_requirements: "Яркий рассеянный свет",
                watering_needs: "Полив при подсыхании почвы",
                in_stock: true,
                created_at: "2024-02-05T17:00:00Z"
            },
            {
                id: 23,
                name: "Юкка слоновая",
                description: "Древовидное растение с мечевидными листьями. Очень выносливое.",
                price: 3200.00,
                category: "INDOOR",
                image_url: "/media/plants/yucca.jpg",
                care_instructions: "Яркое освещение, редкий полив. Устойчиво к засухе.",
                light_requirements: "Прямое солнце",
                watering_needs: "Полив 1 раз в 2-3 недели",
                in_stock: true,
                created_at: "2024-02-06T18:00:00Z"
            },
            {
                id: 24,
                name: "Папоротник Нефролепис",
                description: "Пышный папоротник с ажурными вайями. Любит высокую влажность.",
                price: 1100.00,
                category: "INDOOR",
                image_url: "/media/plants/fern.jpg",
                care_instructions: "Регулярное опрыскивание, защита от прямого солнца. Деление куста при пересадке.",
                light_requirements: "Полутень",
                watering_needs: "Постоянно влажная почва",
                in_stock: true,
                created_at: "2024-02-07T19:00:00Z"
            }
        ]
    }),
    getPlant: (id) => Promise.resolve({
        data: mockPlantsAPI.getPlants().data.find(plant => plant.id === parseInt(id))
    }),
    getCategories: () => Promise.resolve({
        data: [
            { value: 'INDOOR', label: 'Комнатные растения' },
            { value: 'OUTDOOR', label: 'Садовые растения' },
            { value: 'SUCCULENT', label: 'Суккуленты' },
            { value: 'FLOWERING', label: 'Цветущие растения' }
        ]
    })
};

export default api;