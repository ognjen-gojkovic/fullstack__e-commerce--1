import { typesProductDetails } from "../types/Types.ProductDetails";

const INITIAL_STATE = {
  product: null,
  loading: false,
  error: null,
};

export const reducerProductDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesProductDetails.FETCH_PRODUCT_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case typesProductDetails.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case typesProductDetails.FETCH_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case typesProductDetails.PRODUCT_DETAILS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
