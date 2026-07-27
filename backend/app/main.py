import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import product
from app.routers import products, categories

# Base.metadata.create_all(bind=engine)

app = FastAPI()

allowed_origins_env = os.getenv("ALLOWED_ORIGINS")

if allowed_origins_env is None :
    raise RuntimeError("ALLOWED_ORIGINS environment variable is not set")

allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=allowed_origins, 
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(categories.router)

@app.get("/")
def root():
    return {"message": "Inventory API is running"}