import { typesAdminDeleteReview } from "../types/Types.AdminDeleteReview";

const deleteReviewStart = () => {
  return {
    type: typesAdminDeleteReview.DELETE_REVIEW_START,
  };
};

const deleteReviewSuccess = (data) => {
  return {
    type: typesAdminDeleteReview.DELETE_REVIEW_SUCCESS,
    payload: data,
  };
};

const deleteReviewError = (data) => {
  return {
    type: typesAdminDeleteReview.DELETE_REVIEW_ERROR,
    payload: data,
  };
};

export const deleteReviewClearError = () => {
  return {
    type: typesAdminDeleteReview.DELETE_REVIEW_CLEAR_ERROR,
  };
};

export const deleteReviewReset = () => {
  return {
    type: typesAdminDeleteReview.DELETE_REVIEW_RESET,
  };
};

export const deleteReviewAdminFetch = (id, productId, accessToken) => (
  dispatch
) => {
  dispatch(deleteReviewStart());
  fetch(`http://localhost:5000/api/reviews?id=${id}&productId=${productId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);

      dispatch(deleteReviewSuccess(data.success));
    })
    .catch((err) => dispatch(deleteReviewError(err)));
};
