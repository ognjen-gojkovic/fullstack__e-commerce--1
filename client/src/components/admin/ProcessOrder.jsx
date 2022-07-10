import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  updateOrderAdminFetch,
  updateOrderClearError,
  updateOrderReset,
} from "../../redux/actions/Actions.AdminUpdateOrder";
import {
  orderDetailsFetch,
  orderClearError,
} from "../../redux/actions/Actions.OrderDetails";

import Sidebar from "./Sidebar";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const reduxStateUpdateOrder = useSelector(
    (state) => state.reducerAdminUpdateOrder
  );
  const reduxStateOrderDetails = useSelector(
    (state) => state.reducerOrderDetails
  );

  const accessToken = sessionStorage.getItem("accessToken");

  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    const id = params.id;
    dispatch(orderDetailsFetch(id, accessToken));

    if (reduxStateUpdateOrder.error) {
      alert(reduxStateUpdateOrder.error.message);
      dispatch(updateOrderClearError());
    }

    if (reduxStateOrderDetails.error) {
      alert(reduxStateUpdateOrder.error.message);
      dispatch(orderClearError());
    }

    if (reduxStateUpdateOrder.isUpdated) {
      navigate("/admin/orders");
      alert("Product updated successfully.");
      dispatch(updateOrderReset());
    }
  }, [
    dispatch,
    reduxStateUpdateOrder.error,
    reduxStateUpdateOrder.isUpdated,
    accessToken,
    navigate,
    params.id,
    reduxStateOrderDetails.error,
  ]);

  const handleUpdate = (id) => {
    if (!status) {
      alert(
        "Choose order status before submiting:\n* Proccesing\n* Shiped\n* Delivered"
      );
      return;
    }
    dispatch(updateOrderAdminFetch(id, status, accessToken));
  };

  const shippingDetails =
    reduxStateOrderDetails.order &&
    `${reduxStateOrderDetails.order.order.shippingInfo.address}, ${reduxStateOrderDetails.order.order.shippingInfo.city}, ${reduxStateOrderDetails.order.order.shippingInfo.postalCode}, ${reduxStateOrderDetails.order.order.shippingInfo.country},`;

  const isPaid =
    reduxStateOrderDetails.order &&
    reduxStateOrderDetails.order.order.paymentInfo.status === "COMPLETED"
      ? true
      : false;

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            {reduxStateOrderDetails.order && (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="my-5">
                    Order # {reduxStateOrderDetails.order.order._id}
                  </h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b>
                    {reduxStateOrderDetails.order.order.user.name}
                  </p>
                  <p>
                    <b>Phone:</b>
                    {reduxStateOrderDetails.order.order.shippingInfo.phone}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> $
                    {reduxStateOrderDetails.order.order.totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={`${isPaid ? "greenColor" : "redColor"}`}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Paypal ID:</h4>
                  <p className={`${isPaid ? "greenColor" : "redColor"}`}>
                    <b>
                      {reduxStateOrderDetails.order &&
                        reduxStateOrderDetails.order.order.paymentInfo.id}
                    </b>
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
                  <div className="cart-item my-1">
                    {reduxStateOrderDetails.order &&
                      reduxStateOrderDetails.order.order.orderItems.map(
                        (item) => (
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
                                <Link to={`/product/${item._id}`}>
                                  {item.name}
                                </Link>
                              </div>

                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>${item.price}</p>
                              </div>

                              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item.quantity} Piece(s)</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() =>
                      handleUpdate(reduxStateOrderDetails.order.order._id)
                    }
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
