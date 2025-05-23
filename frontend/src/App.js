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
function App() {
  return (
    <AuthProvider>
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
            </Routes>
          </MainLayout>
          ={" "}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
