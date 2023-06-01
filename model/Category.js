const mongoose = require("mongoose");
const validator = require("validator");

// create a new category schema object
const categorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: [true, "Please provide a category name"],
         lowercase: true,
         unique: true,
      },
      decription: String,
      imageUrl: {
         type: String,
         validate: [validator.isURL, "Please provide a valid URL"],
      },
   },
   {
      timestamps: true,
   }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
