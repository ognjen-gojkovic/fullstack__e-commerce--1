import { typesAdminNewProduct } from "../types/Types.AdminNewProduct";

const newProductStart = () => {
  return {
    type: typesAdminNewProduct.ADMIN_NEW_PRODUCT_START,
  };
};

const newProductSuccess = (data) => {
  return {
    type: typesAdminNewProduct.ADMIN_NEW_PRODUCT_SUCCESS,
    payload: data,
  };
};

const newProductError = (data) => {
  return {
    type: typesAdminNewProduct.ADMIN_NEW_PRODUCT_ERROR,
    payload: data,
  };
};

export const newProductClearError = () => {
  return {
    type: typesAdminNewProduct.CLEAR_ERROR,
  };
};

export const newProductReset = () => {
  return {
    type: typesAdminNewProduct.ADMIN_NEW_PRODUCT_RESET,
  };
};

export const newProductAdminFetch = (product, accessToken) => (dispatch) => {
  dispatch(newProductStart());
  fetch("http://localhost:5000/api/admin/products/new", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(newProductSuccess(data));
    })
    .catch((err) => dispatch(newProductError(err)));
};
