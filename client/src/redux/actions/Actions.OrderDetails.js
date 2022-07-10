import { typesOrder } from "../types/Types.Order";

const orderDetailsStart = () => {
  return {
    type: typesOrder.ORDER_DETAILS_START,
  };
};

const orderDetailsSuccess = (data) => {
  return {
    type: typesOrder.ORDER_DETAILS_SUCCESS,
    payload: data,
  };
};

const orderDetailsError = (data) => {
  return {
    type: typesOrder.ORDER_DETAILS_ERROR,
    payload: data,
  };
};

export const orderClearError = () => {
  return {
    type: typesOrder.ORDER_CLEAR_ERROR,
  };
};

export const orderDetailsFetch = (id, accessToken) => (dispatch) => {
  dispatch(orderDetailsStart());
  fetch(`http://localhost:5000/api/order/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(orderDetailsSuccess(data));
    })
    .catch((err) => {
      dispatch(orderDetailsError(err));
    });
};
