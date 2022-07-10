import { typesAdminProducts } from "../types/Types.AdminProducts";

const allAdminProductsStart = () => {
  return {
    type: typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_START,
  };
};

const allAdminProductsSuccess = (data) => {
  return {
    type: typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_SUCCESS,
    payload: data,
  };
};

const allAdminProductsError = (data) => {
  return {
    type: typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_ERROR,
    payload: data,
  };
};

export const allAdminProductsClearError = () => {
  return {
    type: typesAdminProducts.CLEAR_ERROR,
  };
};

export const allAdminProductsFetch = (accessToken) => (dispatch) => {
  dispatch(allAdminProductsStart());
  fetch("http://localhost:5000/api/admin/products", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(allAdminProductsSuccess(data));
    })
    .catch((err) => dispatch(allAdminProductsError(err)));
};
