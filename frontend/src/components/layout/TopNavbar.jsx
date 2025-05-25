// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './TopNavbar.module.css';

// const TopNavbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logo}>
//           Gestion des Stagiaires
//         </Link>
        
//         <ul className={styles.navMenu}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>
//               Accueil
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/login" className={styles.navLink}>
//               Connexion
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
//               Inscription
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default TopNavbar;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopNavbar.module.css'; // Updated CSS module file name

// const TopNavbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logo}>
//           <img src="/img_withwritewhite.png" alt="Logo" className={styles.logoImg} />
//           <img src="/img_withwriteblack.png" alt="Logo" className={styles.logoImg} />
//         </Link>
        
//         <ul className={styles.navMenu}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>Accueil</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/login" className={styles.navLink}>Connexion</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
//               Inscription
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
const TopNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={`${styles.logo} ${styles.fadeScale}`}>
          <img 
            src="/img_withwritewhite.png" 
            alt="Logo White" 
            className={`${styles.logoImg} ${styles.logoDefault}`} 
          />
          <img 
            src="/img_withwriteblack.png" 
            alt="Logo Black" 
            className={`${styles.logoImg} ${styles.logoHover}`} 
          />
        </Link>
                
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Accueil</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/login" className={styles.navLink}>Connexion</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
              Inscription
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default TopNavbar;