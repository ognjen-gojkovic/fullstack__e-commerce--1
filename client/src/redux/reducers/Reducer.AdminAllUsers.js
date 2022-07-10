import { typesAdminAllUsers } from "../types/Types.AdminAllUsers";

const INITIAL_STATE = {
  loading: false,
  users: null,
  error: null,
};

export const reducerAdminAllUsers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesAdminAllUsers.ALL_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case typesAdminAllUsers.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case typesAdminAllUsers.ALL_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case typesAdminAllUsers.ALL_USERS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
