import { useContext, useEffect, useRef, useState } from "react";
import MessageComponent from "./MessageComponent";
import { SocketContext } from "../../stores/context/SocketContext";

interface MessageProps {
  sender_id?: string;
  userMessage: string;
}

const ChatList = () => {
  const socket = useContext(SocketContext).sharedSocket;
  const userId = sessionStorage.getItem("userId") || "None";

  const [chatArray, setChatArray] = useState<MessageProps[]>([]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMessage = (message: MessageProps) => {
      setChatArray((prev) => [...prev, message]);
    };

    socket?.on("sendmessage", handleMessage);

    return () => {
      socket?.off("sendmessage", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [chatArray]);

  return (
    <div
      className="messageListContainer"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 150px)",
        padding: "15px",
      }}
    >
      {chatArray.map((props, index) => (
        <MessageComponent
          key={index} // Utilisez un identifiant unique si possible
          content={props.userMessage}
          user_id={props.sender_id ? props.sender_id.toString() : ""}
          isCurrentUser={props.sender_id === userId}
          timestamp={new Date().toString()}
        />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default ChatList;
