const Product = require("../model/products.model");

exports.createProduct = async (req, res, next) => {
   try {
      const data = req.body;
      const product = await Product(data);
      const result = await product.save();

      // methods ---
      // result.logger();

      return res.status(200).json({
         status: "success",
         message: "Product inserted successfully.",
         result: result,
      });
   } catch (error) {
      return res.status(400).json({
         status: "error",
         message: "Product not inserted.",
         error: error.message,
      });
   }
};

// get all products ---
exports.getAllProducts = async (req, res) => {
   try {
      res.status(200).json({
         status: "success",
         message: "Products fetched successfully.",
         result: await Product.where("price").gt(17),
      });
   } catch (error) {
      res.status(400).json({
         status: "error",
         message: "Products can't not get.",
         error: error.message,
      });
   }
};
