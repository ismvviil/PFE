from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints.router import api_router
from app.db import init_db
import logging

# Import all models to ensure they are registered with SQLAlchemy
from app.models import (
    BaseModel, Utilisateur, Role, ResponsableRH, 
    Recruteur, Stagiaire, Entreprise, Message
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

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