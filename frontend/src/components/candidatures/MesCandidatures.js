import React, { useState, useEffect , useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getMesCandidatures,
  retirerCandidature,
} from "../../services/candidatureService";
import MaCandidatureCard from "./MaCandidatureCard";
import styles from "./MesCandidatures.module.css";
import CandidaturesStats from "./CandidaturesStats";

// const MesCandidatures = () => {
//   const { currentUser } = useAuth();
//   const [candidatures, setCandidatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [filtreStatus, setFiltreStatus] = useState("tous");

//   const statusOptions = [
//     { value: "tous", label: "Toutes" },
//     { value: "en_attente", label: "En attente" },
//     { value: "en_cours", label: "En cours d'examen" },
//     { value: "acceptee", label: "Acceptées" },
//     { value: "refusee", label: "Refusées" },
//     { value: "retiree", label: "Retirées" },
//   ];

//   const fetchCandidatures = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getMesCandidatures();
//       setCandidatures(data);
//     } catch (err) {
//       setError("Erreur lors de la récupération de vos candidatures");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCandidatures();
//   }, []);

//   const handleRetirerCandidature = async (candidatureId) => {
//     try {
//       setError("");
//       await retirerCandidature(candidatureId);
//       setSuccess("Candidature retirée avec succès");

//       // Mettre à jour la liste des candidatures
//       setCandidatures((prev) =>
//         prev.map((candidature) =>
//           candidature.id === candidatureId
//             ? { ...candidature, status: "retiree" }
//             : candidature
//         )
//       );

//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail || "Erreur lors du retrait de la candidature"
//       );
//       setTimeout(() => setError(""), 5000);
//     }
//   };

//   const candidaturesFiltrees = candidatures.filter(
//     (candidature) =>
//       filtreStatus === "tous" || candidature.status === filtreStatus
//   );

//   const getStatistiques = () => {
//     const stats = {
//       total: candidatures.length,
//       en_attente: candidatures.filter((c) => c.status === "en_attente").length,
//       en_cours: candidatures.filter((c) => c.status === "en_cours").length,
//       acceptee: candidatures.filter((c) => c.status === "acceptee").length,
//       refusee: candidatures.filter((c) => c.status === "refusee").length,
//       retiree: candidatures.filter((c) => c.status === "retiree").length,
//     };
//     return stats;
//   };

//   const stats = getStatistiques();

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <p>Chargement de vos candidatures...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.candidaturesContainer}>
//       <div className={styles.header}>
//         <h1 className={styles.pageTitle}>Mes candidatures</h1>
//         <Link to="/offres" className={styles.searchOffresButton}>
//           Rechercher de nouvelles offres
//         </Link>
//       </div>

//       {error && <div className={styles.errorMessage}>{error}</div>}
//       {success && <div className={styles.successMessage}>{success}</div>}

//       <CandidaturesStats candidatures={candidatures} type="stagiaire" />

//       {/* Filtres */}
//       <div className={styles.filtres}>
//         <div className={styles.filtreGroup}>
//           <label htmlFor="status" className={styles.filtreLabel}>
//             Filtrer par statut :
//           </label>
//           <select
//             id="status"
//             value={filtreStatus}
//             onChange={(e) => setFiltreStatus(e.target.value)}
//             className={styles.filtreSelect}
//           >
//             {statusOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.resultCount}>
//           {candidaturesFiltrees.length} candidature
//           {candidaturesFiltrees.length !== 1 ? "s" : ""} affichée
//           {candidaturesFiltrees.length !== 1 ? "s" : ""}
//         </div>
//       </div>

//       {/* Liste des candidatures */}
//       <div className={styles.candidaturesList}>
//         {candidaturesFiltrees.length === 0 ? (
//           <div className={styles.noCandidatures}>
//             {filtreStatus === "tous" ? (
//               <div className={styles.emptyCandidatures}>
//                 <h3>Aucune candidature pour le moment</h3>
//                 <p>Commencez par explorer les offres de stage disponibles</p>
//                 <Link to="/offres" className={styles.exploreButton}>
//                   Explorer les offres
//                 </Link>
//               </div>
//             ) : (
//               <div className={styles.noFilterResults}>
//                 <p>
//                   Aucune candidature avec le statut "
//                   {
//                     statusOptions.find((opt) => opt.value === filtreStatus)
//                       ?.label
//                   }
//                   "
//                 </p>
//                 <button
//                   onClick={() => setFiltreStatus("tous")}
//                   className={styles.resetFilterButton}
//                 >
//                   Afficher toutes les candidatures
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           candidaturesFiltrees.map((candidature) => (
//             <MaCandidatureCard
//               key={candidature.id}
//               candidature={candidature}
//               onRetirer={handleRetirerCandidature}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MesCandidatures;
const MesCandidatures = () => {
  const { currentUser } = useAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filtreStatus, setFiltreStatus] = useState("tous");

  const statusOptions = [
    { value: "tous", label: "Toutes" },
    { value: "en_attente", label: "En attente" },
    { value: "en_cours", label: "En cours d'examen" },
    { value: "acceptee", label: "Acceptées" },
    { value: "refusee", label: "Refusées" },
    { value: "retiree", label: "Retirées" },
  ];

  const fetchCandidatures = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMesCandidatures();
      setCandidatures(data || []);
    } catch (err) {
      setError("Erreur lors de la récupération de vos candidatures");
      console.error(err);
      setCandidatures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const handleRetirerCandidature = async (candidatureId) => {
    try {
      setError("");
      await retirerCandidature(candidatureId);
      setSuccess("Candidature retirée avec succès");

      // Mettre à jour la liste des candidatures
      setCandidatures((prev) =>
        prev.map((candidature) =>
          candidature.id === candidatureId
            ? { 
                ...candidature, 
                status: "retiree",
                date_fin: new Date().toISOString()
              }
            : candidature
        )
      );

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur lors du retrait de la candidature"
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const candidaturesFiltrees = useMemo(() => {
    return candidatures.filter(
      (candidature) =>
        filtreStatus === "tous" || candidature.status === filtreStatus
    );
  }, [candidatures, filtreStatus]);

  const stats = useMemo(() => {
    return {
      total: candidatures.length,
      en_attente: candidatures.filter((c) => c.status === "en_attente").length,
      en_cours: candidatures.filter((c) => c.status === "en_cours").length,
      acceptee: candidatures.filter((c) => c.status === "acceptee").length,
      refusee: candidatures.filter((c) => c.status === "refusee").length,
      retiree: candidatures.filter((c) => c.status === "retiree").length,
    };
  }, [candidatures]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Chargement de vos candidatures...</p>
      </div>
    );
  }

  return (
    <div className={styles.candidaturesContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Mes candidatures</h1>
        <Link to="/offres" className={styles.searchOffresButton}>
          Rechercher de nouvelles offres
        </Link>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <CandidaturesStats candidatures={candidatures} type="stagiaire" />

      {/* Filtres */}
      <div className={styles.filtres}>
        <div className={styles.filtreGroup}>
          <label htmlFor="status" className={styles.filtreLabel}>
            Filtrer par statut :
          </label>
          <select
            id="status"
            value={filtreStatus}
            onChange={(e) => setFiltreStatus(e.target.value)}
            className={styles.filtreSelect}
            aria-label="Filtrer les candidatures par statut"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.resultCount}>
          {candidaturesFiltrees.length} candidature
          {candidaturesFiltrees.length !== 1 ? "s" : ""} affichée
          {candidaturesFiltrees.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className={styles.candidaturesList}>
        {candidaturesFiltrees.length === 0 ? (
          <div className={styles.noCandidatures}>
            {filtreStatus === "tous" ? (
              <div className={styles.emptyCandidatures}>
                <h3>Aucune candidature pour le moment</h3>
                <p>Commencez par explorer les offres de stage disponibles</p>
                <Link to="/offres" className={styles.exploreButton}>
                  Explorer les offres
                </Link>
              </div>
            ) : (
              <div className={styles.noFilterResults}>
                <p>
                  Aucune candidature avec le statut "
                  {statusOptions.find((opt) => opt.value === filtreStatus)?.label}"
                </p>
                <button
                  onClick={() => setFiltreStatus("tous")}
                  className={styles.resetFilterButton}
                >
                  Afficher toutes les candidatures
                </button>
              </div>
            )}
          </div>
        ) : (
          candidaturesFiltrees.map((candidature) => (
            <MaCandidatureCard
              key={candidature.id}
              candidature={candidature}
              onRetirer={handleRetirerCandidature}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MesCandidatures;