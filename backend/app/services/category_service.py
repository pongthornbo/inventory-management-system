from fastapi import HTTPException, status

from sqlalchemy.orm import Session

from app.schemas.category import CategoryCreate, CategoryUpdate
from app.models.category import Category


def get_all_categories(db: Session):
    query = db.query(Category).filter(Category.is_active.is_(True))

    return query.all()

def get_category_by_id(category_id: int, db: Session):
    category = db.query(Category).filter(Category.id == category_id, Category.is_active.is_(True)).first()

    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    return category

def create_category(category: CategoryCreate, db: Session): 
    existing_category = (
        db.query(Category)
        .filter(Category.name == category.name)
        .first()
    )

    if existing_category is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category name already exists"
        )

    new_category = Category(
        name=category.name,
        description=category.description
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category

def update_category(category_id: int, category_update: CategoryUpdate, db: Session):
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    update_data = category_update.model_dump(exclude_unset=True,)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update data provided",
        )
    
    required_fields = ["name",]
    for field in required_fields:
        if (field in update_data and update_data[field] is None):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{field.capitalize()} cannot be null",
            )

    if "name" in update_data:    
        duplicate_category = (
            db.query(Category)
            .filter(
                Category.name == update_data["name"],
                Category.id != category_id,
            )
            .first()
        )
        if duplicate_category is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Category name already exists",
            )
        
    for field, value in update_data.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)

    return category

def delete_category(category_id: int, db: Session):
    category = get_category_by_id(category_id, db)

    category.is_active = False

    db.commit()

    return None