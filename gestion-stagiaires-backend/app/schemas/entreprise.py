from pydantic import BaseModel
from typing import Optional, List
from app.schemas.base import BaseSchema

class EntrepriseBase(BaseModel):
    raison_social: str
    secteur_activite: str
    description: Optional[str] = None

class EntrepriseCreate(EntrepriseBase):
    pass

class EntrepriseUpdate(BaseModel):
    raison_social: Optional[str] = None
    secteur_activite: Optional[str] = None
    description: Optional[str] = None

class Entreprise(EntrepriseBase, BaseSchema):
    class Config:
        orm_mode = True