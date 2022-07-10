import { typesAuth } from "../types/Types.Auth";

const registerActionStart = () => {
  return {
    type: typesAuth.REGISTER_START,
  };
};

const registerActionSuccess = (data) => {
  return {
    type: typesAuth.REGISTER_SUCCESS,
    payload: data,
  };
};

const registerActionError = (data) => {
  return {
    type: typesAuth.REGISTER_ERROR,
    payload: data,
  };
};

export const clearErrorRegister = () => {
  return {
    type: typesAuth.AUTH_CLEAR_ERROR,
  };
};

export const registerAction = (formData) => (dispatch) => {
  dispatch(registerActionStart());
  fetch("http://localhost:5000/api/register", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(registerActionSuccess(data));
    })
    .catch((err) => dispatch(registerActionError(err)));
};
