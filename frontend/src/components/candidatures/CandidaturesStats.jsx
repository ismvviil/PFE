// import React from "react";
// import styles from "./CandidaturesStats.module.css";

// const CandidaturesStats = ({ candidatures, type = "recruteur" }) => {
//   const getStatistiques = () => {
//     const stats = {
//       total: candidatures.length,
//       en_attente: candidatures.filter((c) => c.status === "en_attente").length,
//       en_cours: candidatures.filter((c) => c.status === "en_cours").length,
//       acceptee: candidatures.filter((c) => c.status === "acceptee").length,
//       refusee: candidatures.filter((c) => c.status === "refusee").length,
//       retiree: candidatures.filter((c) => c.status === "retiree").length,
//     };

//     // Calculs pour les recruteurs
//     if (type === "recruteur") {
//       stats.traitees = stats.acceptee + stats.refusee;
//       stats.en_traitement = stats.en_attente + stats.en_cours;
//       stats.taux_acceptation =
//         stats.total > 0
//           ? ((stats.acceptee / (stats.acceptee + stats.refusee)) * 100).toFixed(
//               1
//             )
//           : 0;
//       stats.note_moyenne =
//         candidatures.filter((c) => c.note_recruteur).length > 0
//           ? (
//               candidatures
//                 .filter((c) => c.note_recruteur)
//                 .reduce((sum, c) => sum + c.note_recruteur, 0) /
//               candidatures.filter((c) => c.note_recruteur).length
//             ).toFixed(1)
//           : 0;
//     }

//     return stats;
//   };

//   const stats = getStatistiques();

//   const getProgressPercentage = (value, total) => {
//     return total > 0 ? (value / total) * 100 : 0;
//   };

//   return (
//     <div className={styles.statsContainer}>
//       <div className={styles.mainStats}>
//         <div className={`${styles.statCard} ${styles.total}`}>
//           <div className={styles.statIcon}>📊</div>
//           <div className={styles.statContent}>
//             <div className={styles.statNumber}>{stats.total}</div>
//             <div className={styles.statLabel}>
//               {type === "stagiaire"
//                 ? "Candidatures envoyées"
//                 : "Candidatures reçues"}
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.statCard} ${styles.pending}`}>
//           <div className={styles.statIcon}>⏳</div>
//           <div className={styles.statContent}>
//             <div className={styles.statNumber}>{stats.en_attente}</div>
//             <div className={styles.statLabel}>En attente</div>
//             <div className={styles.statProgress}>
//               <div
//                 className={styles.progressBar}
//                 style={{
//                   width: `${getProgressPercentage(
//                     stats.en_attente,
//                     stats.total
//                   )}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.statCard} ${styles.inProgress}`}>
//           <div className={styles.statIcon}>🔍</div>
//           <div className={styles.statContent}>
//             <div className={styles.statNumber}>{stats.en_cours}</div>
//             <div className={styles.statLabel}>En cours</div>
//             <div className={styles.statProgress}>
//               <div
//                 className={styles.progressBar}
//                 style={{
//                   width: `${getProgressPercentage(
//                     stats.en_cours,
//                     stats.total
//                   )}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.statCard} ${styles.accepted}`}>
//           <div className={styles.statIcon}>✅</div>
//           <div className={styles.statContent}>
//             <div className={styles.statNumber}>{stats.acceptee}</div>
//             <div className={styles.statLabel}>Acceptées</div>
//             <div className={styles.statProgress}>
//               <div
//                 className={styles.progressBar}
//                 style={{
//                   width: `${getProgressPercentage(
//                     stats.acceptee,
//                     stats.total
//                   )}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.statCard} ${styles.rejected}`}>
//           <div className={styles.statIcon}>❌</div>
//           <div className={styles.statContent}>
//             <div className={styles.statNumber}>{stats.refusee}</div>
//             <div className={styles.statLabel}>Refusées</div>
//             <div className={styles.statProgress}>
//               <div
//                 className={styles.progressBar}
//                 style={{
//                   width: `${getProgressPercentage(
//                     stats.refusee,
//                     stats.total
//                   )}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {type === "stagiaire" && (
//           <div className={`${styles.statCard} ${styles.withdrawn}`}>
//             <div className={styles.statIcon}>🚫</div>
//             <div className={styles.statContent}>
//               <div className={styles.statNumber}>{stats.retiree}</div>
//               <div className={styles.statLabel}>Retirées</div>
//               <div className={styles.statProgress}>
//                 <div
//                   className={styles.progressBar}
//                   style={{
//                     width: `${getProgressPercentage(
//                       stats.retiree,
//                       stats.total
//                     )}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {type === "recruteur" && stats.total > 0 && (
//         <div className={styles.additionalStats}>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>📈</div>
//             <div className={styles.statContent}>
//               <div className={styles.statNumber}>{stats.taux_acceptation}%</div>
//               <div className={styles.statLabel}>Taux d'acceptation</div>
//             </div>
//           </div>

//           {stats.note_moyenne > 0 && (
//             <div className={styles.statCard}>
//               <div className={styles.statIcon}>⭐</div>
//               <div className={styles.statContent}>
//                 <div className={styles.statNumber}>{stats.note_moyenne}/10</div>
//                 <div className={styles.statLabel}>Note moyenne</div>
//               </div>
//             </div>
//           )}

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>⚙️</div>
//             <div className={styles.statContent}>
//               <div className={styles.statNumber}>{stats.en_traitement}</div>
//               <div className={styles.statLabel}>À traiter</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidaturesStats;


import React from "react";
// import {
//   // Material Design Icons - Plus professionnels
//   MdBarChart,
//   MdPending,
//   MdSearchOff,
//   MdCheckCircle,
//   MdCancel,
//   MdRemoveCircle,
//   MdTrendingUp,
//   MdStar,
//   MdSettings,
  
//   // Business Icons
//   BsFileText,
//   BsClockHistory,
//   BsEye,
//   BsCheck2Circle,
//   BsXCircle,
//   BsSlash,
//   BsTrendingUp,
//   BsStarFill,
//   BsGear,
  
//   // Heroicons - Très propres
//   HiOutlineDocumentText,
//   HiOutlineClock,
//   HiOutlineEye,
//   HiOutlineCheckCircle,
//   HiOutlineXCircle,
//   HiOutlineMinusCircle,
//   HiOutlineTrendingUp,
//   HiOutlineStar,
//   HiOutlineCog,
  
//   // Feather Icons - Minimalistes
//   FiFileText,
//   FiClock,
//   FiEye,
//   FiCheckCircle,
//   FiXCircle,
//   FiMinusCircle,
//   FiTrendingUp,
//   FiStar,
//   FiSettings
// } from "react-icons/md";
// import { BsFileText, BsClockHistory, BsEye, BsCheck2Circle, BsXCircle, BsSlash, BsTrendingUp, BsStarFill, BsGear } from "react-icons/bs";
import { HiOutlineDocumentText, HiOutlineClock, HiOutlineEye, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineMinusCircle, HiOutlineTrendingUp, HiOutlineStar, HiOutlineCog } from "react-icons/hi";
// import { FiFileText, FiClock, FiEye, FiCheckCircle, FiXCircle, FiMinusCircle, FiTrendingUp, FiStar, FiSettings } from "react-icons/fi";

import styles from "./CandidaturesStats.module.css";

const CandidaturesStats = ({ candidatures, type = "recruteur" }) => {
  const getStatistiques = () => {
    const stats = {
      total: candidatures.length,
      en_attente: candidatures.filter((c) => c.status === "en_attente").length,
      en_cours: candidatures.filter((c) => c.status === "en_cours").length,
      acceptee: candidatures.filter((c) => c.status === "acceptee").length,
      refusee: candidatures.filter((c) => c.status === "refusee").length,
      retiree: candidatures.filter((c) => c.status === "retiree").length,
    };

    // Calculs pour les recruteurs
    if (type === "recruteur") {
      stats.traitees = stats.acceptee + stats.refusee;
      stats.en_traitement = stats.en_attente + stats.en_cours;
      stats.taux_acceptation =
        stats.total > 0
          ? ((stats.acceptee / (stats.acceptee + stats.refusee)) * 100).toFixed(1)
          : 0;
      stats.note_moyenne =
        candidatures.filter((c) => c.note_recruteur).length > 0
          ? (
              candidatures
                .filter((c) => c.note_recruteur)
                .reduce((sum, c) => sum + c.note_recruteur, 0) /
              candidatures.filter((c) => c.note_recruteur).length
            ).toFixed(1)
          : 0;
    }

    return stats;
  };

  const stats = getStatistiques();

  const getProgressPercentage = (value, total) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.mainStats}>
        <div className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statIcon}>
            <HiOutlineDocumentText className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.total}</div>
            <div className={styles.statLabel}>
              {type === "stagiaire"
                ? "Candidatures envoyées"
                : "Candidatures reçues"}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statIcon}>
            <HiOutlineClock className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.en_attente}</div>
            <div className={styles.statLabel}>En attente</div>
            <div className={styles.statProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${getProgressPercentage(stats.en_attente, stats.total)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.inProgress}`}>
          <div className={styles.statIcon}>
            <HiOutlineEye className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.en_cours}</div>
            <div className={styles.statLabel}>En cours</div>
            <div className={styles.statProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${getProgressPercentage(stats.en_cours, stats.total)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.accepted}`}>
          <div className={styles.statIcon}>
            <HiOutlineCheckCircle className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.acceptee}</div>
            <div className={styles.statLabel}>Acceptées</div>
            <div className={styles.statProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${getProgressPercentage(stats.acceptee, stats.total)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.rejected}`}>
          <div className={styles.statIcon}>
            <HiOutlineXCircle className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.refusee}</div>
            <div className={styles.statLabel}>Refusées</div>
            <div className={styles.statProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${getProgressPercentage(stats.refusee, stats.total)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {type === "stagiaire" && (
          <div className={`${styles.statCard} ${styles.withdrawn}`}>
            <div className={styles.statIcon}>
              <HiOutlineMinusCircle className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.retiree}</div>
              <div className={styles.statLabel}>Retirées</div>
              <div className={styles.statProgress}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${getProgressPercentage(stats.retiree, stats.total)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {type === "recruteur" && stats.total > 0 && (
        <div className={styles.additionalStats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiOutlineTrendingUp className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.taux_acceptation}%</div>
              <div className={styles.statLabel}>Taux d'acceptation</div>
            </div>
          </div>

          {stats.note_moyenne > 0 && (
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <HiOutlineStar className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{stats.note_moyenne}/10</div>
                <div className={styles.statLabel}>Note moyenne</div>
              </div>
            </div>
          )}

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiOutlineCog className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.en_traitement}</div>
              <div className={styles.statLabel}>À traiter</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidaturesStats;