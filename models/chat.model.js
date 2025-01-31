const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Chat = sequelize.define("Chat", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sender_id: { type: DataTypes.UUID, allowNull: false },
    receiver_id: { type: DataTypes.UUID, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
}, { 
    tableName: "chats",  
    timestamps: true
});

module.exports = Chat;
