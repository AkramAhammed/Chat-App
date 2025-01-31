const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
    try {
        const { receiver_id, content } = req.body; // ✅ Using "receiver_id" to match model
        const sender_id = req.user.id; // ✅ Using "sender_id" to match model

        if (!receiver_id || !content) {
            return res.status(400).json({ error: "Receiver ID and content are required." });
        }

        const message = await Chat.create({
            sender_id,
            receiver_id,
            content
        });

        res.status(201).json({ message: "Message sent successfully", chat: message });
    } catch (error) {
        console.error("Send Message Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const { receiver_id } = req.query; // ✅ Using "receiver_id" to match model
        const sender_id = req.user.id; // ✅ Using "sender_id" to match model

        if (!receiver_id) {
            return res.status(400).json({ error: "Receiver ID is required." });
        }

        const messages = await Chat.findAll({
            where: {
                sender_id,
                receiver_id
            },
            order: [["createdAt", "ASC"]]
        });

        res.json({ messages });
    } catch (error) {
        console.error("Get Chat History Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
