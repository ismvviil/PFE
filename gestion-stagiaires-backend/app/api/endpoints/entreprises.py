from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db
from app.models.entreprise import Entreprise
from app.schemas.entreprise import Entreprise as EntrepriseSchema, EntrepriseCreate

router = APIRouter()

@router.get("/", response_model=List[EntrepriseSchema])
def read_entreprises(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """Récupérer toutes les entreprises."""
    entreprises = db.query(Entreprise).offset(skip).limit(limit).all()
    return entreprises

@router.post("/", response_model=EntrepriseSchema)
def create_entreprise(
    entreprise_in: EntrepriseCreate,
    db: Session = Depends(get_db),
):
    """Créer une nouvelle entreprise."""
    entreprise = Entreprise(
        raison_social=entreprise_in.raison_social,
        secteur_activite=entreprise_in.secteur_activite,
        description=entreprise_in.description,
    )
    db.add(entreprise)
    db.commit()
    db.refresh(entreprise)
    return entreprise