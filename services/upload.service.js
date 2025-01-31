const fs = require("fs");
const path = require("path");
const File = require("../models/file.model");

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; 


exports.processUploadedFile = async (fileData, user_id) => {
    try {
        if (!fileData) throw new Error("No file uploaded.");

        const { filename, mimetype, size } = fileData;
        const filePath = path.join(__dirname, "../uploads", filename);

        
        if (!ALLOWED_FILE_TYPES.includes(mimetype)) {
            fs.unlinkSync(filePath); 
            throw new Error("Invalid file type! Allowed types: PNG, JPG, JPEG, PDF");
        }

        
        if (size > MAX_FILE_SIZE) {
            fs.unlinkSync(filePath);
            throw new Error("File size exceeds the 5MB limit.");
        }

        
        const newFile = await File.create({
            user_id,         
            filename,        
            file_type: mimetype, 
            file_size: size  
        });

        console.log(`File uploaded: ${filename}`);

        return { success: true, file_url: `/uploads/${filename}`, file_id: newFile.id };
    } catch (error) {
        console.error("File processing error:", error);
        return { success: false, error: error.message };
    }
};


exports.deleteFile = async (file_id, user_id) => {
    try {
        const file = await File.findOne({ where: { id: file_id, user_id } });
        if (!file) throw new Error("File not found!");

        const filePath = path.join(__dirname, "../uploads", file.filename);
        fs.unlinkSync(filePath); 
        await file.destroy(); 

        return { success: true, message: "File deleted successfully." };
    } catch (error) {
        console.error("File deletion error:", error);
        return { success: false, error: error.message };
    }
};
