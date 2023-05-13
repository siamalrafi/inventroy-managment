const mongoose = require("mongoose");

const dbConnect = () => {
   console.log("db connected");
   return mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
};

module.exports = dbConnect;
