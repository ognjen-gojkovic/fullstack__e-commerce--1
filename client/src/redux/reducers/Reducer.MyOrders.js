import { typesOrder } from "../types/Types.Order";

const INITIAL_STATE = {
  loading: false,
  orders: null,
  error: null,
};

export const reducerMyOrders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesOrder.MY_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case typesOrder.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case typesOrder.MY_ORDERS_ERROR:
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
