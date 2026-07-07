from fastapi import APIRouter, Depends ,status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse 
from app.services import product_service

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return product_service.get_all_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_service.get_product_by_id(db, product_id)

@router.post(
        "", 
        response_model=ProductResponse, 
        status_code=status.HTTP_201_CREATED
    )
def create_product(db: Session = Depends(get_db), product: ProductCreate = None):
    return product_service.create_product(db, product)

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_update: ProductUpdate):
    return product_service.update_product(product_id, product_update)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int):
    product_service.delete_product(product_id)
    return None