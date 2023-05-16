const Brand = require("../model/Brand");

// create a new brand service ---
exports.createBrandService = async (data) => {
   const result = await Brand.create(data);
   return result;
};

// get all brand services
exports.getBrandsService = async () => {
   const brands = await Brand.find({}).select("-products -suppliers");
   return brands;
};

// get brand data by id services---
exports.getBrandByIdService = async (id) => {
   const brand = await Brand.findOne({ _id: id });
   return brand;
};

/// update brand data by id services---
exports.updateBrandService = async (id, data) => {
   const result = await Brand.updateOne({ _id: id }, data);
   return result;
};

//store
//category
