import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RHRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // ← CHANGÉ: isLoading → loading

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.type !== 'responsable_rh') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RHRoute;