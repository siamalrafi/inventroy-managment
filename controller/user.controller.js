const User = require("../model/User");
const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
   try {
      const user = await signupService(req.body);

      res.status(200).json({
         status: "success",
         message: "Successfully signed up",
         result: user,
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         message: "Failed to sign up",
         error: error.message,
      });
   }
};

// login user ---
exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(401).json({
            status: "fail",
            error: "Please provide your credentials",
         });
      }

      const user = await findUserByEmail(email);

      if (!user) {
         return res.status(401).json({
            status: "fail",
            error: "No user found. Please create an account",
         });
      }

      const isPasswordValid = user.comparePassword(password, user.password);

      if (!isPasswordValid) {
         return res.status(403).json({
            status: "fail",
            error: "Password is not correct",
         });
      }

      // if (user.status != "active") {
      //    return res.status(401).json({
      //       status: "fail",
      //       error: "Your account is not active yet.",
      //    });
      // }

      const token = generateToken(user);
      const { password: pwd, ...others } = user.toObject();

      res.status(200).json({
         status: "success",
         message: "Successfully login",
         data: {
            user: others,
            token,
         },
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         message: "Failed to login",
         error: error.message,
      });
   }
};

exports.getMe = async (req, res) => {
   try {
      const user = await findUserByEmail(req.user?.email);

      res.status(200).json({
         status: "success",
         data: user,
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         error,
      });
   }
};
