import { useContext, useEffect, useRef, useState } from "react";
import MessageComponent from "./MessageComponent";
import { SocketContext } from "../../stores/context/SocketContext";
import webSocketService from "../../services/websocket/websocket.service";

interface MessageProps {
  sender_id?: string;
  receiver_id?: string;
  content: string;
  creationDate: string;
}

const ChatList = () => {
  const socket = useContext(SocketContext).sharedSocket;
  const userId = sessionStorage.getItem("userId") || "None";
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMessage = (message: MessageProps) => {
      setMessages((prev) => [...prev, message]);
    };

    if (socket) {
      // Écoute des messages sur le canal "message"
      webSocketService.onMessage(handleMessage);
    }

    return () => {
      if (socket) {
        // Nettoyage du listener à la démonture du composant
        socket.off("message", handleMessage);
      }
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="messageListContainer"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 150px)",
        padding: "15px",
      }}
    >
      {messages.map((message, index) => (
        <MessageComponent
          key={`${message.sender_id}-${index}`}
          content={message.content}
          user_id={message.sender_id || ""}
          isCurrentUser={message.sender_id === userId}
          timestamp={message.creationDate}
        />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatList;
