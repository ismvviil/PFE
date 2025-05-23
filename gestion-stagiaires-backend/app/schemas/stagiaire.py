from pydantic import BaseModel
from typing import Optional
from app.schemas.utilisateur import UtilisateurBase, UtilisateurCreate, UtilisateurUpdate, Utilisateur

class StagiaireBase(UtilisateurBase):
    photo: Optional[str] = None

class StagiaireCreate(UtilisateurCreate, StagiaireBase):
    pass

class StagiaireUpdate(UtilisateurUpdate):
    photo: Optional[str] = None

class Stagiaire(Utilisateur, StagiaireBase):
    class Config:
        from_attributes = True  # pour permettre model_validate()