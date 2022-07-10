import { typesAuth } from "../types/Types.Auth";

const loginActionStart = () => {
  return {
    type: typesAuth.LOGIN_START,
  };
};

const loginActionSuccess = (data) => {
  return {
    type: typesAuth.LOGIN_SUCCESS,
    payload: data,
  };
};

const loginActionError = (data) => {
  return {
    type: typesAuth.LOGIN_ERROR,
    payload: data,
  };
};

export const clearErrorLogin = () => {
  return {
    type: typesAuth.AUTH_CLEAR_ERROR,
  };
};

export const loginAction = (email, password) => (dispatch) => {
  dispatch(loginActionStart());
  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) {
        return Promise.reject(data);
      }
      sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(loginActionSuccess(data));
    })
    .catch((err) => {
      dispatch(loginActionError(err));
    });
};

export const logoutAction = (token) => (dispatch) => {
  fetch("http://localhost:5000/api/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: typesAuth.LOGOUT });
    })
    .catch((err) => console.log(err));
};

export const LSAndSSCredentials = (data) => {
  return {
    type: typesAuth.LS_AND_SS_CREDENTIALS,
    payload: data,
  };
};
