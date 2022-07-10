import { typesNewReview } from "../types/Types.NewReview";

const newReviewStart = () => {
  return {
    type: typesNewReview.NEW_REVIEW_START,
  };
};

const newReviewSuccess = (data) => {
  return {
    type: typesNewReview.NEW_REVIEW_SUCCESS,
    payload: data,
  };
};

const newReviewError = (data) => {
  return {
    type: typesNewReview.NEW_REVIEW_ERROR,
    payload: data,
  };
};

export const newReviewClearError = () => {
  return {
    type: typesNewReview.NEW_REVIEW_CLEAR_ERROR,
  };
};

export const newReviewReset = () => {
  return {
    type: typesNewReview.NEW_REVIEW_RESET,
  };
};

export const newReviewFetch = (data, accessToken) => (dispatch) => {
  console.log("accessToken:", accessToken);
  dispatch(newReviewStart());
  fetch("http://localhost:5000/api/reviews", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(newReviewSuccess(data));
    })
    .catch((err) => {
      dispatch(newReviewError(err));
    });
};
