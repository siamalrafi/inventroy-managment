const Product = require("../model/products.model");
const { createProductServices, getAllProductsServices, updateProductServices, bulkUpdateProductServices, deleteProductByIdService, bulkDeleteProductService, updateManyServices } = require("../services/product.services");

// create a new product ---
exports.createProduct = async (req, res, next) => {
   try {
      const result = await createProductServices(data);

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
      //{price:{$ gt:50}
      //{ price: { gt: '50' } }
      console.log(req.query);

      let filters = { ...req.query };

      //sort , page , limit -> exclude
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach((field) => delete filters[field]);

      //gt ,lt ,gte .lte
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

      filters = JSON.parse(filtersString);

      const queries = {};

      if (req.query.sort) {
         // price,qunatity   -> 'price quantity'
         const sortBy = req.query.sort.split(",").join(" ");
         queries.sortBy = sortBy;
         // console.log(sortBy);// available
      }

      if (req.query.fields) {
         const fields = req.query.fields.split(",").join(" ");
         queries.fields = fields;
         // console.log(fields); // available
      }

      if (req.query.page) {
         const { page = 1, limit = 10 } = req.query; // "3" "10"
         //50 products
         // each page 10 product
         //page 1--> 1-10
         //page 2--> 2-20
         //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
         //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
         //page 5--> 41-50

         const skip = (page - 1) * parseInt(limit);
         queries.skip = skip;
         queries.limit = parseInt(limit);
      }

      const products = await getAllProductsServices(filters, queries);

      res.status(200).json({
         status: "success",
         message: "Products fetched successfully.",
         result: products,
      });
   } catch (error) {
      res.status(400).json({
         status: "error",
         message: "Products can't not get.",
         error: error.message,
      });
   }
};

// update product by id ---
exports.updateProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const data = req.body;
      const result = await updateProductServices(id, data);
      return res.status(200).json({
         status: "success",
         message: "Product updated successfully.",
         result: result,
      });
   } catch (error) {
      return res.status(400).json({
         status: "error",
         message: "Product not updated.",
         error: error.message,
      });
   }
};

// bulk update ---
exports.bulkUpdateProduct = async (req, res, next) => {
   try {
      const data = req.body;
      const result = await bulkUpdateProductServices(data);

      res.status(200).json({
         status: "success",
         message: "Products updated successfully.",
         result: result,
      });
   } catch (error) {
      return res.status(400).json({
         status: "error",
         message: "Product not updated.",
         error: error.message,
      });
   }
};

// delete a product by id ---

exports.deleteProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const result = await deleteProductByIdService(id);

      if (!result.deletedCount) {
         return res.status(400).json({
            status: "fail",
            error: "Couldn't delete the product",
         });
      }

      res.status(200).json({
         status: "success",
         message: "Successfully deleted the product",
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         message: "Couldn't delete the product",
         error: error.message,
      });
   }
};

// bulk delete product ---
exports.bulkDeleteProduct = async (req, res, next) => {
   try {
      console.log(req.body);
      const result = await bulkDeleteProductService(req.body.ids);

      res.status(200).json({
         status: "success",
         message: "Successfully deleted the given products",
         result: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         message: "Couldn't delete the given products",
         error: error.message,
      });
   }
};

// update many ---
exports.updateMany = async (req, res, next) => {
   try {
      const data = req.body;

      const result = await updateManyServices(data);

      res.status(200).json({
         status: "success",
         message: "Product inserted successfully.",
         result: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "error",
         message: "Product not updated.",
         error: error.message,
      });
   }
};

// file uploading system ---

exports.fileUpload = async (req, res) => {
   try {
      console.log(req.body);
      res.status(200).json(req.files);
   } catch (error) {}
};
