const express = require("express");
const router = express.Router();
const controllerOrder = require("../controllers/Controller.Order");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { authAccess, authRole } = require("../middlewares/Middleware.Auth");

router
  .route("/order/new")
  .post(catchAsyncError(authAccess), catchAsyncError(controllerOrder.newOrder));
router
  .route("/order/:id")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(controllerOrder.getSingleOrder)
  );
router
  .route("/orders/me")
  .get(catchAsyncError(authAccess), catchAsyncError(controllerOrder.myOrders));

/**
 * @desc
 * admin routes
 */
router
  .route("/admin/orders")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerOrder.allOrders)
  );
router
  .route("/admin/order/:id")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerOrder.updateOrder)
  );
router
  .route("/admin/order/:id")
  .delete(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerOrder.deleteOrder)
  );

module.exports = router;
