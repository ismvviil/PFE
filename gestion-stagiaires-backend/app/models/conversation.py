from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel
from app.core.database import Base

# Table d'association pour les participants d'une conversation
conversation_participants = Table('conversation_participants', Base.metadata,
    Column('conversation_id', Integer, ForeignKey('conversation.id')),
    Column('participant_id', Integer, ForeignKey('utilisateur.id'))
)

class Conversation(BaseModel):
    """Modèle pour les conversations entre utilisateurs."""
    
    titre = Column(String, nullable=True)  # Titre optionnel pour les conversations de groupe
    type_conversation = Column(String, default="privee")  # "privee" ou "groupe"
    est_active = Column(Boolean, default=True)

    # Relations
    participants = relationship(
        "Utilisateur", 
        secondary=conversation_participants, 
        back_populates="conversations"
    )
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

    def get_other_participant(self, current_user_id):
        """Récupérer l'autre participant dans une conversation privée."""
        if self.type_conversation == "privee":
            for participant in self.participants:
                if participant.id != current_user_id:
                    return participant
        return None
    
    def get_last_message(self):
        """Récupérer le dernier message de la conversation."""
        if self.messages:
            return sorted(self.messages, key=lambda x: x.created_at, reverse=True)[0]
        return None
    
    def mark_as_read_for_user(self, user_id):
        """Marquer tous les messages comme lus pour un utilisateur."""
        for message in self.messages:
            if message.destinataire_id == user_id and not message.lu:
                message.lu = True