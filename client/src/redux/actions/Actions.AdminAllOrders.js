import { typesAdminAllOrders } from "../types/Types.AdminAllOrders";

const allOrdersStart = () => {
  return {
    type: typesAdminAllOrders.ALL_ORDERS_START,
  };
};

const allOrdersSuccess = (data) => {
  return {
    type: typesAdminAllOrders.ALL_ORDERS_SUCCESS,
    payload: data,
  };
};

const allOrdersError = (data) => {
  return {
    type: typesAdminAllOrders.ALL_ORDERS_ERROR,
    payload: data,
  };
};

export const allOrdersClearError = () => {
  return {
    type: typesAdminAllOrders.ALL_ORDERS_CLEAR_ERROR,
  };
};

/**
 * @desc
 * get orders from currently logged in user
 */
export const allOrdersFetch = (accessToken) => (dispatch) => {
  dispatch(allOrdersStart());
  fetch("http://localhost:5000/api/admin/orders", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(allOrdersSuccess(data));
    })
    .catch((err) => {
      dispatch(allOrdersError(err));
    });
};
