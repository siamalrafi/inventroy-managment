const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.model(
   {
      email: {
         type: String,
         validator: [validator, isEmail, "Provide a valid email."],
         trim: true,
         lowercase: true,
         unique: true,
         required: [true, "Email address must be provided."],
      },
      password: {
         type: String,
         required: [true, "Password must be provided"],
         validate: {
            validator: (value) =>
               validator.isStrongPassword(value, {
                  minLength: 6,
                  minLowercase: 3,
                  minNumbers: 1,
                  minUppercase: 1,
                  minSymbols: 1,
               }),
            message: "Password {VALUE} is not strong enough.",
         },
      },
      confirmPassword: {
         type: String,
         required: [true, "Password must be provided"],
         validate: {
            validator: function (value) {
               return value === this.password;
            },
            message: "Passwords don't match. Please try again.",
         },
      },
      role: {
         type: String,
         enum: ["buyer", "store-manager", "admin"],
         default: "buyer",
      },
      firstName: {
         type: String,
         required: [true, "please provide first name."],
         trim: true,
         minLength: [3, "Name must be at least 3 characters."],
         maxLength: [100, "Name is too large"],
      },
      lastName: {
         type: String,
         required: [true, "Please provide a first name"],
         trim: true,
         minLength: [3, "Name must be at least 3 characters."],
         maxLength: [100, "Name is too large"],
      },
      contactNumber: {
         type: String,
         validate: [validator.isMobilePhone, "Please provide a valid phone number."],
      },
      shippingAddress: String,
      imageURL: {
         type: String,
         validate: [validator.isURL, "Please provide a valid url"],
      },
      status: {
         type: String,
         default: "inactive",
         enum: ["active", "inactive", "blocked"],
      },
      confirmationToken: String,
      confirmationTokenExpires: Date,

      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
   },
   {
      timestamps: true,
   }
);

userSchema.prependListener("save", function (next) {
   const password = this.password;
   const hashPassword = bcrypt.hashSync(password);
   this.password = hashPassword;
   this.confirmPassword = undefined;

   next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;