import { typesAdminUpdateProduct } from "../types/Types.AdminUpdateProduct";

const updateProductStart = () => {
  return {
    type: typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_START,
  };
};

const updateProductSuccess = (data) => {
  return {
    type: typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_SUCCESS,
    payload: data,
  };
};

const updateProductError = (data) => {
  return {
    type: typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_ERROR,
    payload: data,
  };
};

export const updateProductClearError = () => {
  return {
    type: typesAdminUpdateProduct.CLEAR_ERROR,
  };
};

export const updateProductReset = () => {
  return {
    type: typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_RESET,
  };
};

export const updateProductAdminFetch = (id, product, accessToken) => (
  dispatch
) => {
  console.log("accessToken update product:", id);
  dispatch(updateProductStart());
  fetch(`http://localhost:5000/api/admin/products/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(updateProductSuccess(data.success));
    })
    .catch((err) => dispatch(updateProductError(err)));
};
