const Order = require("../models/Model.Order");
const Product = require("../models/Model.Product");
const ErrorHandelr = require("../utils/ErrorHandler");

const controllerOrder = {
  /**
   * @desc
   * create new order             @url /order/new
   */
  newOrder: async (req, res, next) => {
    try {
      const {
        orderItems,
        shippingInfo,
        taxPrice,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      } = req.body;

      const order = await Order.create({
        orderItems: orderItems.map((item) => {
          return {
            ...item,
            image: item.images[0].url,
            product: item._id,
          };
        }),
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
      });

      res.status(201).json({ success: true, msg: "Order Created.", order });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get logged user single order             @url /order/:id
   */
  getSingleOrder: async (req, res, next) => {
    console.log("id:", req.params.id);
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (!order)
        return next(new ErrorHandelr("No Order was found with this ID.", 404));

      res.status(200).json({ success: true, success: "Success", order });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get logged user all orders             @url /orders/me
   */
  myOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user._id });

      if (!orders)
        return next(new ErrorHandelr("No Order was found with this ID.", 404));

      res.status(200).json({ success: true, success: "Success", orders });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * get single user all orders             @url /admin/orders
   */
  allOrders: async (req, res, next) => {
    try {
      const orders = await Order.find();

      let totalAmount = 0;
      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res
        .status(200)
        .json({ success: true, success: "Success", totalAmount, orders });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * update / process order             @url /admin/order/:id
   */
  updateOrder: async (req, res, next) => {
    console.log("req.body:", req.body);
    try {
      const order = await Order.findById(req.params.id);

      if (order.orderStatus === "Delivered")
        return next(new ErrorHandelr("This order is already delivered.", 400));

      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });

      order.orderStatus = req.body.status;
      order.deliveredAt = Date.now();

      await order.save();

      res.status(200).json({ success: true, success: "Order Updated." });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @desc
   * delete order             @url /admin/order/:id
   */
  deleteOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order)
        return next(new ErrorHandelr("No Order was found with this ID.", 404));

      await order.remove();

      res.status(200).json({ success: true, success: "Order Deleted." });
    } catch (error) {
      next(error);
    }
  },
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

module.exports = controllerOrder;

/**
 *
 *
 */
