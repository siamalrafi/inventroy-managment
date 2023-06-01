const express = require("express");
const router = express.Router();
const storeController = require("../../controller/store.controller");

router
   // store route ---
   .post(storeController.createStore)
   .get(storeController.getStores);

// router.route("/:id").get(storeController.getStoreById);

// export store routes
module.exports = router;
