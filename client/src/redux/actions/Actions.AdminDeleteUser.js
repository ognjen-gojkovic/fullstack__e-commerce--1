import { typesAdminDeleteUser } from "../types/Types.AdminDeleteUser";

const deleteUserStart = () => {
  return {
    type: typesAdminDeleteUser.DELETE_USER_START,
  };
};

const deleteUserSuccess = (data) => {
  return {
    type: typesAdminDeleteUser.DELETE_USER_SUCCESS,
    payload: data,
  };
};

const deleteUserError = (data) => {
  return {
    type: typesAdminDeleteUser.DELETE_USER_ERROR,
    payload: data,
  };
};

export const deleteUserClearError = () => {
  return {
    type: typesAdminDeleteUser.ADMIN_DELETE_USER_CLEAR_ERROR,
  };
};

export const deleteUserReset = () => {
  return {
    type: typesAdminDeleteUser.DELETE_USER_RESET,
  };
};

export const deleteUserAdminFetch = (id, accessToken) => (dispatch) => {
  dispatch(deleteUserStart());
  fetch(`http://localhost:5000/api/admin/user/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(deleteUserSuccess(data.success));
    })
    .catch((err) => dispatch(deleteUserError(err)));
};
