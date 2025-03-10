import dotenv from "dotenv";
import io from "socket.io-client";

dotenv.config();

const SERVER_URL = "http://localhost:5000";

// Connect to WebSocket server
const socket = io(SERVER_URL, {
    transports: ["websocket"], // Ensure WebSocket connection
});

socket.on("connect", () => {
    console.log(`✅ Connected to WebSocket server at ${SERVER_URL} with ID: ${socket.id}`);

    // Send a test message
    socket.emit("sendMessage", "Hello from client!");

    // Listen for messages from the server
    socket.on("receiveMessage", (message: string) => {
        console.log("📩 New Message:", message);
    });

    // Disconnect after 5 seconds
    setTimeout(() => {
        console.log("❌ Disconnecting...");
        socket.disconnect();
    }, 5000);
});
