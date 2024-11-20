import ChatList from "../../components/chat/ChatList";
import InputMessage from "../../components/chat/Input";

const ChatDashBoard = () => {
  return (
    <div className={"chat-page"}>
      <div className={"chat-rooms"}> </div>
      <div style={{ padding: "15px" }}>
        <ChatList />
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatDashBoard;
