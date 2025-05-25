import os
import uuid
from pathlib import Path
from fastapi import UploadFile
from app.core.config import settings


# Configuration des dossiers de stockage
UPLOAD_DIR = Path("uploads")
CV_DIR = UPLOAD_DIR / "cv"
LETTRES_DIR = UPLOAD_DIR / "lettres"

# Créer les dossiers s'ils n'existent pas
CV_DIR.mkdir(parents=True, exist_ok=True)
LETTRES_DIR.mkdir(parents=True, exist_ok=True)


# Extensions de fichiers autorisées
ALLOWED_CV_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_LETTER_EXTENSIONS = {".pdf", ".doc", ".docx", ".txt"}

def generate_unique_filename(original_filename: str) -> str:
    """Générer un nom de fichier unique."""
    file_extension = Path(original_filename).suffix.lower()
    unique_id = str(uuid.uuid4())
    return f"{unique_id}{file_extension}"

def is_allowed_file(filename: str, allowed_extensions: set) -> bool:
    """Vérifier si l'extension du fichier est autorisée."""
    return Path(filename).suffix.lower() in allowed_extensions

async def save_cv_file(file: UploadFile) -> str:
    """Sauvegarder le fichier CV et retourner le chemin."""
    if not is_allowed_file(file.filename, ALLOWED_CV_EXTENSIONS):
        raise ValueError(f"Extension de fichier non autorisée pour le CV: {Path(file.filename).suffix}")
    
    filename = generate_unique_filename(file.filename)
    file_path = CV_DIR / filename
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return str(file_path)

async def save_letter_file(file: UploadFile) -> str:
    """Sauvegarder le fichier lettre de motivation et retourner le chemin."""
    if not is_allowed_file(file.filename, ALLOWED_LETTER_EXTENSIONS):
        raise ValueError(f"Extension de fichier non autorisée pour la lettre: {Path(file.filename).suffix}")
    
    filename = generate_unique_filename(file.filename)
    file_path = LETTRES_DIR / filename
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return str(file_path)

def delete_file(file_path: str) -> bool:
    """Supprimer un fichier du système de fichiers."""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    except Exception as e:
        print(f"Erreur lors de la suppression du fichier {file_path}: {e}")
        return False