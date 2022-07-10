import { typesAdminUpdateOrder } from "../types/Types.AdminUpdateOrder";

const INITIAL_STATE = {
  loading: false,
  isUpdated: false,
  error: null,
};

export const reducerAdminUpdateOrder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminUpdateOrder.UPDATE_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminUpdateOrder.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case typesAdminUpdateOrder.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case typesAdminUpdateOrder.UPDATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminUpdateOrder.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
