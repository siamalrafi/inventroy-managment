const mongoose = require("mongoose");

// schema design
const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide a name for this product."],
         trim: true,
         unique: [true, "Name must be unique"],
         minLength: [3, "Name must be at least 3 characters."],
         maxLength: [100, "Name is too large"],
      },
      description: {
         type: String,
         required: true,
      },
      imageURLs: [{ type: String, required: true }],
      // price: {
      //    type: Number,
      //    required: true,
      //    min: [0, "Price can't be negative"],
      // },
      unit: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      // quantity: {
      //    type: Number,
      //    required: true,
      //    min: [0, "quantity cant be negative"],
      //    validate: {
      //       validator: (value) => {
      //          const isInteger = Number.isInteger(value);
      //          if (isInteger) {
      //             return true;
      //          } else {
      //             return false;
      //          }
      //       },
      //    },
      //    message: "Qunatity must be an integer",
      // },
      // status: {
      //    type: String,
      //    required: true,
      //    enum: {
      //       values: ["in-stock", "out-of-stock", "discontinued"],
      //       message: "status can't be {VALUE}",
      //    },
      // },
      // createdAt: {
      //   type: Date,
      //   default: Date.now,
      // },
      // updatedAt: {
      //   type: Date,
      //   default: Date.now
      // }
      // supplier: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Supplier"
      // },
      brand: [
         {
            name: {
               type: String,
               required: true,
            },
            id: {
               type: String,
               required: false,
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);

/* // middleware for mongoose
 
 // before post ---
 productSchema.pre("save", function (next) {
    console.log("// before post");
    if (this.quantity === 0) {
       this.status = "out-of-stock";
    }
 
    next();
 });
 
 // after post ---
 productSchema.post("save", function (doc, next) {
    console.log("// after post ---");
 
    next();
 });
 
 // method ---
 productSchema.methods.logger = function () {
    console.log(`data saved for ${this.price}`);
 }; */

// mongoose models ---
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
