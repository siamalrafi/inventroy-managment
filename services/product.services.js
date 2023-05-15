const Product = require("../model/products.model");

// create a new Product ---
exports.createProductServices = async (data) => {
   const product = await Product(data);
   const result = await product.save();
   return result;
};

// get all products ---
exports.getAllProductsServices = (filters, queries) => {
    const result = Product.find(filters).sort(queries.sortBy) 
   return result;
};

// update a Product by id ---
exports.updateProductServices = async (id, data) => {
   const result = await Product.findByIdAndUpdate(id, data, { new: true });
   return result;
};

// bulk update a Product ---
exports.bulkUpdateProductServices = async (data) => {
   // const result = await Product.updateMany({ _id: data.ids }, data.data, {
   //    runValidators: true,
   // });

   const products = [];

   data.ids.forEach((product) => {
      products.push(Product.updateOne({ _id: product.id }, product.data));
   });

   const result = await Promise.all(products);
   console.log(result);
};

// delete a Product by id ---
exports.deleteProductByIdService = async (id) => {
   const result = await Product.deleteOne({ _id: id });
   return result;
};

// bulk delete a Product ---
exports.bulkDeleteProductService = async (ids) => {
   const result = await Product.deleteMany({ _id: ids });
   return result;
};

// update many products ---
exports.updateManyServices = async (data) => {
   const result = await Product.create(data);
   return result;
};
