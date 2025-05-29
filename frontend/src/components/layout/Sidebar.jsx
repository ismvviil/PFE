import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Sidebar.module.css";
// import { useNotificationContext } from '../../context/NotificationContext';
import { useConversations } from "../../hooks/useConversations"; // 🔥 NOUVEAU HOOK

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const { unreadCount } = useConversations();

  // Détecte si l'écran est mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    // Pour les routes d'offres, on vérifie si le chemin actuel commence par la route
    if (path === "/offres" && location.pathname.startsWith("/offres")) {
      return styles.active;
    }
    // Pour les autres routes, vérification exacte
    return location.pathname === path ? styles.active : "";
  };

  // Définir les liens de navigation en fonction du type d'utilisateur
  const getNavLinks = () => {
    const links = [{ path: "/", icon: "🏠", label: "Accueil" }];

    if (currentUser.type === "recruteur") {
      links.push(
        { path: "/offres", icon: "📝", label: "Mes Offres" },
        { path: "/offres/nouvelle", icon: "➕", label: "Nouvelle Offre" },
        { path: "/candidatures-recues", icon: "📋", label: "Candidatures" },
        // { path: '/messages', icon: '💬', label: 'Messages', badge: unreadCount > 0 ? unreadCount : null }
        {
          path: "/messages",
          icon: "💬",
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
        }
      );
    } else if (currentUser.type === "responsable_rh") {
      links.push(
        // { path: "/offres", icon: "📝", label: "Toutes les Offres" }, // RH peut voir toutes les offres
        { path: "/stagiaires", icon: "👥", label: "Stagiaires" },
        { path: "/certificats", icon: "🎓", label: "Certificats" },
        { path: "/rapports", icon: "📊", label: "Rapports" },
        // { path: '/messages', icon: '💬', label: 'Messages', badge: unreadCount > 0 ? unreadCount : null }
        {
          path: "/messages",
          icon: "💬",
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
        }
      );
    } else if (currentUser.type === "stagiaire") {
      links.push(
        { path: "/offres", icon: "🔍", label: "Offres Disponibles" }, // Stagiaires voient les offres disponibles
        { path: "/mes-candidatures", icon: "📋", label: "Mes andidatures" },
        { path: "/mes-stages", icon: "📚", label: "Mes Stages" },
        // { path: '/messages', icon: '💬', label: 'Messages', badge: unreadCount > 0 ? unreadCount : null }
        {
          path: "/messages",
          icon: "💬",
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
        }
      );
    }

    links.push({ path: "/profile", icon: "👤", label: "Profil" });
    return links;
  };

  const navLinks = getNavLinks();
  const bottomNavLinks = navLinks.slice(0, Math.min(4, navLinks.length)); // Max 4 items for bottom nav

  return (
    <>
      {/* Overlay pour mobile lorsque le menu est ouvert */}
      <div
        className={`${styles.overlay} ${collapsed ? styles.active : ""}`}
        onClick={toggleSidebar}
      />

      {/* Bouton hamburger mobile */}
      {isMobile && (
        <button className={styles.mobileToggle} onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Bouton profil mobile */}
      {isMobile && (
        <Link to="/profile" className={styles.mobileProfileBtn}>
          {currentUser.photo ? (
            <img src={currentUser.photo} alt="Profil" />
          ) : (
            <div className={styles.avatarInitial}>
              {currentUser.prenom?.charAt(0) || "U"}
            </div>
          )}
        </Link>
      )}

      {/* Sidebar principale */}
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logo}>
            {collapsed && !isMobile ? "GS" : "Gestion des Stagiaires"}
          </Link>
          <button className={styles.toggleBtn} onClick={toggleSidebar}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {currentUser.photo ? (
              <img src={currentUser.photo} alt="Avatar" />
            ) : (
              <div className={styles.avatarInitial}>
                {currentUser.prenom?.charAt(0) || "U"}
              </div>
            )}
          </div>
          {!collapsed && (
            <div className={styles.userDetails}>
              <div
                className={styles.userName}
              >{`${currentUser.prenom} ${currentUser.nom}`}</div>
              <div className={styles.userRole}>
                {currentUser.type === "recruteur" && "Recruteur"}
                {currentUser.type === "responsable_rh" && "Responsable RH"}
                {currentUser.type === "stagiaire" && "Stagiaire"}
              </div>
            </div>
          )}
        </div>

        <ul className={styles.navMenu}>
          {navLinks.map((link) => (
            <li key={link.path} className={styles.navItem}>
              {/* <Link
                to={link.path}
                className={`${styles.navLink} ${isActive(link.path)}`}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                {(!collapsed || isMobile) && (
                  <span className={styles.navText}>{link.label}</span>
                )}
              </Link> */}
              <Link
                to={link.path}
                className={`${styles.navLink} ${isActive(link.path)}`}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                {(!collapsed || isMobile) && (
                  <>
                    <span className={styles.navText}>{link.label}</span>
                    {/* 🔥 BADGE POUR LES MESSAGES NON LUS */}
                    {link.badge && link.badge > 0 && (
                      <span className={styles.navBadge}>{link.badge}</span>
                    )}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.navIcon}>🚪</span>
            {(!collapsed || isMobile) && (
              <span className={styles.navText}>Déconnexion</span>
            )}
          </button>
        </div>
        {/* //////////// */}

        {/* //////// */}
      </div>

      {/* Bottom Navigation Bar pour mobile */}
      {isMobile && (
        <div className={styles.bottomBar}>
          <div className={styles.bottomBarItems}>
            {bottomNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.bottomBarItem} ${isActive(link.path)}`}
              >
                <span className={styles.bottomBarIcon}>{link.icon}
                  {/* 🔥 BADGE MOBILE POUR MESSAGES */}
                  {link.badge && link.badge > 0 && (
                    <span className={styles.mobileBadge}>{link.badge}</span>
                  )}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Bouton pour ouvrir le drawer avec plus d'options */}
            {navLinks.length > 4 && (
              <button className={styles.bottomBarItem} onClick={toggleDrawer}>
                <span className={styles.bottomBarIcon}>•••</span>
                <span>Plus</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Drawer pour les options supplémentaires sur mobile */}
      {isMobile && navLinks.length > 4 && (
        <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
          <div className={styles.drawerHandle} />
          <ul className={styles.navMenu}>
            {navLinks.slice(4).map((link) => (
              <li key={link.path} className={styles.navItem}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path)}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className={styles.navIcon}>{link.icon}</span>
                  <span className={styles.navText}>{link.label}</span>
                </Link>
              </li>
            ))}
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <span className={styles.navIcon}>🚪</span>
                <span className={styles.navText}>Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
