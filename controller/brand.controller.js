const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.service");

// create a brand product ---
exports.createBrand = async (req, res, next) => {
   try {
      const result = await createBrandService(req.body);
      res.status(200).json({
         status: "success",
         message: "Successfully created the brand",
         result: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: "Couldn't create the brand",
         result: error.message,
      });
   }
};

// get all brand services
exports.getBrands = async (req, res, next) => {
   try {
      const brands = await getBrandsService(req.body);

      res.status(200).json({
         status: "success",
         data: brands,
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({
         status: "fail",
         error: "Couldn't get the brands",
      });
   }
};

/// get brand data by id ---
exports.getBrandById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const brand = await getBrandByIdService(id);

      if (!brand) {
         return res.status(400).json({
            status: "fail",
            error: "Couldn't find a brand with this id",
         });
      }

      res.status(200).json({
         status: "success",
         massage: "get data successfully",
         result: brand,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: "Couldn't get the brands",
         result: error.message,
      });
   }
};

/// update brand data by id ---
exports.updateBrand = async (req, res, next) => {
   try {
      const { id } = req.params;
      const result = await updateBrandService(id, req.body);

      if (!result.modifiedCount) {
         return res.status(400).json({
            status: "fail",
            error: "Couldn't update the brand with this id",
         });
      }

      res.status(200).json({
         status: "success",
         message: "Successfully updated the brand",
         result: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: "Couldn't update the brand",
         result: error.message,
      });
   }
};
