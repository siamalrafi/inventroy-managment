const express = require("express");
const brandController = require("../../controller/brand.controller");

const router = express.Router();

router
   .route("/")
   // post routes
   .post(brandController.createBrand)
   .get(brandController.getBrands);

router
   .route("/:id")
   // get brand routes
   .get(brandController.getBrandById)
   .patch(brandController.updateBrand);

module.exports = router;
