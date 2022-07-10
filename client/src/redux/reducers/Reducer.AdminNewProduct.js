import { typesAdminNewProduct } from "../types/Types.AdminNewProduct";

const INITIAL_STATE = {
  loading: false,
  product: null,
  success: false,
  error: null,
};

export const reducerAdminNewProduct = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminNewProduct.ADMIN_NEW_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminNewProduct.ADMIN_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };

    case typesAdminNewProduct.ADMIN_NEW_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminNewProduct.ADMIN_NEW_PRODUCT_RESET:
      return {
        ...state,
        product: null,
        success: false,
      };

    case typesAdminNewProduct.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
