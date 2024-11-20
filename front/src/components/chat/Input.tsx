import { CSSProperties, useContext, useState } from "react";
import { motion } from "motion/react";
import { SocketContext } from "../../stores/context/SocketContext";
import { sendMessage } from "../../services/websocket/websocket.service";

const InputMessage = () => {
  const [message, setMessage] = useState<string>("");

  const socket = useContext(SocketContext).sharedSocket;
  const sendMessageOnline = () => {
    sendMessage("all", message, socket);
    /*
    socket.emit("receivemessage", {
      recipient_id: ,
      message: message,
    });
    */
    setMessage("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && message.length > 0) {
      sendMessageOnline();
    }
  };
  const messageGroupStyle: CSSProperties = {
    position: "sticky",
    bottom: "0",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "center",
    gap: 5,
  };
  const inputStyle: CSSProperties = {
    color: "black",
    backgroundColor: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    width: "80%",
    height: "4vh",
    padding: "10px",
  };

  const buttonStyle: CSSProperties = {
    borderRadius: "5px",
    backgroundColor: message.length == 0 ? "grey" : "blueviolet",
    border: "none",
    color: "white",
    width: "5vw",
    height: "4vh",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: message.length == 0 ? "notAllowed" : "",
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
      />
      <motion.button
        disabled={message.length == 0}
        onTap={sendMessageOnline}
        whileTap={{ scale: message.length == 0 ? 1.0 : 0.9 }}
        style={buttonStyle}
      >
        Send
      </motion.button>
    </div>
  );
};

export default InputMessage;
