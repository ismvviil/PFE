import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  // État pour suivre quelles sections sont ouvertes sur mobile
  const [openSections, setOpenSections] = useState({});

  // Fonction pour basculer l'état ouvert/fermé d'une section
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Données pour les sections de liens
  const linkSections = [
    {
      id: 'navigation',
      title: 'Navigation',
      links: [
        { href: '/', text: 'Accueil' },
        { href: '/login', text: 'Connexion' },
        { href: '/register', text: 'Inscription' }
      ]
    },
    {
      id: 'about',
      title: 'À propos',
      links: [
        { href: '/contact', text: 'Contact' },
        { href: '/cgu', text: 'CGU' },
        { href: '/confidentialite', text: 'Confidentialité' }
      ]
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <h3 className={styles.title}>Plateforme de Gestion des Stagiaires</h3>
            <p className={styles.description}>
              Solution complète pour la gestion des stagiaires en entreprise, du recrutement à l'évaluation.
            </p>
          </div>

          <div className={styles.links}>
            {linkSections.map(section => (
              <div key={section.id} className={styles.linkSection}>
                <h4 
                  className={`${styles.linkTitle} ${openSections[section.id] ? styles.open : ''}`}
                  onClick={() => toggleSection(section.id)}
                >
                  {section.title}
                </h4>
                <ul className={`${styles.linkList} ${openSections[section.id] ? styles.visible : ''}`}>
                  {section.links.map(link => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.link}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Plateforme de Gestion des Stagiaires. Tous droits réservés.
          </p>
          <p className={styles.signature}>
            Développé par SOUIFI ISMAIL & MOUATE Alaa eddine
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;