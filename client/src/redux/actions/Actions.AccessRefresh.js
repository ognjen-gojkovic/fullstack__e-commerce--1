import { typesAuth } from "../types/Types.Auth";

const accessRefreshStart = () => {
  return {
    type: typesAuth.ACCESS_REFRESH_START,
  };
};

const accessRefreshSuccess = (data) => {
  return {
    type: typesAuth.ACCESS_REFRESH_SUCCESS,
    payload: data,
  };
};

const accessRefreshError = (data) => {
  return {
    type: typesAuth.ACCESS_REFRESH_ERROR,
    payload: data,
  };
};

export const clearErrorLogin = () => {
  return {
    type: typesAuth.CLEAR_ERROR,
  };
};

export const accessRefreshAction = (token) => (dispatch) => {
  dispatch(accessRefreshStart());
  fetch("http://localhost:5000/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (token && data.accessToken) {
        sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        dispatch(accessRefreshSuccess(data.accessToken));
      }
    })
    .catch((err) => dispatch(accessRefreshError(err)));
};
