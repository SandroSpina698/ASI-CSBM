import io, { Socket } from "socket.io-client";

const WEBSOCKET_SERVER_URL = "http://localhost:3000";
const CHAT_SERVER_URL = "http://localhost:4000/api/chat";

class WebSocketService {
  private socket: Socket | null = null;

  connect(userId: string): Socket {
    this.socket = io(WEBSOCKET_SERVER_URL);

    this.socket.on("connect", () => {
      this.socket?.emit("register", userId);
    });

    return this.socket;
  }

  async sendPrivateMessage(
    recipientId: string,
    senderId: string,
    message: string,
  ): Promise<void> {
    try {
      const response = await fetch(
        `${CHAT_SERVER_URL}/${recipientId}/${senderId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send private message");
      }
    } catch (error) {
      throw new Error(`Error sending private message: ${error}`);
    }
  }

  // Méthode pour envoyer un message broadcast
  async sendBroadcastMessage(message: string): Promise<void> {
    const userId = sessionStorage.getItem("userId");

    try {
      const response = await fetch(`${CHAT_SERVER_URL}/broadcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message,
          sender_id: userId
        })
      });

      if (!response.ok) {
        throw new Error("Failed to broadcast message");
      }
    } catch (error) {
      throw new Error(`Error broadcasting message: ${error}`);
    }
  }

  // Méthode pour récupérer l'historique
  async getMessageHistory(senderId: string, receiverId: string): Promise<any> {
    try {
      const response = await fetch(
        `${CHAT_SERVER_URL}/history/${senderId}/${receiverId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to get message history");
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error getting message history: ${error}`);
    }
  }

  // Méthode pour écouter les messages
  onMessage(callback: (message: any) => void): void {
    if (this.socket) {
      this.socket.on("message", callback);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async getConnectedUsers(): Promise<string[]> {
    try {
      const response = await fetch(`${CHAT_SERVER_URL}/getconnectedusers`);
      
      if (!response.ok) {
        throw new Error("Failed to get connected users");
      }
  
      const data = await response.json();
      const currentUserId = sessionStorage.getItem("userId");
      return data.users.filter((id: string | null) => id != currentUserId); 
      } catch (error) {
      throw new Error(`Error getting connected users: ${error}`);
    }
  }
}

export default new WebSocketService();
