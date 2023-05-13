const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

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
      price: {
         type: Number,
         required: true,
         min: [0, "Price can't be negative"],
      },
      unit: {
         type: String,
         required: true,
         enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs",
         },
      },
      quantity: {
         type: Number,
         required: true,
         min: [0, "quantity cant be negative"],
         validate: {
            validator: (value) => {
               const isInteger = Number.isInteger(value);
               if (isInteger) {
                  return true;
               } else {
                  return false;
               }
            },
         },
         message: "Qunatity must be an integer",
      },
      status: {
         type: String,
         required: true,
         enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}",
         },
      },
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
      // categories: [{
      //   name: {
      //     type: String,
      //     required: true
      //   },
      //   _id: mongoose.Schema.Types.ObjectId
      // }]
   },
   {
      timestamps: true,
   }
);

// mongoose models ---
const Product = mongoose.model("Product", productSchema);

// posting to database ---
app.post("/api/v1/product", async (req, res, next) => {
   const data = req.body;
   const result = await Product.insertMany(data);

   if (result) {
      return res.status(400).json({
         message: "Product inserted successfully.",
         result: result,
      });
   }
});

// get your own data ---
app.get("/", (req, res) => {
   res.send("Route is working! YaY!");
});

module.exports = app;
