const Queue = require("bull");
const { processUploadedFile } = require("../services/upload.service");

const uploadQueue = new Queue("fileUploadQueue", {
    redis: { host: "127.0.0.1", port: 6379 }
});

uploadQueue.process(async (job) => {
    console.log("Processing file upload:", job.data.filePath);
    return await processUploadedFile(job.data.filePath);
});

module.exports = uploadQueue;
