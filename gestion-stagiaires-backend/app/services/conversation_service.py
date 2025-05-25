from sqlalchemy.orm import Session
from app.models.conversation import Conversation
from app.models.utilisateur import Utilisateur
from app.models.message import Message
from sqlalchemy import func  # Ajoutez cette ligne aux imports

def get_or_create_private_conversation(db: Session, user1_id: int, user2_id: int):
    """Récupérer ou créer une conversation privée entre deux utilisateurs."""

    # Chercher si une conversation privée existe déjà entre ces deux utilisateurs
    existing_conversation = db.query(Conversation).join(
        Conversation.participants
    ).filter(
        Conversation.type_conversation == "privee"
    ).group_by(Conversation.id).having(
        func.count(Conversation.participants) == 2
    ).all()

    for conv in existing_conversation:
        participant_ids = [p.id for p in conv.participants]
        if set(participant_ids) == {user1_id, user2_id}:
            return conv
        
    # Créer une nouvelle conversation si elle n'existe pas
    user1 = db.query(Utilisateur).filter(Utilisateur.id == user1_id).first()
    user2 = db.query(Utilisateur).filter(Utilisateur.id == user2_id).first()

    if not user1 or not user2:
        return None
    
    conversation = Conversation(type_conversation="privee")
    conversation.participants.extend([user1, user2])

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation