import {useContext, useEffect, useRef, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {SocketContext} from "../../stores/context/SocketContext";
import webSocketService from "../../services/websocket/websocket.service";
import MessageComponent from "./MessageComponent";
import InputMessage from "./Input";
import {v4 as uuidv4} from "uuid";
import {MessageDTOIn} from "../../types/interfaces/MessageDTOIn";
import { EventEmitter } from "../../services/events/EventEmitter.ts";

interface MessageProps {
    id: number,
    sender_id: string;
    receiver_id: string;
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
    const emitter: EventEmitter = new EventEmitter();
    const [finalHistory, setFinalHistory] = useState<MessageProps[]>()

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        const handler = (data: MessageProps) => {
            startPrivateChat(data.receiver_id);
        }

        emitter.on("newMessageFromCurrentUser", handler);

        if (!socket) return;

        const handlePublicMessage = (message: MessageProps) => {
            setPublicMessages(prev => {
                // Vérifier si le message existe déjà
                const messageExists = prev.some(
                    msg =>
                        msg.content === message.content &&
                        msg.sender_id === message.sender_id &&
                        msg.creationDate === message.creationDate
                );

                if (messageExists) {
                    return prev;
                }

                return [...prev, message];
            });

            scrollToBottom();
        };

        const handlePrivateMessage = (message: MessageProps) => {
            const senderId = message.sender_id;
            if (!senderId) return;

            setPrivateConversations(prev => {
                const conversation = prev.find(c => c.userId === senderId);
                if (!conversation) {
                    return [...prev, {userId: senderId, messages: [message]}];
                }

                // Vérifier si le message existe déjà dans la conversation
                const messageExists = conversation.messages.some(
                    msg =>
                        msg.content === message.content &&
                        msg.sender_id === message.sender_id &&
                        msg.creationDate === message.creationDate
                );

                if (messageExists) {
                    return prev;
                }

                return prev.map(conv =>
                    conv.userId === senderId
                        ? {...conv, messages: [...conv.messages, message]}
                        : conv
                );
            });

            scrollToBottom();
        };

        // Nettoyer les anciens listeners avant d'en ajouter de nouveaux
        socket.off("message");
        socket.off(userId);

        webSocketService.onMessage((message) => {
            !message.receiver_id ? handlePublicMessage(message) : handlePrivateMessage(message)
        });

        return () => {
            socket.off("message");
            socket.off(userId);
        };
    }, [socket, userId, emitter]);

    useEffect(() => {
        const fetchConnectedUsers = async () => {
            try {
                const users = await webSocketService.getConnectedUsers();
                setConnectedUsers(users);
            } catch (error) {
                console.error("Failed to fetch connected users:", error);
            }
        };

        fetchConnectedUsers();
        const interval = setInterval(fetchConnectedUsers, 10000);
        return () => clearInterval(interval);
    }, [userId]);

    const startPrivateChat = async (targetUserId: string) => {
        if (!privateConversations.find(conv => conv.userId === targetUserId)) {
            try {
                const history1: MessageDTOIn[] = await webSocketService.getMessageHistory(userId, targetUserId);
                const history2: MessageDTOIn[] = await webSocketService.getMessageHistory(targetUserId, userId);
                let mergedHistory: MessageDTOIn[] = [...history1, ...history2];

                mergedHistory.sort((a, b) => {
                    return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
                });

                const computedHistory: MessageProps[] = mergedHistory.map(message => {
                    return {
                        id: message.id,
                        content: message.content,
                        sender_id: message.sender.id,
                        receiver_id: message.receiver.id,
                        creationDate: message.creationDate
                    }
                })

                setFinalHistory(computedHistory);

                setPrivateConversations(prev => [...prev, {userId: targetUserId, messages: computedHistory}]);

            } catch (error) {
                console.error("Failed to load message history:", error);
                setPrivateConversations(prev => [...prev, {userId: targetUserId, messages: []}]);
            }
        }
        setActiveTab(targetUserId);
    };

    return (
        <div style={{display: 'flex', height: 'calc(100vh - 100px)'}}>
            <div style={{width: '200px', borderRight: '1px solid #ddd', padding: '10px'}}>
                <h5>Utilisateurs connectés ({connectedUsers.length})</h5>
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

            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => k && setActiveTab(k)}
                    className="mb-3"
                >
                    <Tab eventKey="public" title="Chat Public">
                        <div style={{flex: 1, overflowY: 'auto', padding: '10px', height: 'calc(100vh - 250px)'}}>
                            {publicMessages.map((msg, idx) => (
                                <MessageComponent
                                    key={uuidv4()}
                                    content={msg.content}
                                    user_id={msg.sender_id || ""}
                                    isCurrentUser={msg.sender_id == userId}
                                    timestamp={msg.creationDate}
                                />
                            ))}
                            <div ref={messageEndRef}/>
                        </div>
                    </Tab>

                    {privateConversations.map(conv => (
                        <Tab
                            key={conv.userId}
                            eventKey={conv.userId}
                            title={`Chat avec ${conv.userId}`}
                        >
                            <div style={{flex: 1, overflowY: 'auto', padding: '10px', height: 'calc(100vh - 250px)'}}>
                                {conv.messages.map((msg, idx) => (
                                    <MessageComponent
                                        key={uuidv4()}
                                        content={msg.content}
                                        user_id={msg.sender_id || ""}
                                        isCurrentUser={msg.sender_id == userId}
                                        timestamp={msg.creationDate}
                                    />
                                ))}
                                <div ref={messageEndRef}/>
                            </div>
                        </Tab>
                    ))}
                </Tabs>

                <InputMessage activeTab={activeTab} emitter={emitter}/>
            </div>
        </div>
    );
};

export default ChatList;
