from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.core.config import settings
from app.core.security import create_access_token, verify_password, get_password_hash
from app.models.utilisateur import Utilisateur
from app.models.role import Role
from app.models.entreprise import Entreprise
from app.models.recruteur import Recruteur
from app.models.responsable_rh import ResponsableRH
from app.models.stagiaire import Stagiaire
from app.schemas.auth import Token
from app.schemas.utilisateur import UtilisateurCreate, Utilisateur as UtilisateurSchema
from app.schemas.recruteur import RecruteurCreate
from app.schemas.responsable_rh import ResponsableRHCreate
from app.schemas.stagiaire import StagiaireCreate
from typing import Any

router = APIRouter()

@router.post("/login", response_model=Token)
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
) -> Any:
    """Obtenir un token d'accès pour l'authentification future."""
    # Debug - afficher les données reçues
    print(f"Tentative de connexion avec: {form_data.username}")
    
    # Recherche de l'utilisateur par email
    user = db.query(Utilisateur).filter(Utilisateur.email == form_data.username).first()
    
    # Vérification que l'utilisateur existe
    if user is None:
        print("Utilisateur non trouvé")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Vérification du mot de passe
    if not verify_password(form_data.password, user.mot_de_passe):
        print("Mot de passe incorrect")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Vérification que l'utilisateur est actif
    if not user.actif:
        print("Utilisateur inactif")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Utilisateur inactif"
        )
    
    # Création du token d'accès
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        user.email, expires_delta=access_token_expires
    )
    
    print(f"Connexion réussie pour: {user.email}")
    return {
        "access_token": token,
        "token_type": "bearer",
    }

@router.post("/register/recruteur", response_model=UtilisateurSchema)
def register_recruteur(
    *, db: Session = Depends(get_db), recruteur_in: RecruteurCreate
) -> Any:
    """Enregistrer un nouveau recruteur."""
    # Vérification que l'email n'est pas déjà utilisé
    user = db.query(Utilisateur).filter(Utilisateur.email == recruteur_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet email est déjà utilisé."
        )
    
    # Vérification que l'entreprise existe
    entreprise = db.query(Entreprise).filter(Entreprise.id == recruteur_in.entreprise_id).first()
    if not entreprise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entreprise non trouvée"
        )
    
    # Création du recruteur
    recruteur = Recruteur(
        email=recruteur_in.email,
        mot_de_passe=get_password_hash(recruteur_in.mot_de_passe),
        nom=recruteur_in.nom,
        prenom=recruteur_in.prenom,
        poste=recruteur_in.poste,
        entreprise_id=recruteur_in.entreprise_id
    )
    db.add(recruteur)
    db.commit()
    db.refresh(recruteur)
    return recruteur

@router.post("/register/responsable-rh", response_model=UtilisateurSchema)
def register_responsable_rh(
    *, db: Session = Depends(get_db), responsable_in: ResponsableRHCreate
) -> Any:
    """Enregistrer un nouveau responsable RH."""
    # Vérification que l'email n'est pas déjà utilisé
    user = db.query(Utilisateur).filter(Utilisateur.email == responsable_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet email est déjà utilisé."
        )
    
    # Vérification que l'entreprise existe
    entreprise = db.query(Entreprise).filter(Entreprise.id == responsable_in.entreprise_id).first()
    if not entreprise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entreprise non trouvée"
        )
    
    # Création du responsable RH
    responsable = ResponsableRH(
        email=responsable_in.email,
        mot_de_passe=get_password_hash(responsable_in.mot_de_passe),
        nom=responsable_in.nom,
        prenom=responsable_in.prenom,
        poste=responsable_in.poste,
        entreprise_id=responsable_in.entreprise_id
    )
    db.add(responsable)
    db.commit()
    db.refresh(responsable)
    return responsable

@router.post("/register/stagiaire", response_model=UtilisateurSchema)
def register_stagiaire(
    *, db: Session = Depends(get_db), stagiaire_in: StagiaireCreate
) -> Any:
    """Enregistrer un nouveau stagiaire."""
    # Vérification que l'email n'est pas déjà utilisé
    user = db.query(Utilisateur).filter(Utilisateur.email == stagiaire_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet email est déjà utilisé."
        )
    
    # Création du stagiaire
    stagiaire = Stagiaire(
        email=stagiaire_in.email,
        mot_de_passe=get_password_hash(stagiaire_in.mot_de_passe),
        nom=stagiaire_in.nom,
        prenom=stagiaire_in.prenom,
        photo=stagiaire_in.photo
    )
    db.add(stagiaire)
    db.commit()
    db.refresh(stagiaire)
    return stagiaire