import { typesOrder } from "../types/Types.Order";

const INITIAL_STATE = {
  loading: false,
  order: null,
  error: null,
};

export const reducerOrder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesOrder.CREATE_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    case typesOrder.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case typesOrder.CREATE_ORDER_ERROR:
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
