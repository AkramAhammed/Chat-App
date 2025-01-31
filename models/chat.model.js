const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");  

const Chat = sequelize.define("Chat", {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    sender_id: { 
        type: DataTypes.UUID, 
        allowNull: false, 
        references: { model: "users", key: "id" },
        onDelete: "CASCADE"
    },
    receiver_id: { 
        type: DataTypes.UUID, 
        allowNull: false, 
        references: { model: "users", key: "id" },
        onDelete: "CASCADE"
    },
    content: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    }
}, { timestamps: true });


Chat.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
Chat.belongsTo(User, { foreignKey: "receiver_id", as: "receiver" });

module.exports = Chat;
