import { typesUser } from "../types/Types.User";
import { typesAuth } from "../types/Types.Auth";

/**
 * @desc
 * clear error action
 */
export const userClearError = () => {
  return {
    type: typesUser.USER_CLEAR_ERROR,
  };
};

/**
 * @desc
 * update profile actions
 */
const updateActionStart = () => {
  return {
    type: typesUser.UPDATE_PROFILE_START,
  };
};

const updateActionSuccess = (data) => {
  return {
    type: typesUser.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

const updateActionError = (data) => {
  return {
    type: typesUser.UPDATE_PROFILE_ERROR,
    payload: data,
  };
};

export const clearErrorRegister = () => {
  return {
    type: typesAuth.CLEAR_ERROR,
  };
};

export const updateProfileReset = () => {
  return {
    type: typesUser.UPDATE_PROFILE_RESET,
  };
};

export const updateProfileAction = (formData, accessToken) => (dispatch) => {
  dispatch(updateActionStart());
  fetch("http://localhost:5000/api/me/update", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(updateActionSuccess(data));
    })
    .catch((err) => dispatch(updateActionError(err)));
};

/**
 * @desc
 * get user details
 */
const getUserDetailsStart = () => {
  return {
    type: typesUser.GET_USER_DETAILS_START,
  };
};

const getUserDetailsSuccess = (data) => {
  return {
    type: typesUser.GET_USER_DETAILS_SUCCESS,
    payload: data,
  };
};

const getUserDetailsError = (data) => {
  return {
    type: typesUser.GET_USER_DETAILS_ERROR,
    payload: data,
  };
};

export const getUserDetailsClearError = () => {
  return {
    type: typesUser.GET_USER_DETAILS_CLEAR_ERROR,
  };
};

export const getUserDetailsFetch = (id, accessToken) => (dispatch) => {
  dispatch(getUserDetailsStart());
  fetch(`http://localhost:5000/api/admin/user/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(getUserDetailsSuccess(data.user));
    })
    .catch((err) => dispatch(getUserDetailsError(err)));
};

/**
 * @desc
 * update password actions
 */
const updatePasswordActionStart = () => {
  return {
    type: typesUser.UPDATE_PASSWORD_START,
  };
};

const updatePasswordActionSuccess = (data) => {
  return {
    type: typesUser.UPDATE_PASSWORD_SUCCESS,
    payload: data,
  };
};

const updatePasswordActionError = (data) => {
  return {
    type: typesUser.UPDATE_PASSWORD_ERROR,
    payload: data,
  };
};

export const updatePasswordReset = () => {
  return {
    type: typesUser.UPDATE_PASSWORD_RESET,
  };
};

export const updatePasswordAction = (credentials, accessToken) => (
  dispatch
) => {
  dispatch(updatePasswordActionStart());
  fetch("http://localhost:5000/api/password/update", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(updatePasswordActionSuccess(data));
    })
    .catch((err) => dispatch(updatePasswordActionError(err)));
};

/**
 * @desc
 * forgot password actions
 */
const forgotPasswordActionStart = () => {
  return {
    type: typesUser.FORGOT_PASSWORD_START,
  };
};

const forgotPasswordActionSuccess = (data) => {
  return {
    type: typesUser.FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

const forgotPasswordActionError = (data) => {
  return {
    type: typesUser.FORGOT_PASSWORD_ERROR,
    payload: data,
  };
};

export const forgotPasswordAction = (email) => (dispatch) => {
  dispatch(forgotPasswordActionStart());
  fetch("http://localhost:5000/api/password/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(forgotPasswordActionSuccess(data));
    })
    .catch((err) => dispatch(forgotPasswordActionError(err)));
};

/**
 * @desc
 * new password actions
 */
const newPasswordActionStart = () => {
  return {
    type: typesUser.NEW_PASSWORD_START,
  };
};

const newPasswordActionSuccess = (data) => {
  return {
    type: typesUser.NEW_PASSWORD_SUCCESS,
    payload: data,
  };
};

const newPasswordActionError = (data) => {
  return {
    type: typesUser.NEW_PASSWORD_ERROR,
    payload: data,
  };
};

export const newPasswordAction = (password, token) => (dispatch) => {
  dispatch(newPasswordActionStart());
  fetch(`http://localhost:5000/api/password/reset/${token}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(newPasswordActionSuccess(data));
    })
    .catch((err) => dispatch(newPasswordActionError(err)));
};
