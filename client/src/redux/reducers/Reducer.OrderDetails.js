import { typesOrder } from "../types/Types.Order";

const INITIAL_STATE = {
  loading: false,
  order: null,
  error: null,
};

export const reducerOrderDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesOrder.ORDER_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case typesOrder.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case typesOrder.ORDER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesOrder.ORDER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
