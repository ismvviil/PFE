import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Gestion des Stagiaires
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-links">
              Inscription
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;