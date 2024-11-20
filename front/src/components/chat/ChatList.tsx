import { useContext } from "react";
import MessageComponent from "./MessageComponent";
import { SocketContext } from "../../stores/context/SocketContext";

interface MessageProps {
  sender_id?: string;
  message: string;
}

const ChatList = () => {
  const socket = useContext(SocketContext).sharedSocket;
  const chatArray: Array<string> = [];
  socket?.on("receivemessage", ({ sender_id, message }: MessageProps) => {
    console.log("sender_id" + sender_id);
    chatArray.push(message);
  });

  return (
    <div style={{}}>
      {chatArray.map((props, index) => (
        //TODO! a changer pour que key soit unique
        <MessageComponent
          key={index}
          content={props}
          user_id={(index % 2).toString()}
          isCurrentUser={index % 2 == 0}
          timestamp={new Date(8.64e15).toString()}
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
