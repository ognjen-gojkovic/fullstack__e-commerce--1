import { typesAdminDeleteUser } from "../types/Types.AdminDeleteUser";

const INITIAL_STATE = {
  loading: false,
  isDeleted: false,
  error: null,
};

export const reducerAdminDeleteUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminDeleteUser.DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case typesAdminDeleteUser.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case typesAdminDeleteUser.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case typesAdminDeleteUser.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminDeleteUser.ADMIN_DELETE_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
