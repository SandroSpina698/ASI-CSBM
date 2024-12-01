import io from "socket.io-client";

const WEBSOCKET_URL = "http://localhost:3000";
let socket = null;

const initWebSocket = (user_id: string) => {
    socket = io(WEBSOCKET_URL);
}

export const registerWebSocket = (user_id: string) => {
    initWebSocket(user_id);
    socket.on('connect', () => {
        console.log(`Connected to the server with socket ID: ${socket.id}`);

        socket.emit('register', user_id);
        console.log(`Registered user: ${user_id}`);
    });

    return socket
}