import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutSteps from "./CheckoutSteps";
import StyledPayment from "./PaypalPayment";

const ConfirmOrder = () => {
  const reduxStateCart = useSelector((state) => state.reducerCart);
  const reduxStateAuth = useSelector((state) => state.reducerAuth);
  const [processPayment, setProcesPayment] = React.useState(false);

  /**
   * @desc
   * calculate order price
   */
  const orderPrice = reduxStateCart.cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const shippingPrice = orderPrice > 200 ? 0 : 25;
  const taxPrice = Number(0.05 * orderPrice).toFixed(2);
  const totalPrice = +orderPrice + +shippingPrice + +taxPrice;

  const processToPayment = () => {
    const data = {
      orderPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    setProcesPayment(true);
  };

  return (
    <>
      <CheckoutSteps confirmOrder shipping />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b>
            {reduxStateAuth.user && reduxStateAuth.user.name}
          </p>
          <p>
            <b>Phone:</b>
            {reduxStateCart.shippingInfo && reduxStateCart.shippingInfo.phone}
          </p>
          <p className="mb-4">
            <b>Address:</b>
            {reduxStateCart.shippingInfo &&
              `${reduxStateCart.shippingInfo.address}, ${reduxStateCart.shippingInfo.city}, ${reduxStateCart.shippingInfo.postalCode}, ${reduxStateCart.shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {reduxStateCart.cart.map((item) => (
            <>
              <hr />
              <div className="cart-item my-1" key={item._name}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={item._id}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}

          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4">
          {!processPayment ? (
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${orderPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <StyledPayment />
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
