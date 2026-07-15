from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse 
from app.services import category_service

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("", response_model=list[CategoryResponse])
def get_categories(db: Session=Depends(get_db)):
    return category_service.get_all_categories(db)

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session=Depends(get_db)):
    return category_service.get_category_by_id(category_id, db)

@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category: CategoryCreate, db: Session=Depends(get_db)):
    return category_service.create_category(category, db)

@router.patch("/{category_id}", response_model=CategoryResponse,)
def update_category(category_id: int, category_update: CategoryUpdate, db: Session = Depends(get_db),):
    return category_service.update_category(category_id, category_update, db)

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session=Depends(get_db)):
    category_service.delete_category(category_id, db)
    return None



