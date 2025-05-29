import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier si un token existe dans localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Récupérer les informations de l'utilisateur à partir du localStorage
      const userStr = localStorage.getItem("user");
      // if (userStr) {
      //   try {
      //     const userObj = JSON.parse(userStr);
      //     setCurrentUser(userObj);
      //   } catch (err) {
      //     console.error('Erreur lors de l\'analyse des données utilisateur:', err);
      //     localStorage.removeItem('user');
      //     localStorage.removeItem('token');
      //   }
      // } else {
      //   // Si aucune information utilisateur n'est disponible, récupérer depuis l'API
      //   const getUserInfo = async () => {
      //     try {
      //       const response = await axios.get('/users/me', {
      //         headers: {
      //           'Authorization': `Bearer ${token}`
      //         }
      //       });

      //       const userData = response.data;
      //       setCurrentUser({
      //         id: userData.id,
      //         email: userData.email,
      //         nom: userData.nom,
      //         prenom: userData.prenom,
      //         type: userData.type
      //       });

      //       // Stocker les informations utilisateur dans localStorage
      //       localStorage.setItem('user', JSON.stringify({
      //         id: userData.id,
      //         email: userData.email,
      //         nom: userData.nom,
      //         prenom: userData.prenom,
      //         type: userData.type
      //       }));
      //     } catch (err) {
      //       console.error('Erreur lors de la récupération des informations utilisateur:', err);
      //       // Si le token est invalide ou expiré, on le supprime
      //       localStorage.removeItem('token');
      //       localStorage.removeItem('user');
      //     } finally {
      //       setLoading(false);
      //     }
      //   };

      //   getUserInfo();
      // }
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setCurrentUser(userObj);
          setLoading(false); // 👉 ajoute ceci ici
        } catch (err) {
          console.error(
            "Erreur lors de l'analyse des données utilisateur:",
            err
          );
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setLoading(false); // 👉 ajoute aussi ici, sinon ça reste bloqué en cas d'erreur
        }
      } else {
        const getUserInfo = async () => {
          try {
            const response = await axios.get("/users/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const userData = response.data;
            setCurrentUser({
              id: userData.id,
              email: userData.email,
              nom: userData.nom,
              prenom: userData.prenom,
              type: userData.type,
              entreprise_id: userData.entreprise_id, 
            });

            localStorage.setItem(
              "user",
              JSON.stringify({
                id: userData.id,
                email: userData.email,
                nom: userData.nom,
                prenom: userData.prenom,
                type: userData.type,
                entreprise_id: userData.entreprise_id,
              })
            );
          } catch (err) {
            console.error(
              "Erreur lors de la récupération des informations utilisateur:",
              err
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } finally {
            setLoading(false); // ✅ ici c'est déjà bon
          }
        };

        getUserInfo();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);

      // Utiliser FormData au lieu de JSON pour l'authentification OAuth2
      const formData = new FormData();
      formData.append("username", email); // FastAPI OAuth2 attend 'username'
      formData.append("password", password);

      const response = await axios.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;

      // Stocker le token dans localStorage
      localStorage.setItem("token", access_token);

      // Configurer Axios pour inclure le token dans les en-têtes
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      // Récupérer les informations de l'utilisateur
      const userResponse = await axios.get("/users/me");
      const userData = userResponse.data;

      // Stocker les informations utilisateur
      setCurrentUser({
        id: userData.id,
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
        type: userData.type,
        entreprise_id: userData.entreprise_id, 

      });

      // Stocker les informations utilisateur dans localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          nom: userData.nom,
          prenom: userData.prenom,
          type: userData.type,
          entreprise_id: userData.entreprise_id, 
        })
      );

      return true;
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      const errorMsg =
        err.response?.data?.detail ||
        "Une erreur est survenue lors de la connexion";
      setError(
        typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
      );
      return false;
    }
  };

  const register = async (userData, userType) => {
    try {
      setError(null);
      const response = await axios.post(`/auth/register/${userType}`, userData);
      return response.data;
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      const errorMsg =
        err.response?.data?.detail ||
        "Une erreur est survenue lors de l'inscription";
      setError(
        typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
      );
      throw err;
    }
  };

  const logout = () => {
    // Supprimer le token et les informations utilisateur du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Réinitialiser l'état de l'utilisateur
    setCurrentUser(null);

    // Supprimer le token des en-têtes Axios
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fonction pour initialiser l'authentification
//   const initializeAuth = async () => {
//     console.log('🔄 Initialisation de l\'authentification...');
    
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         console.log('❌ Aucun token trouvé');
//         setCurrentUser(null);
//         return;
//       }

//       // Vérifier si on a déjà les données utilisateur en cache
//       const cachedUser = localStorage.getItem('currentUser');
//       if (cachedUser) {
//         const userData = JSON.parse(cachedUser);
//         setCurrentUser(userData);
//         console.log('✅ Utilisateur chargé depuis le cache:', userData.email);
//         return;
//       }

//       // Vérifier le token avec le backend
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const response = await axios.get('http://localhost:5000/api/auth/me');
      
//       if (response.data) {
//         setCurrentUser(response.data);
//         localStorage.setItem('currentUser', JSON.stringify(response.data));
//         console.log('✅ Utilisateur authentifié:', response.data.email);
//       }
//     } catch (error) {
//       console.error('❌ Erreur d\'authentification:', error);
//       // Token invalide - nettoyer
//       localStorage.removeItem('token');
//       localStorage.removeItem('currentUser');
//       delete axios.defaults.headers.common['Authorization'];
//       setCurrentUser(null);
//       setError('Session expirée');
//     } finally {
//       setLoading(false);
//       console.log('🏁 Authentification terminée');
//     }
//   };

//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   // Fonction de connexion
//   const login = async (email, password) => {
//     setError(null);
//     setLoading(true);
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password
//       });

//       const { token, user } = response.data;
      
//       // Sauvegarder le token et l'utilisateur
//       localStorage.setItem('token', token);
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       setCurrentUser(user);
//       console.log('✅ Connexion réussie:', user.email);
      
//       return true;
//     } catch (error) {
//       console.error('❌ Erreur de connexion:', error);
//       setError(error.response?.data?.message || 'Erreur de connexion');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fonction de déconnexion
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     delete axios.defaults.headers.common['Authorization'];
//     setCurrentUser(null);
//     setError(null);
//     console.log('👋 Déconnexion effectuée');
//   };

//   const value = {
//     currentUser,
//     loading,
//     error,
//     login,
//     logout,
//     isAuthenticated: !!currentUser
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth doit être utilisé dans un AuthProvider');
//   }
//   return context;
// };