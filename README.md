# Inventory Management API

A backend API project for managing inventory products, built with FastAPI, PostgreSQL, and SQLAlchemy.

This project is part of my backend development learning portfolio. The goal is to understand how a real backend system is structured, including API design, database integration, CRUD operations, and clean project organization.

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Docker PostgreSQL
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
app/
├── main.py
├── database.py
├── models/
│   └── product.py
├── routers/
│   └── products.py
├── schemas/
│   └── product.py
└── services/
    └── product_service.py