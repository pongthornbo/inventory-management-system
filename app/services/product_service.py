from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from decimal import Decimal

from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import Product

def get_all_products(
    db: Session,
    search: str | None = None,
    min_price: Decimal | None = None,
    max_price: Decimal | None = None,
    low_stock: bool | None = None
):
    query = db.query(Product).filter(Product.is_active.is_(True))

    if search:
        query = query.filter(or_(Product.name.ilike(f"%{search}%"), Product.description.ilike(f"%{search}%")))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if low_stock is True:
        query = query.filter(Product.stock <= 5)

    return query.all()

def get_product_by_id(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id, Product.is_active.is_(True)).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    
    return product

def create_product(db: Session, product: ProductCreate):
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
    
    new_product = Product(
        name=product.name,
        description=product.description,
        sku=product.sku,
        price=product.price,
        stock=product.stock,
        category_id=product.category_id
    )
   
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

def update_product(db:Session, product_id: int, product_update: ProductUpdate):
    product = get_product_by_id(db, product_id)

    if product_update.price < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be a positive value"
        )
    
    if product_update.stock < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stock must be a positive value"
        )

    product.name = product_update.name
    product.description = product_update.description
    product.sku = product_update.sku
    product.price = product_update.price
    product.stock = product_update.stock
    product.category_id = product_update.category_id

    db.commit()
    db.refresh(product)

    return product

def delete_product(db: Session, product_id: int):
    product = get_product_by_id(db, product_id)

    product.is_active = False

    db.commit()

    return None