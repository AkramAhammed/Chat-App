const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const db = {};


db.User = require("./user.model");  
db.Chat = require("./chat.model");  
db.File = require("./file.model"); 


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
