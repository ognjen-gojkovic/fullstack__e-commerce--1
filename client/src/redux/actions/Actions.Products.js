import { typesProducts } from "../types/Types.Products";

const fetchAllProductsStart = () => {
  return {
    type: typesProducts.FETCH_ALL_PRODUCTS_START,
  };
};

const fetchAllProductsSuccess = (data) => {
  return {
    type: typesProducts.FETCH_ALL_PRODUCTS_SUCCESS,
    payload: data,
  };
};

const fetchAllProductsError = (data) => {
  return {
    type: typesProducts.FETCH_ALL_PRODUCTS_ERROR,
    payload: data,
  };
};

export const fetchAllProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => {
  let url = `http://localhost:5000/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
  if (category !== "" && category.length > 1)
    url = url + `&category=${category}`;
  return (dispatch) => {
    dispatch(fetchAllProductsStart());
    fetch(url, {
      credentials: "include",
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        dispatch(fetchAllProductsSuccess(data));
      })
      .catch((err) => {
        try {
          err.json().then((body) => {
            dispatch(fetchAllProductsError(body));
          });
        } catch (error) {
          dispatch(fetchAllProductsError(error));
        }
      });
  };
};

export const clearError = () => {
  return {
    type: typesProducts.CLEAR_ERROR,
  };
};
