const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/Model.User");

const middlewareAuth = {
  authAccess: async (req, res, next) => {
    try {
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token)
        return next(new ErrorHandler("You are not authenticated!", 401));

      /**
       * @desc
       * if there is token and token is valid
       * pull user from DB and attach it to 'req' object
       * and forward it to next middleware
       */
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
        if (err) return next(new ErrorHandler("Invalid Authorization!", 403));

        const user = await User.findById(decoded._id);
        req.user = user;
        next();
      });
    } catch (error) {
      next(error);
    }
  },

  authRole: (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role.type)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role.type} is not allowed to access this resource!`,
          403
        )
      );
    }

    return next();
  },
};

module.exports = middlewareAuth;
