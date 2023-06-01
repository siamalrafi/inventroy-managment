const jwt = require("jsonwebtoken");

// generate new token
exports.generateToken = (userInfo) => {
   const payload = {
      email: userInfo.email,
      role: userInfo.role,
   };

   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "7days",
   });

   return token;
};
