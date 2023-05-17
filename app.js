const express = require("express");
const app = express();
const cors = require("cors");

// require all routes in the application ---
const productRoutes = require("./routes/v1/products.route");
const brandRoute = require("./routes/v1/brand.route");
const categoryRoute = require("./routes/v1/category.route");
const storeRoute = require("./routes/v1/store.route");
const supplierRoute = require("./routes/v1/supplier.route");
const stockRoute = require("./routes/v1/stock.route");

app.use(express.json());
app.use(cors());

// use product routes ---
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
// app.use("/api/v1/stock", stockRoute);
// app.use("/api/v1/user", userRoute);

// get main routes ---
app.get("/", (req, res) => {
   res.send("Route is working! YaY!");
});

// export app ---
module.exports = app;
