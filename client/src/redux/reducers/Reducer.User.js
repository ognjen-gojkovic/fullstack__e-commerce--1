import { typesUser } from "../types/Types.User";

const INITIAL_STATE = {
  loading: false,
  user: null,
  isUpdated: false,
  error: null,
};

export const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesUser.UPDATE_PROFILE_START:
    case typesUser.UPDATE_PASSWORD_START:
      return {
        ...state,
        loading: true,
      };

    case typesUser.UPDATE_PROFILE_SUCCESS:
    case typesUser.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        user: action.payload.user,
      };

    case typesUser.UPDATE_PROFILE_RESET:
    case typesUser.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case typesUser.UPDATE_PROFILE_ERROR:
    case typesUser.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
