const { Server } = require("socket.io");
const Message = require("../models/message.model");

const initializeSockets = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("sendMessage", async (data) => {
            const { senderId, receiverId, content } = data;
            const message = await Message.create({ senderId, receiverId, content });

            io.emit("receiveMessage", message);
        });

        socket.on("disconnect", () => console.log("User disconnected:", socket.id));
    });
};

module.exports = initializeSockets;
