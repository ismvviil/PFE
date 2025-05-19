from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Entreprise(BaseModel):
    raison_social = Column(String, nullable=False)
    secteur_activite = Column(String, nullable=False)
    description = Column(String, nullable=True)
    
    # Relations avec les utilisateurs
    recruteurs = relationship("Recruteur", back_populates="entreprise")
    responsables_rh = relationship("ResponsableRH", back_populates="entreprise")
    
    # Offres de stage
    # offres = relationship("Offre", back_populates="entreprise")
    
    # Historique des stages
    # historiques = relationship("HistoriqueStage", back_populates="entreprise")