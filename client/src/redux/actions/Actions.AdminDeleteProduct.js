import { typesAdminDeleteProducts } from "../types/Types.AdminDeleteProduct";

const adminDeleteProductStart = () => {
  return {
    type: typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_START,
  };
};

const adminDeleteProductSuccess = (data) => {
  return {
    type: typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_SUCCESS,
    payload: data,
  };
};

const adminDeleteProductError = (data) => {
  return {
    type: typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_ERROR,
    payload: data,
  };
};

export const adminDeleteProductClearError = () => {
  return {
    type: typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_CLEAR_ERROR,
  };
};

export const adminDeleteProductReset = () => {
  return {
    type: typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_RESET,
  };
};

export const adminDeleteProductFetch = (id, accessToken) => (dispatch) => {
  dispatch(adminDeleteProductStart());
  fetch(`http://localhost:5000/api/admin/products/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(adminDeleteProductSuccess(data.success));
    })
    .catch((err) => dispatch(adminDeleteProductError(err)));
};
