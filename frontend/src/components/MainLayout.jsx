import React from 'react';
import { useAuth } from '../context/AuthContext';
import TopNavbar from './layout/TopNavbar';
import Sidebar from './layout/Sidebar';
import Footer from './layout/Footer';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.layout}>
      {currentUser ? (
        // Layout avec sidebar pour utilisateurs connectés
        <div className={styles.dashboardLayout}>
          <Sidebar />
          <main className={`${styles.mainContent} container`}>
            {children}
          </main>
        </div>
      ) : (
        // Layout avec navbar et footer pour visiteurs
        <div className={styles.visitorLayout}>
          <TopNavbar />
          <main className={`${styles.visitorContent} container`}>
            {children}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainLayout;