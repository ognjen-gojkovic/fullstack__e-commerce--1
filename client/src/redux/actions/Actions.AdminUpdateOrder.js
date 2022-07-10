import { typesAdminUpdateOrder } from "../types/Types.AdminUpdateOrder";

const updateOrderStart = () => {
  return {
    type: typesAdminUpdateOrder.UPDATE_ORDER_START,
  };
};

const updateOrderSuccess = (data) => {
  return {
    type: typesAdminUpdateOrder.UPDATE_ORDER_SUCCESS,
    payload: data,
  };
};

const updateOrderError = (data) => {
  return {
    type: typesAdminUpdateOrder.UPDATE_ORDER_ERROR,
    payload: data,
  };
};

export const updateOrderClearError = () => {
  return {
    type: typesAdminUpdateOrder.CLEAR_ERROR,
  };
};

export const updateOrderReset = () => {
  return {
    type: typesAdminUpdateOrder.UPDATE_ORDER_RESET,
  };
};

export const updateOrderAdminFetch = (id, status, accessToken) => (
  dispatch
) => {
  console.log("accessToken update status:", status);
  dispatch(updateOrderStart());
  fetch(`http://localhost:5000/api/admin/order/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    body: JSON.stringify({ status }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(updateOrderSuccess(data.success));
    })
    .catch((err) => dispatch(updateOrderError(err)));
};
