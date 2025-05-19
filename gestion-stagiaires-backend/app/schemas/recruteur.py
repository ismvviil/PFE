from pydantic import BaseModel
from typing import Optional
from app.schemas.utilisateur import UtilisateurBase, UtilisateurCreate, UtilisateurUpdate, Utilisateur

class RecruteurBase(UtilisateurBase):
    poste: str
    entreprise_id: int

class RecruteurCreate(UtilisateurCreate, RecruteurBase):
    pass

class RecruteurUpdate(UtilisateurUpdate):
    poste: Optional[str] = None
    entreprise_id: Optional[int] = None

class Recruteur(Utilisateur, RecruteurBase):
    class Config:
        orm_mode = True