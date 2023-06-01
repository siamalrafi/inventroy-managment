const Category = require("../model/Category");

// get all categories
exports.getCategoriesService = async () => {
   const categories = await Category.find({});
   return categories;
};

// all categories services
exports.createCategoryService = async (data) => {
   const category = await Category.create(data);
   return category;
};
