const express = require("express");
const { uploadFile, deleteFile } = require("../controllers/upload.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Ensure 'uploads/' exists in your project

const router = express.Router();
router.post("/", authMiddleware, upload.single("file"), uploadFile); // ✅ Ensure field name is "file"
router.delete("/:fileId", authMiddleware, deleteFile);

module.exports = router;
