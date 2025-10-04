"""
API routers for different endpoints
"""

from app.api.endpoints import auth, users
from fastapi import APIRouter

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
