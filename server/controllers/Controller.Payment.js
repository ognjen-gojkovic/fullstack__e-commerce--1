const paypal = require("@paypal/checkout-server-sdk");
const Product = require("../models/Model.Product");

const controllerPayment = {
  /**
   * @desc
   * create payment             @url /create_payment
   */
  createPayment: async (req, res, next) => {
    /**
     * @desc
     * test items fetched from db
     */
    console.log("req:", req.body);

    const boughtItems = await Product.find({
      _id: { $in: req.body.orderItems },
    });

    console.log("items:", boughtItems);

    let total = req.body.orderItems.reduce((sum, item, idx) => {
      return sum + boughtItems[idx].price * item.quantity;
    }, 0);

    let allTotal = total + +req.body.shippingPrice + +req.body.taxPrice;
    console.log("total:", total);

    // Creating an environment
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    let environment = new paypal.core.SandboxEnvironment(
      clientId,
      clientSecret
    );
    let client = new paypal.core.PayPalHttpClient(environment);

    // Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: allTotal,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
              tax_total: {
                currency_code: "USD",
                value: req.body.taxPrice,
              },
              shipping: {
                currency_code: "USD",
                value: req.body.shippingPrice,
              },
            },
          },
          items: boughtItems.map((item, idx) => {
            console.log("item total:", boughtItems);

            return {
              name: item.name,
              unit_amount: {
                currency_code: "USD",
                value: item.price,
              },
              quantity: req.body.orderItems[idx].quantity,
            };
          }),
        },
      ],
    });

    let response = await client.execute(request);

    res.status(200).json({ response });
  },
  /**
   * @desc
   * execute payment             @url /execute_payment
   */
  executePayment: async (req, res, next) => {
    console.log("req.body:", req.body);

    // Creating an environment
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    let environment = new paypal.core.SandboxEnvironment(
      clientId,
      clientSecret
    );
    let client = new paypal.core.PayPalHttpClient(environment);

    let request = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client.execute(request);

    console.log("response execute:", response);

    res.status(200).json({ response });
  },
};

module.exports = controllerPayment;
