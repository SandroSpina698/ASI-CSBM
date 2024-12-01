import ChatList from "../../components/chat/ChatList";
import InputMessage from "../../components/chat/Input";

const ChatDashBoard = () => {
  return (
    <div className={"chat-page"}>
      <div className={"chat-rooms"}> </div>
      <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <ChatList />
        </div>
        {/* <InputMessage /> */}
      </div>
    </div>
  );
};

export default ChatDashBoard;
