import { typesOrder } from "../types/Types.Order";

const myOrdersStart = () => {
  return {
    type: typesOrder.MY_ORDERS_START,
  };
};

const myOrdersSuccess = (data) => {
  return {
    type: typesOrder.MY_ORDERS_SUCCESS,
    payload: data,
  };
};

const myOrdersError = (data) => {
  return {
    type: typesOrder.MY_ORDERS_ERROR,
    payload: data,
  };
};

export const orderClearError = () => {
  return {
    type: typesOrder.ORDER_CLEAR_ERROR,
  };
};

/**
 * @desc
 * get orders from currently logged in user
 */
export const myOrdersFetch = (accessToken) => (dispatch) => {
  dispatch(myOrdersStart());
  fetch("http://localhost:5000/api/orders/me", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(myOrdersSuccess(data));
    })
    .catch((err) => {
      dispatch(myOrdersError(err));
    });
};
