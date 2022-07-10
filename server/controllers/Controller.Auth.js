const User = require("../models/Model.User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/SendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const controllerAuth = {
  /**
   * @desc
   * register new user      =>  @url /api/register
   */
  register: async (req, res, next) => {
    try {
      const { name, email, password, avatar } = req.body;

      /**
       * @desc
       * handle this part when you start build frontend
       * upload profile picture to cloudinary service
       */
      const profilePic = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      /**
       * @desc
       * register new user
       */
      const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: profilePic.public_id,
          url: profilePic.secure_url,
        },
      });

      /**
       * @desc
       * generate access and refresh token
       */
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      /**
       * @desc
       * remove password from document we will send to frontend
       */
      const newUser = { ...user._doc };
      newUser.password = undefined;

      /**
       * @desc
       * save refresh token to cookies header
       * on client side in 'fetch' method should be set option 'credentials: "include"'
       * on server side in cors options object should be set 'credentials: true'
       *
       * secure should be enabled when using 'https' protocol
       * when setting cookie-header from cross-origin 'sameSite' property should be 'none'
       * also in browser settings in my case 'Goggle Chrome' in 'security' section
       * should be enabled setting cookies from the third party
       */
      if (newUser && refreshToken.length > 50)
        res.cookie("refresh_token", refreshToken, {
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

      return res.status(201).json({
        success: true,
        msg: "User Registered.",
        user: newUser,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * login registerd user      =>  @url /api/login
   */
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      /**
       * @desc
       * check if user entered their credentials
       */
      if (!email)
        return next(new ErrorHandler("Please enter your email.", 400));
      if (!password)
        return next(new ErrorHandler("Please enter your password.", 400));

      /**
       * @desc
       * check if that user is in database
       */
      const userDB = await User.findOne({ email }).select("+password");

      if (!userDB)
        return next(new ErrorHandler("Invalid email or password.", 401));

      /**
       * @desc
       * compare passwords
       */
      const isMatch = await userDB.matchPasswords(password);

      if (!isMatch)
        return next(new ErrorHandler("Invalid email or password.", 401));

      /**
       * @desc
       * generate access and refresh token
       */
      const accessToken = userDB.generateAccessToken();
      const refreshToken = userDB.generateRefreshToken();

      /**
       * @desc
       * remove password from document we will send to frontend
       */
      const newUser = { ...userDB._doc };
      newUser.password = undefined;
      newUser.resetPasswordToken = undefined;
      newUser.resetPasswordExpire = undefined;
      newUser.createdAt = undefined;
      newUser._id = undefined;

      /**
       * @desc
       * save refresh token to cookies header
       * on client side in 'fetch' method should be set option 'credentials: "include"'
       * on server side in cors options object should be set 'credentials: true'
       *
       * secure should be enabled when using 'https' protocol
       * when setting cookie-header from cross-origin 'sameSite' property should be 'none'
       * also in browser settings in my case 'Goggle Chrome' in 'security' section
       * should be enabled setting cookies from the third party
       */
      if (newUser && refreshToken.length > 50)
        res.cookie("refresh_token", refreshToken, {
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

      return res.status(200).json({
        success: true,
        msg: "Logged In.",
        user: newUser,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get details of currently logged user      =>  @url /api/me
   */
  getUserProfile: async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      const accessToken = user.generateAccessToken();

      res.status(200).json({ success: true, msg: "Success", accessToken });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * logout user      =>  @url /api/logout
   */
  logout: (req, res, next) => {
    try {
      res.clearCookie("refresh_token");

      return res.status(200).json({ success: true, msg: "Loged Out!" });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * send email with url for password recovery      =>  @url /api/password/forgot
   */
  forgotPassword: async (req, res, next) => {
    try {
      /**
       * @desc
       * find user in database
       */
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(new ErrorHandler("User doesn't exists.", 404));

      console.log("user from email:", user.email);
      /**
       * @desc
       * generate reset pasword token
       * and save token into user document
       */
      const resetToken = user.generateResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      /**
       * @desc
       * create url for reset password
       */
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/password/reset/${resetToken}`;

      const message = `Your reset password token is as follows;\n\n${resetUrl}\n\nIf you have not requested this email, ignore it.`;

      try {
        /**
         * @desc
         * send reset password token and message via email
         */
        await sendEmail({
          email: user.email,
          subject: "Password Recovery",
          message,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
      }

      /**
       * @desc
       * send response
       */
      res
        .status(200)
        .json({ success: true, msg: `Email sent to: ${user.email}` });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * reset password      =>  @url /password/reset/:resetToken
   */
  resetPassword: async (req, res, next) => {
    try {
      /**
       * @desc
       * hash reset token
       */
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

      /**
       * @desc
       * try to find user in database
       */
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user)
        return next(
          new ErrorHandler(
            "Password reset token is invalid\nor has been expired.",
            400
          )
        );

      /**
       * @desc
       * check if passwords match
       */
      if (req.body.password !== req.body.confirmPassword)
        return next(new ErrorHandler("Passwords do not match.", 400));

      /**
       * @desc
       * generate access token
       */
      const accessToken = user.generateAccessToken();

      /**
       * @desc
       * set new password
       */
      user.password = req.body.confirmPassword;

      await user.save();

      /**
       * @desc
       * remove password field from user doc
       */
      const newUser = { ...user._doc };
      newUser.password = undefined;
      newUser.resetPasswordToken = undefined;
      newUser.resetPasswordExpire = undefined;

      return res.status(200).json({
        success: true,
        msg: "Password Reset Success.",
        accessToken,
        user: newUser,
      });
    } catch (error) {
      next(err);
    }
  },

  /**
   * @desc
   * update password      =>  @url /password/update
   */
  updatePassword: async (req, res, next) => {
    console.log("update pass req body: ", req.body);
    try {
      const user = await User.findById(req.user._id).select("+password");

      /**
       * @desc
       * compare passwords
       */
      const isMatch = user.matchPasswords(req.body.oldPassword);

      if (!isMatch) return next(new ErrorHandler("Password is Invaid!", 400));

      /**
       * @desc
       * save new password into database
       */
      user.password = req.body.newPassword;
      user.save();

      /**
       * @desc
       * generate access token
       */
      const accessToken = user.generateAccessToken();

      /**
       * @desc
       * remove password field from user doc
       */
      const newUser = { ...user._doc };
      newUser.password = undefined;

      return res.status(200).json({
        success: true,
        msg: "Password Reset Success.",
        accessToken,
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * update user profile      =>  @url /me/update
   */
  updateProfile: async (req, res, next) => {
    console.log("update req:", req.files);
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };

      /**
       * @desc
       * update avatar
       */
      if (req.files !== []) {
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(
          req.files.avatar.tempFilePath,
          {
            folder: "avatars",
            width: 150,
            crop: "scale",
          }
        );
        console.log("result:", result);
        // attach avatar to the response object
        newUserData.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      /**
       * @desc
       * updateUser
       */
      const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      return res
        .status(200)
        .json({ success: true, msg: "Profile Updated.", user });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get all users      =>  @url /admin/users
   */
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();

      res.status(200).json({ success: true, msg: "Success.", users });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get user details      =>  @url /admin/user/:id
   */
  getUserDetails: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return next(
          new ErrorHandler(`User not found with id: ${req.params.id}`, 400)
        );

      res.status(200).json({ success: true, msg: "Success", user });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * update user profile      =>  @url /admin/user/:id
   */
  adminUpdateUser: async (req, res, next) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

      /**
       * @desc
       * update User
       */
      const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      return res
        .status(200)
        .json({ success: true, msg: "Profile Updated.", user });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * delete user      =>  @url /admin/user/:id
   */
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return next(
          new ErrorHandler(`User not found with id: ${req.params.id}`, 400)
        );

      /**
       * @desc
       * remove avatar picture from cloudinary
       */

      console.log("product:", user);
      const result = await cloudinary.v2.uploader.destroy(
        user.avatar.public_id
      );

      user.remove();

      return res
        .status(200)
        .json({ success: true, msg: "User Deleted.", user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = controllerAuth;
