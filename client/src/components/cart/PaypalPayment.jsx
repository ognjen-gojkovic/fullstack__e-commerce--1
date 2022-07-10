import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/Actions.Order";
import styled from "styled-components";

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const reduxStateOrder = useSelector((state) => state.reducerOrder);
  const reduxStateCart = useSelector((state) => state.reducerCart);
  const navigate = useNavigate();
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  React.useEffect(() => {
    if (reduxStateOrder.error) alert(`${reduxStateOrder.error.message}`);
  }, [dispatch, reduxStateOrder.error]);

  /**
   * @desc
   * create order obj that we will save to db
   */
  const order = {
    orderItems: reduxStateCart.cart,
    shippingInfo: reduxStateCart.shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.orderPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const createOrderHandler = () => {
    return fetch("http://localhost:5000/api/create_payment", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          !data.response.statusCode === 201 &&
          data.response.result.status !== "CREATED"
        )
          return Promise.reject(data);
        return data.response.result.id;
      })
      .catch((err) => alert(err.message));
  };

  const onApproveHandler = (orderID) => {
    return fetch("http://localhost:5000/api/execute_payment", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderID),
    })
      .then((res) => {
        return res.json();
      })
      .then((details) => {
        if (
          !details.response.statusCode === 201 ||
          details.response.result.status !== "COMPLETED"
        ) {
          return Promise.reject(details);
        }

        order.paymentInfo = {
          id: details.response.result.id,
          status: details.response.result.status,
        };

        dispatch(createOrder(order, accessToken));
        alert(
          "Purchase completed successfully " +
            details.response.result.payer.name.given_name
        );

        navigate("/success");
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  return (
    <StyledPayment>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons
          createOrder={() => createOrderHandler()}
          onApprove={(data) => onApproveHandler(data)}
        />
      </PayPalScriptProvider>
    </StyledPayment>
  );
};

export default PaypalPayment;

const StyledPayment = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.2);
`;
