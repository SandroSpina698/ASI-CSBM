import { CSSProperties, useState } from "react";
import { motion } from "motion/react";
import webSocketService from "../../services/websocket/websocket.service";

interface InputMessageProps {
  activeTab?: string; 
}

const InputMessage = ({ activeTab = 'public' }: InputMessageProps) => {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const sendMessageOnline = async () => {
    if (message.trim().length === 0 || isSending || !userId) return;

    try {
      setIsSending(true);
      
      if (activeTab === 'public') {
        await webSocketService.sendBroadcastMessage(message);
      } else {
        await webSocketService.sendPrivateMessage(activeTab, userId, message);
      }

      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && message.length > 0 && !isSending) {
      sendMessageOnline();
    }
  };

  const messageGroupStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #ddd",
  };

  const inputStyle: CSSProperties = {
    color: "black",
    backgroundColor: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    width: "80%",
    height: "6vh",
    padding: "10px",
  };

  const buttonStyle: CSSProperties = {
    borderRadius: "5px",
    backgroundColor: message.length === 0 || isSending ? "grey" : "blueviolet",
    border: "none",
    color: "white",
    width: "5vw",
    height: "6vh",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: message.length === 0 || isSending ? "not-allowed" : "pointer",
  };

  return (
    <div style={messageGroupStyle}>
      <input
        type="text"
        style={inputStyle}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={500}
        disabled={isSending}
        placeholder={
          activeTab === "public"
            ? "Message public..."
            : `Message à ${activeTab}...`
        }
      />
      <motion.button
        disabled={message.length === 0 || isSending}
        onTap={sendMessageOnline}
        whileTap={{ scale: message.length === 0 || isSending ? 1.0 : 0.9 }}
        style={buttonStyle}
      >
        {isSending ? "..." : "Send"}
      </motion.button>
    </div>
  );
};

export default InputMessage;