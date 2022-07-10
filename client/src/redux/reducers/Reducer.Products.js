import { typesProducts } from "../types/Types.Products";

const INITIAL_STATE = {
  products: [],
  productsCount: 0,
  loading: false,
  error: null,
};

export const reducerProducts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesProducts.FETCH_ALL_PRODUCTS_START:
      return {
        loading: true,
        products: [],
        productsCount: 0,
        erorr: null,
      };

    case typesProducts.FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload ? action.payload.products : [],
        productsCount: action.payload ? action.payload.productsCount : 0,
        resPerPage: action.payload ? action.payload.resPerPage : 0,
      };

    case typesProducts.FETCH_ALL_PRODUCTS_ERROR:
      return {
        loading: false,
        products: [],
        productsCount: 0,
        error: action.payload,
      };
    case typesProducts.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
