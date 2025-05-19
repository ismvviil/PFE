from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, get_db
from app.models.utilisateur import Utilisateur
from app.schemas.utilisateur import Utilisateur as UtilisateurSchema

router = APIRouter()

@router.get("/me", response_model=UtilisateurSchema)
def read_current_user(
    current_user: Utilisateur = Depends(get_current_user),
):
    """Récupérer les informations de l'utilisateur actuel."""
    return current_user