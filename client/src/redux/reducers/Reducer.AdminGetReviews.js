import { typesAdminGetReviews } from "../types/Types.AdminGetReviews";

const INITIAL_STATE = {
  loading: false,
  reviews: null,
  error: null,
};

export const reducerAdminAGetReviews = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminGetReviews.GET_REVIEWS_START:
      return {
        ...state,
        loading: true,
      };
    case typesAdminGetReviews.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case typesAdminGetReviews.GET_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminGetReviews.GET_REVIEWS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
