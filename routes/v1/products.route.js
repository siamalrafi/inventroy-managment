const express = require("express");
const router = express.Router();

const productController = require("../../controller/products.controller");

// posting to database ---
router
   .route("/")
   // posting to database ---
   .post(productController.createProduct)

   // get all data ---
   .get(productController.getAllProducts);

module.exports = router;
