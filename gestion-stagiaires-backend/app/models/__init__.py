from app.models.base import BaseModel
from app.models.utilisateur import Utilisateur, utilisateur_role
from app.models.role import Role
from app.models.responsable_rh import ResponsableRH
from app.models.recruteur import Recruteur
from app.models.stagiaire import Stagiaire
from app.models.entreprise import Entreprise
from app.models.message import Message
from app.models.offre import Offre
from app.models.candidature import Candidature, StatusCandidature

from app.models.conversation import Conversation, conversation_participants
from app.models.message import Message
# Importer d'autres modèles selon besoin