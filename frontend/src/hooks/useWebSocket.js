import { useState, useEffect, useCallback, useRef } from "react";
import { webSocketService } from "../services/websocket.service";
import { useAuth } from "../context/AuthContext";

export const useWebSocket = () => {
  const { currentUser } = useAuth();
  const [connectionState, setConnectionState] = useState("disconnected");
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const isInitialized = useRef(false);

  // Connexion automatique quand l'utilisateur est connecté
  useEffect(() => {
    if (currentUser && !isInitialized.current) {
      const token = localStorage.getItem("token");
      if (token) {
        connectWebSocket(token);
        isInitialized.current = true;
      }
    }

    // Déconnexion quand l'utilisateur se déconnecte
    if (!currentUser && isInitialized.current) {
      webSocketService.disconnect();
      isInitialized.current = false;
    }

    return () => {
      if (isInitialized.current) {
        webSocketService.disconnect();
      }
    };
  }, [currentUser]);

  const connectWebSocket = useCallback(async (token) => {
    try {
      setConnectionState("connecting");
      setError(null);

      await webSocketService.connect(token);

      // Écouter les événements de connexion
      webSocketService.on("connected", () => {
        setConnectionState("connected");
        setError(null);
      });

      webSocketService.on("disconnected", () => {
        setConnectionState("disconnected");
      });

      webSocketService.on("connectionSuccess", (data) => {
        setOnlineUsers(data.online_users || []);
      });

      webSocketService.on("error", (data) => {
        setError(data.message);
      });

      webSocketService.on("userStatus", (data) => {
        setOnlineUsers(prev => {
          if (data.status === "online") {
            return [...prev.filter(id => id !== data.user_id), data.user_id];
          } else {
            return prev.filter(id => id !== data.user_id);
          }
        });
      });

    } catch (error) {
      setConnectionState("disconnected");
      setError(error.message);
      console.error("Erreur connexion WebSocket:", error);
    }
  }, []);

  return {
    connectionState,
    error,
    onlineUsers,
    isConnected: connectionState === "connected",
    isConnecting: connectionState === "connecting",
    reconnect: () => {
      const token = localStorage.getItem("token");
      if (token) connectWebSocket(token);
    }
  };
};
