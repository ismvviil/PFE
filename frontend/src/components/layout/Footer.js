import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Plateforme de Gestion des Stagiaires. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;