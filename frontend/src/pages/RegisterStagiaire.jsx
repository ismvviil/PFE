import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './RegisterStagiaire.module.css';

const RegisterStagiaire = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Pour prévisualiser l'image
      setPreviewUrl(URL.createObjectURL(file));
      // Pour stocker l'image dans formData
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData, 'stagiaire');
      navigate('/login');
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Inscription Stagiaire</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formColumns}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="mot_de_passe">Mot de passe</label>
                <input
                  type="password"
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>
            
            <div className={styles.formColumn}>
              <div className={styles.photoUploadContainer}>
                <label htmlFor="photo" className={styles.photoLabel}>Photo de profil</label>
                
                <div className={styles.photoPreviewContainer}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Prévisualisation" className={styles.photoPreview} />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <span className={styles.photoIcon}>📷</span>
                      <span>Photo de profil</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.fileInputContainer}>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  <label htmlFor="photo" className={styles.fileInputButton}>
                    {previewUrl ? 'Changer la photo' : 'Sélectionner une photo'}
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
        
        <p className={styles.loginRedirect}>
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className={styles.loginLink}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterStagiaire;