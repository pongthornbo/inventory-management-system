from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import product
from app.routers import products, categories

# Base.metadata.create_all(bind=engine)

app = FastAPI()

allowed_origins = "http://localhost:5173"

app.add_middleware(
    CORSMiddleware, 
    allow_origins=allowed_origins, 
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(categories.router)

@app.get("/")
def root():
    return {"message": "Inventory API is running"}