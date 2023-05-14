const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
DBConnect();
console.log(mongoose.connection.readyState);

// ---------- Server PORT ----------
const port = process.env.PORT || 8080;

app.listen(port, () => {
   console.log(`App is running on port http://localhost:${port}`.yellow.bold);
});
