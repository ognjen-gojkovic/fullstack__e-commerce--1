import { typesAdminProducts } from "../types/Types.AdminProducts";

const INITIAL_STATE = {
  loading: false,
  products: null,
  error: null,
};

export const reducerAdminProducts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case typesAdminProducts.FETCH_ALL_PRODUCTS_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminProducts.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
