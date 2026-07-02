from pydantic import  BaseModel

class ProductResponse(BaseModel):
    id: int
    name: str
    price: int
    stock: int

class ProductCreate(BaseModel):
    name: str
    price: int
    stock: int

class ProductUpdate(BaseModel):
    id: int
    name: str
    price: int 
    stock: int