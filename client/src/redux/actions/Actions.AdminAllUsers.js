import { typesAdminAllUsers } from "../types/Types.AdminAllUsers";

const allUsersStart = () => {
  return {
    type: typesAdminAllUsers.ALL_USERS_START,
  };
};

const allUsersSuccess = (data) => {
  return {
    type: typesAdminAllUsers.ALL_USERS_SUCCESS,
    payload: data,
  };
};

const allUsersError = (data) => {
  return {
    type: typesAdminAllUsers.ALL_USERS_ERROR,
    payload: data,
  };
};

/**
 * @desc
 * get orders from currently logged in user
 */
export const allUsersFetch = (accessToken) => (dispatch) => {
  dispatch(allUsersStart());
  fetch("http://localhost:5000/api/admin/users", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(allUsersSuccess(data));
    })
    .catch((err) => {
      dispatch(allUsersError(err));
    });
};

export const adminAllUsersClearError = () => {
  return {
    type: typesAdminAllUsers.ALL_USERS_CLEAR_ERROR,
  };
};
