## 📰 Journal 

Это проект, разработанный с использованием FastAPI для серверной части и React для фронтенда. Представляет собой веб-приложение для ведения статистики сделок с интеграцией API биржи BingX. В рамках проекта реализованы основы работы с API, а также взаимодействие между фронтендом и бэкендом.

#### Основной стек:
![FastAPI](https://img.shields.io/badge/FastAPI-0b3d25?style=for-the-badge&logo=fastapi)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

- **FastAPI** - для реализации RESTful API на серверной стороне
- **React** - фронтенд часть
- **PostgreSQL** - база данных

#### Второстепенный стек:

- **Alembic** — миграции базы данных
- **SQLAlchemy** — работа с базой данных
- **Pydantic** — валидация данных
- **Vite** — devtools для работы с реактом 
- **asyncpg** — асинхронное взаимодействие с PostgreSQL
- **asyncio** — асинхронная работа приложения
- **bcrypt** — хеширование паролей
- **jwt** — для работы с JSON Web Token
- **uvicorn** — ASGI сервер для запуска приложения




#### Фичи проекта:
- Рализованная без сторонних библиотек аутентификация при помощи JWT (JSON Web Token)
- Грамотная фронтекнд реализация со сложными компонентами (есть светлая и темная темы)
- CRUD операции для api-ключей биржи
