import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterRecruteur from './pages/RegisterRecruteur';
import RegisterResponsableRH from './pages/RegisterResponsableRH';
import RegisterStagiaire from './pages/RegisterStagiaire';
import './App.css';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <MainLayout>
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/recruteur" element={<RegisterRecruteur />} />
              <Route path="/register/responsable-rh" element={<RegisterResponsableRH />} />
              <Route path="/register/stagiaire" element={<RegisterStagiaire />} />
            </Routes>
          </main>
          </MainLayout>
=        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;