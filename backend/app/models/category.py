from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(
        String(255), 
        nullable=False, 
        unique=True, 
        index=True
    )
    description = Column(Text, nullable=True)
    is_active = Column(
        Boolean, 
        nullable=False, 
        default=True, 
        server_default="true"
    )
    created_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )