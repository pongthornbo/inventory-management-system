from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    sku: str | None = None
    price: Decimal
    stock: int = 0
    category_id: int | None = None


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    sku: str | None = None
    price: Decimal | None = None
    stock: int | None = None
    category_id: int | None = None
    is_active: bool = True


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str | None 
    sku: str | None 
    price: Decimal
    stock: int
    category_id: int | None 
    is_active: bool

    model_config = ConfigDict(from_attributes=True)