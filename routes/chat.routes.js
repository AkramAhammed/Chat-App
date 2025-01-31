const express = require("express");
const { sendMessage, getChatHistory } = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/history", authMiddleware, getChatHistory);

module.exports = router;
