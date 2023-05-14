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

// bulk update ---
router.route("/bulk-update").patch(productController.bulkUpdateProduct);

// update product by id ---
router.route("/:id").patch(productController.updateProductById).delete(productController.deleteProductById);

// export to database ---
module.exports = router;
