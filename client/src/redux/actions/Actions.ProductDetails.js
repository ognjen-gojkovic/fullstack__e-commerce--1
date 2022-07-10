import { typesProductDetails } from "../types/Types.ProductDetails";

const fetchProductDetailsStart = () => {
  return {
    type: typesProductDetails.FETCH_PRODUCT_DETAILS_START,
  };
};

const fetchProductDetailsSuccess = (data) => {
  return {
    type: typesProductDetails.FETCH_PRODUCT_DETAILS_SUCCESS,
    payload: data,
  };
};

const fetchProductDetailsError = (data) => {
  return {
    type: typesProductDetails.FETCH_PRODUCT_DETAILS_ERROR,
    payload: data,
  };
};

export const fetchProductDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchProductDetailsStart());
    fetch(`http://localhost:5000/api/products/${id}`, {
      credentials: "include",
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        dispatch(fetchProductDetailsSuccess(data));
      })
      .catch((err) => {
        try {
          err.json().then((body) => {
            dispatch(fetchProductDetailsError(body));
          });
        } catch (error) {
          dispatch(fetchProductDetailsError(error));
        }
      });
  };
};

export const productDetailsClearError = () => {
  return {
    type: typesProductDetails.PRODUCT_DETAILS_CLEAR_ERROR,
  };
};
