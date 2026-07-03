from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import Product

products = [
    {"id": 1, "name": "Keyboard", "price": 990, "stock": 10},
    {"id": 2, "name": "Mouse", "price": 490, "stock": 0},
    {"id": 3, "name": "HDMI Cable", "price": 180, "stock": 15},
    {"id": 4, "name": "USB-C Cable", "price": 250, "stock": 20}
]

def get_all_products(db: Session):
    return db.query(Product).all()

def get_product_by_id(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    
    return product

def create_product(product: ProductCreate):
    if product.price < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be a positive value"
        )
    
    if product.stock < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stock must be a positive value"
        )
    
    new_product = {
        "id": len(products) + 1,
        "name": product.name,
        "price": product.price,
        "stock": product.stock
    }
    products.append(new_product)
    
    return new_product

def update_product(product_id: int, product_update: ProductUpdate):
    product = get_product_by_id(product_id)

    product["name"] = product_update.name
    product["price"] = product_update.price
    product["stock"] = product_update.stock 

    return product

def delete_product(product_id: int):
    product = get_product_by_id(product_id)

    products.remove(product)
    
    return None