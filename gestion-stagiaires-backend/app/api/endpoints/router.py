from fastapi import APIRouter
from app.api.endpoints import auth, users,entreprises, offres , candidatures, conversations, messages

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(entreprises.router, prefix="/entreprises", tags=["entreprises"])
api_router.include_router(offres.router, prefix="/offres", tags=["offres"])
api_router.include_router(candidatures.router, prefix="/candidatures", tags=["candidatures"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["conversations"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])
@api_router.get("/health-check")
def health_check():
    return {"status": "ok"}