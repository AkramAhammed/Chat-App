const express = require("express");
const { register, login, getUserProfile, logout } = require("../controllers/auth.controller");
const { validateRegistration } = require("../middlewares/validation.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/logout", authMiddleware, logout);

module.exports = router;
