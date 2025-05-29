from fastapi import FastAPI, WebSocket, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints.router import api_router
from app.db import init_db
import logging
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.websocket.endpoint import websocket_endpoint
# Import all models to ensure they are registered with SQLAlchemy
from app.models import (
    BaseModel, Utilisateur, Role, ResponsableRH, 
    Recruteur, Stagiaire, Entreprise, Message , Candidature , Conversation
)

# Dans votre main.py - Ajoutez du debug

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    # redirect_slashes=False
)

# DEBUG: Vérifiez ce qui est chargé
print(f"DEBUG - PROJECT_NAME: {settings.PROJECT_NAME}")
print(f"DEBUG - BACKEND_CORS_ORIGINS: {settings.BACKEND_CORS_ORIGINS}")
print(f"DEBUG - Type de BACKEND_CORS_ORIGINS: {type(settings.BACKEND_CORS_ORIGINS)}")

# Configuration CORS avec vérification
try:
    if settings.BACKEND_CORS_ORIGINS:
        print("✅ Configuration CORS avec settings...")
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.BACKEND_CORS_ORIGINS,  # Pas besoin de str() si c'est déjà une liste
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        print(f"✅ CORS configuré pour: {settings.BACKEND_CORS_ORIGINS}")
    else:
        print("⚠️ BACKEND_CORS_ORIGINS est vide!")
except Exception as e:
    print(f"❌ Erreur CORS: {e}")
    # Configuration CORS de secours
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    print("🔧 CORS de secours activé")

app.include_router(api_router, prefix=settings.API_V1_STR)

# Route WebSocket
@app.websocket("/ws")
async def websocket_route(websocket: WebSocket, token: str, db: Session = Depends(get_db)):
    await websocket_endpoint(websocket, token, db)
    
@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API de gestion des stagiaires"}

@app.on_event("startup")
async def startup_event():
    logging.basicConfig(level=logging.INFO)
    logging.info("Initialisation de l'application...")
    try:
        init_db()
        logging.info("Base de données initialisée avec succès")
    except Exception as e:
        logging.error(f"Erreur lors de l'initialisation de la base de données: {e}")