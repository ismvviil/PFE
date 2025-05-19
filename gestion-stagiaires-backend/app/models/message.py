from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel

class Message(BaseModel):
    contenu = Column(Text, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Clés étrangères
    emetteur_id = Column(Integer, ForeignKey("utilisateur.id"), nullable=False)
    destinataire_id = Column(Integer, ForeignKey("utilisateur.id"), nullable=False)
    
    # Relations
    emetteur = relationship("Utilisateur", foreign_keys=[emetteur_id], back_populates="messages_envoyes")
    destinataire = relationship("Utilisateur", foreign_keys=[destinataire_id], back_populates="messages_recus")