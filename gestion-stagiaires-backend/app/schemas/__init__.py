from app.schemas.base import BaseSchema
from app.schemas.utilisateur import (
    UtilisateurBase, UtilisateurCreate, UtilisateurUpdate, 
    Utilisateur, UtilisateurAuth
)
from app.schemas.role import RoleBase, RoleCreate, RoleUpdate, Role
from app.schemas.recruteur import RecruteurBase, RecruteurCreate, RecruteurUpdate, Recruteur
from app.schemas.responsable_rh import ResponsableRHBase, ResponsableRHCreate, ResponsableRHUpdate, ResponsableRH
from app.schemas.stagiaire import StagiaireBase, StagiaireCreate, StagiaireUpdate, Stagiaire
from app.schemas.entreprise import EntrepriseBase, EntrepriseCreate, EntrepriseUpdate, Entreprise
from app.schemas.auth import Token, TokenData
from app.schemas.offre import OffreBase, OffreCreate, OffreUpdate, Offre, OffreSearchResult
