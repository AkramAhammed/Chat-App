const fs = require("fs");
const path = require("path");

exports.logActivity = (message) => {
    const logFile = path.join(__dirname, "../logs/activity.log");
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error("Error writing log:", err);
    });
};
