import { typesCart } from "../types/Types.Cart";

const INITIAL_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
};

export const reducerCart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesCart.ADD_TO_CART:
      const item = action.payload;

      const itemExists = state.cart.find((i) => i._id === item._id);

      if (itemExists) {
        return {
          ...state,
          cart: state.cart.map((i) => (i._id === item._id ? item : i)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }

    case typesCart.REMOVE_ITEM_FROM_CART:
      const newCart = state.cart.filter((i) => i._id !== action.payload);

      return {
        ...state,
        cart: newCart,
      };

    case typesCart.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case typesCart.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
