import { typesAuth } from "../types/Types.Auth";

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  accessToken: "",
  loading: false,
  error: null,
};

export const reducerAuth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAuth.LS_AND_SS_CREDENTIALS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        accessToken: action.payload.accessToken && action.payload.accessToken,
      };

    case typesAuth.LOGIN_START:
    case typesAuth.REGISTER_START:
    case typesAuth.ACCESS_REFRESH_START:
      return {
        ...state,
        loading: true,
      };

    case typesAuth.LOGIN_SUCCESS:
    case typesAuth.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case typesAuth.ACCESS_REFRESH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        accessToken: action.payload,
      };

    case typesAuth.LOGIN_ERROR:
    case typesAuth.REGISTER_ERROR:
    case typesAuth.ACCESS_REFRESH_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        accessToken: "",
        error: action.payload,
      };

    case typesAuth.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        accessToken: "",
        error: null,
      };

    case typesAuth.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
