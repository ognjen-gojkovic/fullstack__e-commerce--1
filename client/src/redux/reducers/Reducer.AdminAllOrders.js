import { typesAdminAllOrders } from "../types/Types.AdminAllOrders";

const INITIAL_STATE = {
  loading: false,
  orders: null,
  totalAmount: 0,
  error: null,
};

export const reducerAdminAllOrders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminAllOrders.ALL_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case typesAdminAllOrders.ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        totalAmount: action.payload.totalAmount,
      };
    case typesAdminAllOrders.ALL_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminAllOrders.ALL_ORDERS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
