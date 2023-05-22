const express = require("express");
const router = express.Router();
const uploader = require("../../middleware/uploader");

//  other import ---
const productController = require("../../controller/products.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.post("/file-upload", uploader.array("image"), productController.fileUpload);

{
   /* <input type="file" name="image" /> */
}
// const formData = new FormData();
// formData.append("image", forData);

// posting to database ---
router
   .route("/")
   // posting to database ---
   .post(productController.createProduct)

   // get all data ---
   .get(verifyToken, authorization("buyer"), productController.getAllProducts);

// bulk update ---
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);
router.route("/update-many").post(productController.updateMany);

// update product by id ---
router.route("/:id").patch(productController.updateProductById).delete(productController.deleteProductById);

// export to database ---
module.exports = router;
