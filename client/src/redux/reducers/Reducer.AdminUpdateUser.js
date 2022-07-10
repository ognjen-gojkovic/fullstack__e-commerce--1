import { typesAdminUpdateUser } from "../types/Types.AdminUpdateUser";

const INITIAL_STATE = {
  loading: false,
  isUpdated: false,
  error: null,
};

export const reducerAdminUpdateUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminUpdateUser.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminUpdateUser.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case typesAdminUpdateUser.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case typesAdminUpdateUser.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminUpdateUser.UPDATE_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
