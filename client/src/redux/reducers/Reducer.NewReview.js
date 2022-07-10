import { typesNewReview } from "../types/Types.NewReview";

const INITIAL_STATE = {
  loading: false,
  review: null,
  success: false,
  error: null,
};

export const reducerNewReview = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesNewReview.NEW_REVIEW_START:
      return {
        ...state,
        loading: true,
      };

    case typesNewReview.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        review: action.payload,
      };

    case typesNewReview.NEW_REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesNewReview.NEW_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        review: null,
        success: false,
      };

    case typesNewReview.NEW_REVIEW_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
