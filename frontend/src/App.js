import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterRecruteur from "./pages/RegisterRecruteur";
import RegisterResponsableRH from "./pages/RegisterResponsableRH";
import RegisterStagiaire from "./pages/RegisterStagiaire";
import "./App.css";
import MainLayout from "./components/MainLayout";
import RecruteurRoute from "./components/common/RecruteurRoute";
import OffreForm from "./components/offres/OffreForm.js";
import PrivateRoute from "./components/common/PrivateRoute";
import OffresList from "./components/offres/OffresList.jsx";
import OffreDetail from "./components/offres/OffreDetail.jsx";
import StagiaireRoute from "./components/common/StagiaireRoute.js";
import CandidatureForm from "./components/candidatures/CandidatureForm.js";
import MesCandidatures from "./components/candidatures/MesCandidatures.js";
import CandidaturesRecues from "./components/candidatures/CandidaturesRecues.jsx";
// import Messaging from "./pages/Messaging.jsx";
// import { NotificationProvider } from "./context/NotificationContext.jsx";

// import MessagingLayout from "./components/messaging/MessagingLayout.js";
import MessagingPage from "./pages/MessagingPage.jsx";

function App() {
  return (
    <AuthProvider>
      {/* <NotificationProvider> */}
      <Router>
        <div className="App">
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/register/recruteur"
                element={<RegisterRecruteur />}
              />
              <Route
                path="/register/responsable-rh"
                element={<RegisterResponsableRH />}
              />
              <Route
                path="/register/stagiaire"
                element={<RegisterStagiaire />}
              />
              {/* Routes protégées pour les recruteurs */}
              <Route
                path="/offres/nouvelle"
                element={
                  <RecruteurRoute>
                    <OffreForm />
                  </RecruteurRoute>
                }
              />
              <Route
                path="/offres/modifier/:offreId"
                element={
                  <RecruteurRoute>
                    <OffreForm />
                  </RecruteurRoute>
                }
              />
              <Route
                path="/offres/:offreId"
                element={
                  <PrivateRoute>
                    <OffreDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/offres"
                element={
                  <PrivateRoute>
                    <OffresList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/candidatures-recues"
                element={
                  <RecruteurRoute>
                    <CandidaturesRecues />
                  </RecruteurRoute>
                }
              />

              {/* Routes protégées pour les stagiaires */}
              <Route
                path="/offres/:offreId/postuler"
                element={
                  <StagiaireRoute>
                    <CandidatureForm />
                  </StagiaireRoute>
                }
              />
              <Route
                path="/mes-candidatures"
                element={
                  <StagiaireRoute>
                    <MesCandidatures />
                  </StagiaireRoute>
                }
              />
              {/* <Route
                path="/messages"
                element={
                  <PrivateRoute>
                    <MessagingLayout />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route
                path="/messages"
                element={
                  <PrivateRoute>
                    <Messaging />
                  </PrivateRoute>
                }
              /> */}
               {/* 🔥 ROUTE MESSAGERIE - Accessible à tous les utilisateurs connectés */}
              <Route
                path="/messages"
                element={
                  <PrivateRoute>
                    <MessagingPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </MainLayout>
        </div>
      </Router>
      {/* </NotificationProvider> */}
    </AuthProvider>
  );
}

export default App;
