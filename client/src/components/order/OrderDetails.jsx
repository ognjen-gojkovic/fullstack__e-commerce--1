import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  orderDetailsFetch,
  orderClearError,
} from "../../redux/actions/Actions.OrderDetails";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const reduxStateOrderDetails = useSelector(
    (state) => state.reducerOrderDetails
  );
  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    dispatch(orderDetailsFetch(params.id, accessToken));

    if (reduxStateOrderDetails.error)
      alert(`${reduxStateOrderDetails.error.message}`);
    dispatch(orderClearError());
  }, [dispatch, accessToken, reduxStateOrderDetails.error, params.id]);

  const isPaid =
    reduxStateOrderDetails.order &&
    reduxStateOrderDetails.order.order.paymentInfo.status === "COMPLETED"
      ? true
      : false;

  const shippingDetails =
    reduxStateOrderDetails.order &&
    `${reduxStateOrderDetails.order.order.shippingInfo.address}, ${reduxStateOrderDetails.order.order.shippingInfo.city}, ${reduxStateOrderDetails.order.order.shippingInfo.postalCode}, ${reduxStateOrderDetails.order.order.shippingInfo.country},`;
  return (
    <>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-details">
          <h1 className="my-5">
            Order #{" "}
            {reduxStateOrderDetails.order &&
              reduxStateOrderDetails.order.order._id}
          </h1>

          <h4 className="mb-4">Shipping Info</h4>
          <p>
            <b>Name:</b>{" "}
            {reduxStateOrderDetails.order &&
              reduxStateOrderDetails.order.order.user.name}
          </p>
          <p>
            <b>Phone:</b>{" "}
            {reduxStateOrderDetails.order &&
              reduxStateOrderDetails.order.order.shippingInfo.phone}
          </p>
          <p className="mb-4">
            <b>Address:</b>
            {shippingDetails}
          </p>
          <p>
            <b>Amount:</b> ${" "}
            {reduxStateOrderDetails.order &&
              reduxStateOrderDetails.order.order.totalPrice}
          </p>

          <hr />

          <h4 className="my-4">Payment</h4>
          <p className={`${isPaid ? "greenColor" : "redColor"}`}>
            <b>PAID</b>
          </p>

          <h4 className="my-4">Order Status:</h4>
          <p className="greenColor">
            <b>
              {reduxStateOrderDetails.order &&
                reduxStateOrderDetails.order.order.orderStatus}
            </b>
          </p>

          <h4 className="my-4">Order Items:</h4>
          <hr />
          {reduxStateOrderDetails.order &&
            reduxStateOrderDetails.order.order.orderItems.map((item) => (
              <div key={item.name} className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${item.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{item.quantity} Piece(s)</p>
                  </div>
                </div>
              </div>
            ))}

          <hr />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
