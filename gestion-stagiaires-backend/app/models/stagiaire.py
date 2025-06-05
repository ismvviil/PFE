from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.models.utilisateur import Utilisateur

class Stagiaire(Utilisateur):
    __tablename__ = 'stagiaire'
    
    id = Column(Integer, ForeignKey('utilisateur.id'), primary_key=True)
    photo = Column(String, nullable=True)  # Chemin vers la photo ou URL
    
    # Candidatures soumises
    candidatures = relationship("Candidature", back_populates="stagiaire")
    
    # Missions suivies
    # missions = relationship("Mission", back_populates="stagiaire")
    
    # Feedback reçus
    # feedbacks = relationship("Evaluation", back_populates="stagiaire")
    
    # Historique des stages
    # historiques = relationship("HistoriqueStage", back_populates="stagiaire")
    
    # Remplacer la ligne commentée par :
    stages = relationship("Stage", back_populates="stagiaire")
    
    __mapper_args__ = {
        'polymorphic_identity': 'stagiaire',
    }