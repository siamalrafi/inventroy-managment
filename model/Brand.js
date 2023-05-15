const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: [true, "Please provider a brand name"],
         maxLength: 100,
         unique: true,
         lowercase: true,
      },
      description: String,
      email: {
         type: String,
         lowercase: true,
         validate: [validator.isEmail, "please provide a email address."],
      },
      website: {
         type: String,
         validate: [validator.isURL, "Please provide a website link."],
      },
      location: String,
      products: [
         {
            type: ObjectId,
            ref: "Product",
         },
      ],
      suppliers: [
         {
            name: String,
            contactNumber: String,
            id: {
               type: ObjectId,
               ref: "Supplier",
            },
         },
      ],
      status: {
         type: String,
         enum: ["active", "inactive"],
         default: "active",
      },
   },
   {
      timestamps: true,
   }
);

// create model ---
const Brand = mongoose.model("Brand", brandSchema);

// export model ---
module.exports = Brand;
