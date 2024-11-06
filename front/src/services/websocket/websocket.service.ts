import io, {Socket} from "socket.io-client";

const NODE_SERVER_URL = "http://localhost:3000";

export const connect = (userId: string) => {
    return io(`${NODE_SERVER_URL}`, {
        query: {
            user_id: userId
        }
    });
}

export const sendMessage = (recipient_id: string, message: string, socket: Socket) => {
    if (!message || !message.trim()) {
        throw new Error("Cannot send an empty message");
    }

    socket.emit("receivemessage", { recipient_id, message });
}