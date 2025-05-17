from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis .env
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Gestion des Stagiaires API"
    API_V1_STR: str = "/api/v1"

    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "0000"
    POSTGRES_DB: str = "gestion_stagiaires"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "default_secret_key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Ajouter cette ligne pour gérer DATABASE_URL
    database_url: str = None
    
    # Configuration pour accepter tous les champs
    model_config = {
        "env_file": ".env",
        "extra": "allow"  # Permet des champs supplémentaires non définis dans le modèle
    }

settings = Settings()

# Définir SQLALCHEMY_DATABASE_URI
settings.SQLALCHEMY_DATABASE_URI = settings.database_url or f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}/{settings.POSTGRES_DB}"