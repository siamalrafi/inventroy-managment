const Product = require("../model/products.model");

// create a new Product ---
exports.createProductServices = async (data) => {
   const product = await Product(data);
   const result = await product.save();
   return result;
};

// get all products ---
exports.getAllProductsServices = () => {
   const result = Product.find();
   return result;
};

// update a Product by id ---

exports.updateProductServices = async (id, data) => {
   const result = await Product.findByIdAndUpdate(id, data, { new: true });
   return result;
};
