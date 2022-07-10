import { typesAdminUpdateUser } from "../types/Types.AdminUpdateUser";

const updateUserStart = () => {
  return {
    type: typesAdminUpdateUser.UPDATE_USER_START,
  };
};

const updateUserSuccess = (data) => {
  return {
    type: typesAdminUpdateUser.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const updateUserError = (data) => {
  return {
    type: typesAdminUpdateUser.UPDATE_USER_ERROR,
    payload: data,
  };
};

export const updateUserClearError = () => {
  return {
    type: typesAdminUpdateUser.UPDATE_USER_CLEAR_ERROR,
  };
};

export const updateUserReset = () => {
  return {
    type: typesAdminUpdateUser.UPDATE_USER_RESET,
  };
};

export const updateUserAdminFetch = (id, user, accessToken) => (dispatch) => {
  console.log("accessToken update user:", accessToken);
  dispatch(updateUserStart());
  fetch(`http://localhost:5000/api/admin/user/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(updateUserSuccess(data.success));
    })
    .catch((err) => dispatch(updateUserError(err)));
};
