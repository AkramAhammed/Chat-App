const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: "created_at" },  // ✅ Fix column name
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: "updated_at" }   // ✅ Fix column name
}, {
    tableName: "users",
    timestamps: true
});

module.exports = User;
