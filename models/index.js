const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Import models explicitly
db.User = require("./user.model");  // ✅ No function call
db.Chat = require("./chat.model");  // ✅ No function call
db.File = require("./file.model"); 

// Initialize Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
