import { useContext, useState } from "react";
import MessageComponent from "./MessageComponent";
import { SocketContext } from "../../stores/context/SocketContext";

interface MessageProps {
  sender_id?: string;
  userMessage: string;
}

const ChatList = () => {
  const socket = useContext(SocketContext).sharedSocket;
  const userId = sessionStorage.getItem("userId")
    ? sessionStorage.getItem("userId")
    : "None";

  const [chatArray, setChatArray] = useState<MessageProps[]>([]);

  socket?.on("sendmessage", (message: MessageProps) => {
    setChatArray([...chatArray, message]);
  });

  return (
    <div className="messageListContainer" style={{}}>
      {chatArray.map((props, index) => (
        //TODO! a changer pour que key soit unique
        <MessageComponent
          key={index}
          content={props.userMessage}
          user_id={props.sender_id ? props.sender_id.toString() : ""}
          isCurrentUser={props.sender_id == userId}
          timestamp={new Date().toString()}
        />
      ))}
    </div>
  );
};
export default ChatList;

/*
 *   function generateRandomString() {
    const length = Math.floor(Math.random() * (500 - 30 + 1)) + 30; // Longueur aléatoire entre 30 et 100
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }
*/
