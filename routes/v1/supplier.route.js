const express = require("express");
const supplierController = require("../../controller/supplier.controller");
const router = express.Router();

router
   .route("/")
   // post supplier
   .post(supplierController.createSupplier)
   .get(supplierController.getSuppliers);

router.route("/:id").get(supplierController.getSupplierById).patch(supplierController.updateSupplier);

// supplier routes
module.exports = router;
