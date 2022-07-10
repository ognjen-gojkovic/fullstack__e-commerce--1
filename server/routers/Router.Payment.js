const express = require("express");
const router = express.Router();
const controllerPayment = require("../controllers/Controller.Payment");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { authAccess, authRole } = require("../middlewares/Middleware.Auth");

router
  .route("/create_payment")
  .post(catchAsyncError(controllerPayment.createPayment));
router
  .route("/execute_payment")
  .post(catchAsyncError(controllerPayment.executePayment));

module.exports = router;
