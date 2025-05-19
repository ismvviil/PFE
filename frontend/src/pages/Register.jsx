import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Inscription</h2>
      
      <div className={styles.registerOptions}>
        <div className={styles.registerOption}>
          <div className={styles.optionIcon}>👔</div>
          <h3 className={styles.optionTitle}>Recruteur</h3>
          <p className={styles.optionDescription}>
            Inscrivez-vous en tant que recruteur pour publier des offres de stage et gérer les candidatures.
          </p>
          <Link to="/register/recruteur" className={styles.registerBtn}>
            S'inscrire en tant que recruteur
          </Link>
        </div>
        
        <div className={styles.registerOption}>
          <div className={styles.optionIcon}>📊</div>
          <h3 className={styles.optionTitle}>Responsable RH</h3>
          <p className={styles.optionDescription}>
            Inscrivez-vous en tant que responsable RH pour gérer les stagiaires et générer des certificats.
          </p>
          <Link to="/register/responsable-rh" className={styles.registerBtn}>
            S'inscrire en tant que responsable RH
          </Link>
        </div>
        
        <div className={styles.registerOption}>
          <div className={styles.optionIcon}>🎓</div>
          <h3 className={styles.optionTitle}>Stagiaire</h3>
          <p className={styles.optionDescription}>
            Inscrivez-vous en tant que stagiaire pour postuler à des offres de stage et suivre vos missions.
          </p>
          <Link to="/register/stagiaire" className={styles.registerBtn}>
            S'inscrire en tant que stagiaire
          </Link>
        </div>
      </div>
      
      <p className={styles.loginRedirect}>
        Vous avez déjà un compte ?{' '}
        <Link to="/login" className={styles.loginLink}>Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;