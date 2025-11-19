# project_arc
project_arc - это учебный проект о "Интернет-магазин растений".Полнофункциональный интернет-магазин растений, построенный на Django и React.
## Функциональность

-  Каталог растений с фильтрацией и поиском
-  Аутентификация и регистрация пользователей
-  Корзина товаров
-  Детальные страницы растений
-  Добавление новых растений (для администраторов)
-  Адаптивный дизайн
## Технологии
- React
- Django
- Html|CSS
- React Router DOM
- Django REST Framework
- Django Knox (аутентификация)
- SQLite (разработка)
## Установка и запуск

### Предварительные требования
- Python 3.8+
- Node.js 14+
- npm или yarn
```
cd project_arc
```
```
plantstore_env\Scripts\activate
```
```
d plantstore
```
```
python manage.py runserver
```
Потом создаем отдельный терминал
```
cd project_arc
```
```
cd frontend
```
```
npm start
```
Если нет виртуального окружения 
```
python -m venv plantstore_env
```
Доступ к приложению

Frontend: http://localhost:3000
Backend API: http://localhost:8000/api/
Админ-панель: http://localhost:8000/admin/

## Структура проекта
```
plantstore/
├── accounts/          # Приложение аутентификации
├── plants/           # Приложение растений
├── orders/           # Приложение заказов
├── frontend/         # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── context/
│   └── public/
├── media/            # Загружаемые файлы
└── plantstore/       # Настройки проекта
```
## API Endpoints
Аутентификация

POST /api/auth/register/ - Регистрация
POST /api/auth/login/ - Вход
GET /api/auth/user/ - Информация о пользователе
Растения

GET /api/plants/ - Список растений
GET /api/plants/{id}/ - Детали растения
POST /api/plants/create/ - Создание растения (только админы)
GET /api/categories/ - Список категорий
## Добавление нового функционала
Создайте миграции для моделей:
```
python manage.py makemigrations
```
Примените миграции:
```
python manage.py migrate
```
Создайте сериализаторы в соответствующем приложении
Добавьте views и URLs
Создайте React компоненты
Добавьте стили
