import { typesAdminDeleteProducts } from "../types/Types.AdminDeleteProduct";

const INITIAL_STATE = {
  loading: false,
  isDeleted: false,
  error: null,
};

export const reducerAdminDeleteProduct = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case typesAdminDeleteProducts.ADMIN_DELETE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminDeleteProducts.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
