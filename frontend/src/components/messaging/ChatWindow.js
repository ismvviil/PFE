// import React, { useState, useEffect, useRef } from 'react';
// // import { useMessages, useAuth } from '../context';
// // import { useWebSocket } from '../hooks';

// // import { useMessages, useAuth } from '../../../context';
// import { useMessages } from '../../context/MessageContext';
// import { useAuth } from '../../context/AuthContext';
// // import { useWebSocket } from '../../../hooks';
// import { useWebSocket } from '../../hooks/useWebSocket';
// import styles from './ChatWindow.module.css';

// const ChatWindow = () => {
//   const { currentUser } = useAuth();
//   const { 
//     activeConversation, 
//     messages, 
//     typingUsers,
//     loadMessages
//   } = useMessages();
//   const { sendMessage, sendTypingIndicator } = useWebSocket();
//   const [messageInput, setMessageInput] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (activeConversation) {
//       loadMessages(activeConversation.id);
//     }
//   }, [activeConversation , loadMessages]);

//   const handleSend = () => {
//     if (messageInput.trim() && activeConversation) {
//       sendMessage(activeConversation.id, messageInput);
//       setMessageInput('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       {activeConversation ? (
//         <>
//           <div className={styles.chatHeader}>
//             {activeConversation.participants
//               .filter(p => p.id !== currentUser.id)
//               .map(p => p.name)
//               .join(', ')}
//             {typingUsers[activeConversation.id] && (
//               <span className={styles.typingIndicator}>
//                 {typingUsers[activeConversation.id]} est en train d'écrire...
//               </span>
//             )}
//           </div>

//           <div className={styles.messagesContainer} ref={messagesEndRef}>
//             {messages[activeConversation.id]?.map(msg => (
//               <div 
//                 key={msg.id}
//                 className={`${styles.message} ${
//                   msg.emetteur_id === currentUser.id ? styles.sent : styles.received
//                 }`}
//               >
//                 <div className={styles.messageHeader}>
//                   <span className={styles.sender}>
//                     {msg.emetteur_id === currentUser.id ? 'Vous' : msg.emetteur_name}
//                   </span>
//                   <span className={styles.timestamp}>
//                     {new Date(msg.date_envoi).toLocaleTimeString()}
//                   </span>
//                 </div>
//                 <div className={styles.messageContent}>{msg.contenu}</div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.messageInputContainer}>
//             <textarea
//               className={styles.messageInput}
//               value={messageInput}
//               onChange={(e) => {
//                 setMessageInput(e.target.value);
//                 sendTypingIndicator(activeConversation.id, true);
//               }}
//               onKeyDown={handleKeyDown}
//               placeholder="Écrivez un message..."
//             />
//             <button 
//               className={styles.sendButton}
//               onClick={handleSend}
//             >
//               Envoyer
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className={styles.noConversation}>
//           Sélectionnez une conversation
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;