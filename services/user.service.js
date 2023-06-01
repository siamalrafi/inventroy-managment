const User = require("../model/User");

// sign up a service
exports.signupService = async (userInfo) => {
   const user = await User.create(userInfo);
   return user;
};

exports.findUserByEmail = async (email) => {
   return await User.findOne({ email });
};

// exports.findUserByToken = async (token) => {
//   return await User.findOne({ confirmationToken: token });
// };
