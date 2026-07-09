# Inventory Management API

A backend API project for managing inventory products, built with FastAPI, PostgreSQL, and SQLAlchemy.

This project is part of my backend development learning portfolio. The goal is to understand how a real backend system is structured, including API design, database integration, CRUD operations, and clean project organization.

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Docker
- Docker Compose
- Uvicorn

## Current Features

### Product Management

- Create product
- Get all products
- Get product by ID
- Update product
- Soft delete product
- Search products by name or description
- Filter products by price range
- Filter low-stock products

## API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all active products |
| GET | `/products/{product_id}` | Get product by ID |
| POST | `/products` | Create a new product |
| PUT | `/products/{product_id}` | Update product |
| DELETE | `/products/{product_id}` | Soft delete product |

### Product Search & Filters

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products?search=cable` | Search products by name or description |
| GET | `/products?min_price=100&max_price=500` | Filter products by price range |
| GET | `/products?low_stock=true` | Get products with stock less than or equal to 5 |

## Project Structure

```text
.
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   └── product.py
│   ├── routers/
│   │   └── products.py
│   ├── schemas/
│   │   └── product.py
│   └── services/
│       └── product_service.py
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── requirements.txt
└── README.md
```

## How to Run with Docker

### 1. Clone the repository

```bash
git clone https://github.com/pongthornbo/inventory-management-api.git
cd inventory-management-api
```

### 2. Create environment file

```bash
cp .env.example .env
```

### 3. Start the application

```bash
docker compose up --build
```

The API will be available at:
```text
http://localhost:8000
```
API documentation:
```text
http://localhost:8000/docs
```
pgAdmin:
```text
http://localhost:5050
```
Default pgAdmin login:
```text
Email: admin@example.com
Password: admin
```

### 4. Stop the application
```bash
docker compose down
```
To remove database volume as well:
```bash
docker compose down -v
```
> Warning: `docker compose down -v` will remove PostgreSQL data.

## Notes

This project is currently under development as part of my backend learning portfolio. Current features focus on Product Management, including CRUD operations, search, filtering, and soft delete.