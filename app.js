const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/v1/products.route");

app.use(express.json());
app.use(cors());

// use product routes ---
app.use("/api/v1/products", productRoutes);

// get main routes ---
app.get("/", (req, res) => {
   res.send("Route is working! YaY!");
});
module.exports = app;
