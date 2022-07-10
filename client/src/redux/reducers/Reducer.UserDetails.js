import { typesUser } from "../types/Types.User";

const INITIAL_STATE = {
  loading: false,
  user: null,
  error: null,
};

export const reducerUserDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesUser.GET_USER_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case typesUser.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case typesUser.GET_USER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesUser.GET_USER_DETAILS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
