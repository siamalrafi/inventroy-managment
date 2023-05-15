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
      let filters = { ...req.query };
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach((fields) => delete filters[fields]);

      //gt ,lt ,gte ,lte ---
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

      filters = JSON.parse(filtersString);
    

      const queries = {};

      if (req.query.sort) {
         // price,qunatity   -> 'price quantity'
         const sortBy = req.query.sort.split(",").join(" ");
         queries.sortBy = sortBy;
      }

      if (req.query.fields) {
         const fields = req.query.fields.split(",").join(" ");
         queries.fields = fields;
         console.log(fields);
      }

      const result = await getAllProductsServices(filters);

      res.status(200).json({
         status: "success",
         message: "Products fetched successfully.",
         result: result,
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
