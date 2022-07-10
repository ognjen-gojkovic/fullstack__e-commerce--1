const Product = require("../models/Model.Product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/APIFeatures");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const ControllerProduct = {
  createProduct: async (req, res, next) => {
    try {
      console.log("req.body:", req.body);

      let images = [];
      if (typeof req.body.images === "string") {
        // if images are only one image and is a string
        // just push it to array
        images.push(req.body.images);
      } else {
        // if images are array then replaces it
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          publicId: result.public_id,
          url: result.secure_url,
        });
      }
      // on req.body save those links that points to cloudinary where pictures are served
      // and save it to db
      console.log("req.user:", req.user);
      req.body.images = imagesLinks;
      req.body.user = req.user._id;

      const product = await Product.create(req.body);
      return res
        .status(201)
        .json({ success: true, msg: "Product created.", product });
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const resPerPage = 8;
      const productsCount = await Product.countDocuments();
      const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

      const products = await apiFeatures.query;
      console.log("api features products: ", products);

      return res.status(200).json({
        success: true,
        msg: "Success.",
        productsCount,
        resPerPage,
        products,
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * @desc
   * get all products for admin     =>  @url /admin/products
   */
  getAdminProducts: async (req, res, next) => {
    try {
      const products = await Product.find();

      return res.status(200).json({
        success: true,
        msg: "Success.",
        products,
      });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * @desc
   * get single product     =>  @url /product/:id
   */
  getSingleProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return next(new ErrorHandler("No Such Product.", 404));

      return res.status(200).json({ success: true, msg: "Success.", product });
    } catch (error) {
      return next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      console.log("req.body update:", req.body);

      const product = await Product.findById(req.params.id);

      if (!product) next(new ErrorHandler("No Such Product.", 404));

      let images;
      if (typeof req.body.images === "string" && req.body.images.length > 0) {
        // if images are only one image and is a string
        // just push it to array
        images = [];
        images.push(req.body.images);
      } else {
        // if images are array then replaces it
        images = req.body.images;
      }

      console.log("update images.length:", images);
      if (images !== undefined && images.length > 0) {
        /**
         * @desc
         * delete images assosiated with product
         */
        for (let i = 0; i < product.images.length; i++) {
          const result = await cloudinary.v2.uploader.destroy(
            product.images[i].publicId
          );
        }
        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            publicId: result.public_id,
            url: result.secure_url,
          });
        }
        // on req.body save those links that points to cloudinary where pictures are served
        // and save it to db
        console.log("req.user:", req.user);
        req.body.images = imagesLinks;
      }

      const withNoImages = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        seller: req.body.seller,
      };
      Product.findByIdAndUpdate(
        req.params.id,
        req.body.images.length > 0 ? req.body : withNoImages,
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) return next(err);
          return res
            .status(201)
            .json({ success: true, msg: "Product Updated.", product: doc });
        }
      );
    } catch (error) {
      return next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) next(new ErrorHandler("No Such Product.", 404));

      /**
       * @desc
       * delete images assosiated with product
       */
      for (let i = 0; i < product.images.length; i++) {
        console.log("product:", product);
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].publicId
        );
      }

      await product.remove();
      return res.status(200).json({ success: true, msg: "Product Deleted." });
    } catch (error) {
      return next(error);
    }
  },

  /**
   * @desc
   * create product review     =>  @url /review
   */
  createProductReview: async (req, res, next) => {
    console.log("product id:", req.body);
    console.log("product user:", req.user);

    try {
      const { rating, comment, productId } = req.body;

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      const product = await Product.findById(productId);

      console.log("product review:", product);

      const isReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      /**
       * @desc
       * if review exists update it
       * one user can make one review
       */
      if (isReviewed) {
        product.reviews.forEach((review) => {
          if (review.user.toString() === req.user._id.toString()) {
            review.comment = comment;
            review.rating = rating;
          }
        });
        /**
         * @desc
         * if review don't exists create new
         */
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
        console.log("product numOfReviews:", product.numOfReviews);
      }

      /**
       * @desc
       * average review score
       */
      product.ratings =
        product.reviews.reduce((acc, item) => {
          return (acc += item.rating);
        }, 0) / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      return res
        .status(200)
        .json({ success: true, msg: "Review Created Successfully." });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get product reviews     =>  @url /reviews
   */
  getProductReviews: async (req, res, next) => {
    try {
      const product = await Product.findById(req.query.id);

      if (!product) return next(new ErrorHandler("Invalid product ID.", 400));

      return res
        .status(200)
        .json({ success: true, msg: "Success.", reviews: product.reviews });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * delete product reviews     =>  @url /reviews
   */
  deleteProductReview: async (req, res, next) => {
    try {
      const product = await Product.findById(req.query.productId);

      if (!product) return next(new ErrorHandler("Invalid product ID.", 400));

      console.log("new product before delete reviews:", product);

      const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req.query.id.toString()
      );

      console.log("new product after delete reviews:", product);

      const numOfReviews = reviews.length;

      /**
       * @desc
       * average review score
       */
      const ratings =
        product.reviews.reduce((acc, item) => {
          return (acc += item.rating);
        }, 0) / reviews.length;

      const newProduct = await Product.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      console.log("new product reviews:", newProduct);

      return res
        .status(200)
        .json({ success: true, msg: "Success.", reviews: newProduct.reviews });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ControllerProduct;
