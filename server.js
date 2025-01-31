require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./models");  

const app = express();
app.use(express.json());
app.use(cors());


db.sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);  
    });


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/upload", require("./routes/upload.routes"));


const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
