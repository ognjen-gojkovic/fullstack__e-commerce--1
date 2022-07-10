import { typesUser } from "../types/Types.User";

const INITIAL_STATE = {
  msg: "",
  loading: false,
  error: null,
};

export const reducerForgotPassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesUser.FORGOT_PASSWORD_START:
    case typesUser.NEW_PASSWORD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case typesUser.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };

    case typesUser.NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case typesUser.FORGOT_PASSWORD_ERROR:
    case typesUser.NEW_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesUser.USER_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
