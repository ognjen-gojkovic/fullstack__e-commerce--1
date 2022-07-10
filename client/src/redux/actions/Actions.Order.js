import { typesOrder } from "../types/Types.Order";

const createOrderStart = () => {
  return {
    type: typesOrder.CREATE_ORDER_START,
  };
};

const createOrderSuccess = (data) => {
  return {
    type: typesOrder.CREATE_ORDER_SUCCESS,
    payload: data,
  };
};

const createOrderError = (data) => {
  return {
    type: typesOrder.CREATE_ORDER_ERROR,
    payload: data,
  };
};

export const orderClearError = () => {
  return {
    type: typesOrder.ORDER_CLEAR_ERROR,
  };
};

export const createOrder = (order, accessToken) => (dispatch) => {
  dispatch(createOrderStart());
  fetch("http://localhost:5000/api/order/new", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(createOrderSuccess(data));
    })
    .catch((err) => {
      dispatch(createOrderError(err));
    });
};
