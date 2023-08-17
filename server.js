const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const port = process.env.PORT || 8082;
const server = http.createServer(app);
const connectDB = require("./config/db");

connectDB();
app.get("/", (req, res) => res.send("KEY STASH"));
server.listen(port, () => console.log(`Key Stash ${port}`));
app.use(express.json());
app.use("/org", require("./routes/OrganizationRouter"));
