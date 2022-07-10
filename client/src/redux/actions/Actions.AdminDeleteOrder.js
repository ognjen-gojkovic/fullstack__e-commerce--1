import { typesAdminDeleteOrder } from "../types/Types.AdminDeleteOrder";

const deleteOrderStart = () => {
  return {
    type: typesAdminDeleteOrder.DELETE_ORDER_START,
  };
};

const deleteOrderSuccess = (data) => {
  return {
    type: typesAdminDeleteOrder.DELETE_ORDER_SUCCESS,
    payload: data,
  };
};

const deleteOrderError = (data) => {
  return {
    type: typesAdminDeleteOrder.DELETE_ORDER_ERROR,
    payload: data,
  };
};

export const deleteOrderClearError = () => {
  return {
    type: typesAdminDeleteOrder.CLEAR_ERROR,
  };
};

export const deleteOrderReset = () => {
  return {
    type: typesAdminDeleteOrder.DELETE_ORDER_RESET,
  };
};

export const deleteOrderAdminFetch = (id, accessToken) => (dispatch) => {
  dispatch(deleteOrderStart());
  fetch(`http://localhost:5000/api/admin/order/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(deleteOrderSuccess(data.success));
    })
    .catch((err) => dispatch(deleteOrderError(err)));
};
