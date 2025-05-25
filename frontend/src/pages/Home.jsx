// import React from 'react';
// import styles from './Home.module.css';

// const Home = () => {
//   return (
//     <div className={styles.homeContainer}>
//       <div className={styles.heroSection}>
//         <h1 className={styles.title}>Bienvenue sur la Plateforme de Gestion des Stagiaires</h1>
//         <p className={styles.description}>
//           Cette plateforme permet aux entreprises de gérer efficacement leurs stagiaires,
//           depuis la publication des offres de stage jusqu'à l'évaluation finale.
//         </p>
//         <div className={styles.buttonGroup}>
//           <a href="/register" className={styles.primaryBtn}>S'inscrire</a>
//           <a href="/login" className={styles.secondaryBtn}>Se connecter</a>
//         </div>
//       </div>
      
//       <div className={styles.featuresSection}>
//         <h2 className={styles.sectionTitle}>Fonctionnalités principales</h2>
//         <div className={styles.featuresGrid}>
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>📝</div>
//             <h3 className={styles.featureTitle}>Gestion des offres</h3>
//             <p className={styles.featureDescription}>Publiez et gérez facilement vos offres de stage</p>
//           </div>
          
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>👥</div>
//             <h3 className={styles.featureTitle}>Suivi des candidatures</h3>
//             <p className={styles.featureDescription}>Suivez et analysez les candidatures reçues</p>
//           </div>
          
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>📊</div>
//             <h3 className={styles.featureTitle}>Évaluation des stagiaires</h3>
//             <p className={styles.featureDescription}>Évaluez et donnez du feedback sur les performances</p>
//           </div>
          
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>🤖</div>
//             <h3 className={styles.featureTitle}>IA pour le recrutement</h3>
//             <p className={styles.featureDescription}>Utilisez l'IA pour trouver les meilleurs profils</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { FaClipboardList, FaPeopleArrows, FaChartLine, FaRobot } from 'react-icons/fa';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Bienvenue sur la Plateforme de Gestion des Stagiaires</h1>
        <p className={styles.description}>
          Cette plateforme permet aux entreprises de gérer efficacement leurs stagiaires,
          depuis la publication des offres de stage jusqu'à l'évaluation finale.
        </p>
        <div className={styles.buttonGroup}>
          <a href="/register" className={styles.primaryBtn}>S'inscrire</a>
          <a href="/login" className={styles.secondaryBtn}>Se connecter</a>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Fonctionnalités principales</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaClipboardList /></div>
            <h3 className={styles.featureTitle}>Gestion des offres</h3>
            <p className={styles.featureDescription}>Publiez et gérez facilement vos offres de stage</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaPeopleArrows /></div>
            <h3 className={styles.featureTitle}>Suivi des candidatures</h3>
            <p className={styles.featureDescription}>Suivez et analysez les candidatures reçues</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaChartLine /></div>
            <h3 className={styles.featureTitle}>Évaluation des stagiaires</h3>
            <p className={styles.featureDescription}>Évaluez et donnez du feedback sur les performances</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaRobot /></div>
            <h3 className={styles.featureTitle}>IA pour le recrutement</h3>
            <p className={styles.featureDescription}>Utilisez l'IA pour trouver les meilleurs profils</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;