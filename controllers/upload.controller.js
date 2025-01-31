const uploadService = require("../services/upload.service");

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const result = await uploadService.processUploadedFile(req.file, req.user.id);
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({ message: "File uploaded successfully", fileUrl: result.fileUrl });
    } catch (error) {
        console.error("Upload File Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const result = await uploadService.deleteFile(fileId, req.user.id);
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("File Deletion Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
