import { typesAdminUpdateProduct } from "../types/Types.AdminUpdateProduct";

const INITIAL_STATE = {
  loading: false,
  isUpdated: false,
  error: null,
};

export const reducerAdminUpdateProduct = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case typesAdminUpdateProduct.ADMIN_UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminUpdateProduct.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
