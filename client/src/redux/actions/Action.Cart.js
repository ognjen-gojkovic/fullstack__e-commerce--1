import { typesCart } from "../types/Types.Cart";

const addToCart = (data) => {
  return {
    type: typesCart.ADD_TO_CART,
    payload: data,
  };
};

const removeFromCart = (data) => {
  return {
    type: typesCart.REMOVE_ITEM_FROM_CART,
    payload: data,
  };
};
const saveShippingInfo = (data) => {
  return {
    type: typesCart.SAVE_SHIPPING_INFO,
    payload: data,
  };
};

const clearCart = () => {
  return {
    type: typesCart.CLEAR_CART,
  };
};

export const clearCartAction = () => {
  localStorage.removeItem("cart");
  return {
    type: typesCart.CLEAR_CART,
  };
};

export const addToCartAction = (data) => (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cart", JSON.stringify(getState().reducerCart.cart));
};

export const removeFromCartAction = (data) => (dispatch, getState) => {
  dispatch(removeFromCart(data));
  localStorage.setItem("cart", JSON.stringify(getState().reducerCart.cart));
};

export const saveShippingInfoAction = (data) => (dispatch) => {
  dispatch(saveShippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
