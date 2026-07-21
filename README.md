# Inventory Management System

A full-stack inventory management application for managing products, categories, and stock through a responsive web dashboard.

The backend is built with FastAPI, SQLAlchemy, Alembic, and PostgreSQL. The frontend is built with React, Vite, and plain CSS, and communicates with the backend through a REST API.

This project is part of my software development learning portfolio. It demonstrates full-stack application structure, REST API design, database integration, frontend-backend communication, CRUD operations, server-side filtering, responsive layout, and project organization.

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic
- PostgreSQL
- Uvicorn

### Frontend

- JavaScript
- React
- Vite
- Plain CSS
- ESLint

### Development and Infrastructure

- Docker
- Docker Compose
- Git
- GitHub

## Features

### Product Management

- View active products
- View a product by ID through the API
- Create products
- Update product details and stock
- Soft delete products
- Assign products to categories

### Category Management

- View active categories
- View a category by ID through the API
- Create categories
- Update category details
- Soft delete categories

### Product Search and Filters

- Search products by name or description
- Filter products by minimum price
- Filter products by maximum price
- Filter products with stock less than or equal to 5
- Combine multiple filters in a single request

### Frontend Dashboard

- Product and category management through a React interface
- Frontend-backend communication using the Fetch API
- Loading, empty, and error states
- Responsive dashboard layout for different screen sizes

## API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all active products |
| GET | `/products/{product_id}` | Get a product by ID |
| POST | `/products` | Create a new product |
| PATCH | `/products/{product_id}` | Partially update a product |
| DELETE | `/products/{product_id}` | Soft delete a product |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Get all active categories |
| GET | `/categories/{category_id}` | Get a category by ID |
| POST | `/categories` | Create a new category |
| PATCH | `/categories/{category_id}` | Partially update a category |
| DELETE | `/categories/{category_id}` | Soft delete a category |

### Product Search and Filters

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products?search=cable` | Search products by name or description |
| GET | `/products?min_price=100&max_price=500` | Filter products by price range |
| GET | `/products?low_stock=true` | Get products with stock less than or equal to 5 |
| GET | `/products?search=cable&min_price=100&max_price=500&low_stock=true` | Combine search and filters |

## Project Structure

```text
.
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database.py
│   │   └── main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryForm.jsx
│   │   │   ├── CategoryItem.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductItem.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Git
- Docker and Docker Compose
- Node.js and npm

### 1. Clone the Repository

```bash
git clone https://github.com/pongthornbo/inventory-management-system.git
cd inventory-management-system
```

### 2. Create the Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

The default values are configured for local development with Docker Compose.

### 3. Start the Backend Services

From the project root, build and start FastAPI, PostgreSQL, and pgAdmin:

```bash
docker compose up -d --build
```

Apply the database migrations:

```bash
docker compose exec api alembic upgrade head
```

The backend services will be available at:

| Service | URL |
|---|---|
| FastAPI | `http://localhost:8000` |
| API documentation | `http://localhost:8000/docs` |
| pgAdmin | `http://localhost:5050` |

The default local pgAdmin credentials are:

```text
Email: admin@example.com
Password: admin
```

### 4. Start the Frontend

Open another terminal and enter the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The frontend sends API requests to the FastAPI backend at `http://localhost:8000`.

### 5. Run Frontend Checks

From the `frontend/` directory, run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The generated build files will be placed in `frontend/dist/`.

### 6. Stop the Backend Services

From the project root, stop the Docker Compose services:

```bash
docker compose down
```

To stop the services and remove the local database volumes:

```bash
docker compose down -v
```

> Warning: `docker compose down -v` permanently removes the local PostgreSQL and pgAdmin volume data.

## Database Migrations

Create a new migration after changing the SQLAlchemy models:

```bash
docker compose exec api alembic revision --autogenerate -m "migration message"
```

Apply all available migrations:

```bash
docker compose exec api alembic upgrade head
```

Check the migration currently applied to the database:

```bash
docker compose exec api alembic current
```

Check the latest available migration:

```bash
docker compose exec api alembic heads
```

View the migration history:

```bash
docker compose exec api alembic history
```

## Project Status

This project is currently under development as a full-stack software development learning portfolio project.

The current version includes a responsive React dashboard connected to a FastAPI REST API, with product management, category management, server-side product search and filters, PostgreSQL persistence, and Alembic database migrations.