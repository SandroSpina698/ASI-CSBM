import { useContext, useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { SocketContext } from "../../stores/context/SocketContext";
import webSocketService from "../../services/websocket/websocket.service";
import MessageComponent from "./MessageComponent";
import InputMessage from "./Input";

interface MessageProps {
  sender_id?: string;
  content: string;
  creationDate: string;
}

interface ConversationProps {
  userId: string;
  messages: MessageProps[];
}

const ChatList = () => {
  const socket = useContext(SocketContext).sharedSocket;
  const userId = sessionStorage.getItem("userId") || "None";
  const [activeTab, setActiveTab] = useState<string>("public");
  const [publicMessages, setPublicMessages] = useState<MessageProps[]>([]);
  const [privateConversations, setPrivateConversations] = useState<ConversationProps[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Gestion des utilisateurs connectés
  useEffect(() => {
    const loadConnectedUsers = async () => {
      try {
        const users = await webSocketService.getConnectedUsers();
        setConnectedUsers(users.filter(id => id !== userId));
      } catch (error) {
        console.error("Error loading connected users:", error);
      }
    };

    loadConnectedUsers();

    socket?.on("userConnected", (newUserId: string) => {
      if (newUserId !== userId) {
        setConnectedUsers(prev => [...prev, newUserId]);
      }
    });

    socket?.on("userDisconnected", (disconnectedUserId: string) => {
      setConnectedUsers(prev => prev.filter(id => id !== disconnectedUserId));
    });

    return () => {
      socket?.off("userConnected");
      socket?.off("userDisconnected");
    };
  }, [socket, userId]);

  // Gestion des messages
  useEffect(() => {
    if (!socket) return;

    const handlePublicMessage = (message: MessageProps) => {
      setPublicMessages(prev => [...prev, message]);
      scrollToBottom();
    };

    const handlePrivateMessage = (message: MessageProps) => {
      const senderId = message.sender_id;
      setPrivateConversations(prev => {
        const conversation = prev.find(c => c.userId === senderId);
        if (!conversation) {
          return [...prev, { userId: senderId!, messages: [message] }];
        }
        const newConversations = [...prev];
        const index = newConversations.findIndex(c => c.userId === senderId);
        newConversations[index].messages.push(message);
        return newConversations;
      });
      scrollToBottom();
    };

    socket.on("message", handlePublicMessage);
    socket.on(userId, handlePrivateMessage);

    return () => {
      socket.off("message", handlePublicMessage);
      socket.off(userId, handlePrivateMessage);
    };
  }, [socket, userId]);

  const startPrivateChat = async (targetUserId: string) => {
    if (!privateConversations.find(conv => conv.userId === targetUserId)) {
      try {
        const history = await webSocketService.getMessageHistory(userId, targetUserId);
        setPrivateConversations(prev => [...prev, { userId: targetUserId, messages: history }]);
      } catch (error) {
        console.error("Error loading message history:", error);
        setPrivateConversations(prev => [...prev, { userId: targetUserId, messages: [] }]);
      }
    }
    setActiveTab(targetUserId);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ddd', padding: '10px', overflowY: 'auto' }}>
        <h5>Utilisateurs connectés</h5>
        {connectedUsers.map(user => (
          <div
            key={user}
            onClick={() => startPrivateChat(user)}
            style={{
              padding: '8px',
              margin: '4px 0',
              cursor: 'pointer',
              backgroundColor: activeTab === user ? '#f0f0f0' : 'transparent',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
          >
            {user}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => k && setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="public" title="Chat Public">
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {publicMessages.map((msg, idx) => (
                <MessageComponent
                  key={`public-${idx}`}
                  content={msg.content}
                  user_id={msg.sender_id || ""}
                  isCurrentUser={msg.sender_id === userId}
                  timestamp={msg.creationDate}
                />
              ))}
              <div ref={messageEndRef} />
            </div>
          </Tab>

          {privateConversations.map(conv => (
            <Tab
              key={conv.userId}
              eventKey={conv.userId}
              title={`Chat avec ${conv.userId}`}
            >
              <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {conv.messages.map((msg, idx) => (
                  <MessageComponent
                    key={`private-${idx}`}
                    content={msg.content}
                    user_id={msg.sender_id || ""}
                    isCurrentUser={msg.sender_id === userId}
                    timestamp={msg.creationDate}
                  />
                ))}
                <div ref={messageEndRef} />
              </div>
            </Tab>
          ))}
        </Tabs>
        
        <InputMessage activeTab={activeTab} />
        </div>
    </div>
  );
};

export default ChatList;