import { typesAdminDeleteReview } from "../types/Types.AdminDeleteReview";

const INITIAL_STATE = {
  loading: false,
  isDeleted: false,
  error: null,
};

export const reducerAdminDeleteReview = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminDeleteReview.DELETE_REVIEW_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminDeleteReview.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case typesAdminDeleteReview.DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case typesAdminDeleteReview.DELETE_REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminDeleteReview.DELETE_REVIEW_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
