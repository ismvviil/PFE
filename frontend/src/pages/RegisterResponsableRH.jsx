import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import styles from './RegisterResponsableRH.module.css';

const RegisterResponsableRH = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    poste: '',
    entreprise_id: ''
  });
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEntreprises, setFetchingEntreprises] = useState(true);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await axios.get('/entreprises');
        setEntreprises(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
      } finally {
        setFetchingEntreprises(false);
      }
    };

    fetchEntreprises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData, 'responsable-rh');
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
        <h2 className={styles.title}>Inscription Responsable RH</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
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
            
            <div className={styles.formGroup}>
              <label htmlFor="poste">Poste</label>
              <input
                type="text"
                id="poste"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="entreprise_id">Entreprise</label>
              <select
                id="entreprise_id"
                name="entreprise_id"
                value={formData.entreprise_id}
                onChange={handleChange}
                required
                disabled={fetchingEntreprises}
                className={styles.select}
              >
                <option value="">Sélectionner une entreprise</option>
                {entreprises.map((entreprise) => (
                  <option key={entreprise.id} value={entreprise.id}>
                    {entreprise.raison_social}
                  </option>
                ))}
              </select>
              {fetchingEntreprises && <div className={styles.loadingIndicator}>Chargement des entreprises...</div>}
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

export default RegisterResponsableRH;