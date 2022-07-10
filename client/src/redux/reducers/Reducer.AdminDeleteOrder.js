import { typesAdminDeleteOrder } from "../types/Types.AdminDeleteOrder";

const INITIAL_STATE = {
  loading: false,
  isDeleted: false,
  error: null,
};

export const reducerAdminDeleteOrder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminDeleteOrder.DELETE_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminDeleteOrder.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case typesAdminDeleteOrder.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case typesAdminDeleteOrder.DELETE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminDeleteOrder.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
