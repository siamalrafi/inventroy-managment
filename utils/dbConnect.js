const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();

const dbConnect = () => {
   return mongoose.connect(process.env.MONGO_URILocal, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
};

module.exports = dbConnect;
