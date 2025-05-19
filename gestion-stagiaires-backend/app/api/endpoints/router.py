from fastapi import APIRouter
from app.api.endpoints import auth, users,entreprises

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(entreprises.router, prefix="/entreprises", tags=["entreprises"])

@api_router.get("/health-check")
def health_check():
    return {"status": "ok"}