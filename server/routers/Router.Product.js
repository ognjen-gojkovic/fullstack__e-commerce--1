const express = require("express");
const router = express.Router();
const controllerProduct = require("../controllers/Controller.Product");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { authAccess, authRole } = require("../middlewares/Middleware.Auth");

router
  .route("/products")
  .get(catchAsyncError(controllerProduct.getAllProducts));
router;
router
  .route("/admin/products")
  .get(catchAsyncError(controllerProduct.getAdminProducts));
router
  .route("/products/:id")
  .get(catchAsyncError(controllerProduct.getSingleProduct));
router
  .route("/admin/products/:id")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerProduct.updateProduct)
  );
router
  .route("/admin/products/:id")
  .delete(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerProduct.deleteProduct)
  );
router
  .route("/admin/products/new")
  .post(
    catchAsyncError(authAccess),
    catchAsyncError(authRole("admin")),
    catchAsyncError(controllerProduct.createProduct)
  );

router
  .route("/reviews")
  .put(
    catchAsyncError(authAccess),
    catchAsyncError(controllerProduct.createProductReview)
  );
router
  .route("/reviews")
  .get(
    catchAsyncError(authAccess),
    catchAsyncError(controllerProduct.getProductReviews)
  );
router
  .route("/reviews")
  .delete(
    catchAsyncError(authAccess),
    catchAsyncError(controllerProduct.deleteProductReview)
  );

module.exports = router;
