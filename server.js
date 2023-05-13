const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
DBConnect();
console.log(mongoose.connection.readyState);

// mongoose.connect("mongodb://0.0.0.0:27017/acc").then(() => {

// ---------- Server PORT ----------
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
   res.send("EduMate server Running...");
});

app.listen(port, () => {
   console.log(`App is running on port ${port}`.yellow.bold);
});
