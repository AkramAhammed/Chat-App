const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const File = sequelize.define("File", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { 
        type: DataTypes.UUID, 
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE"
    },
    filename: { type: DataTypes.STRING(512), allowNull: false },
    file_type: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        validate: { isIn: [["image/png", "image/jpeg", "image/jpg", "application/pdf"]] } 
    },
    file_size: { type: DataTypes.BIGINT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false }
}, { timestamps: true });

// Define relationships
File.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = File;


