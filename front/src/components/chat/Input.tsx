import { CSSProperties, useState } from "react";
import { motion } from "motion/react";
import webSocketService from "../../services/websocket/websocket.service";

const InputMessage = () => {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const sendMessageOnline = async () => {
    if (message.trim().length === 0 || isSending) return;

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("No user ID found");
      return;
    }

    try {
      setIsSending(true);
      // Puisque c'est un chat public, on utilise broadcastMessage
      await webSocketService.sendBroadcastMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
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
        placeholder="Écrivez votre message..."
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
