const Chat = require("../models/chat.model");
const User = require("../models/user.model");

exports.sendMessage = async (sender_id, receiver_id, content) => {
    
    const receiverExists = await User.findByPk(receiver_id);
    if (!receiverExists) {
        throw new Error("Receiver user does not exist.");
    }

    return await Chat.create({ sender_id, receiver_id, content });
};

exports.getChatHistory = async (sender_id, receiver_id) => {
    return await Chat.findAll({
        where: { sender_id, receiver_id },
        order: [["createdAt", "ASC"]]
    });
};
