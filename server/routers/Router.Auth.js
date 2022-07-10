const express = require("express");
const router = express.Router();
const controllerAuth = require("../controllers/Controller.Auth");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { authAccess, authRole } = require("../middlewares/Middleware.Auth");

/**
 * @desc
 * auth routes
 */
router.route("/register").post(catchAsyncError(controllerAuth.register));
router.route("/login").post(catchAsyncError(controllerAuth.login));
router
  .route("/logout")
  .get(catchAsyncError(authAccess), catchAsyncError(controllerAuth.logout));

/**
 * @desc
 * password update / reset routes
 */
router
  .route("/password/forgot")
  .post(catchAsyncError(controllerAuth.forgotPassword));
router
  .route("/password/reset/:resetToken")
  .put(catchAsyncError(controllerAuth.resetPassword));
router
  .route("/password/update")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(controllerAuth.updatePassword)
  );

/**
 * @desc
 * user profile update routes
 */
router
  .route("/me")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(controllerAuth.getUserProfile)
  );
router
  .route("/me/update")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(controllerAuth.updateProfile)
  );

/**
 * @desc
 * admin routes
 */
router
  .route("/admin/users")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerAuth.getAllUsers)
  );
router
  .route("/admin/user/:id")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerAuth.getUserDetails)
  );
router
  .route("/admin/user/:id")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerAuth.adminUpdateUser)
  );
router
  .route("/admin/user/:id")
  .delete(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerAuth.deleteUser)
  );

module.exports = router;
