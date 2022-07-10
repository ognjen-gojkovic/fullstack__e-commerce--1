import { typesAdminGetReviews } from "../types/Types.AdminGetReviews";

const getReviewsStart = () => {
  return {
    type: typesAdminGetReviews.GET_REVIEWS_START,
  };
};

const getReviewsSuccess = (data) => {
  return {
    type: typesAdminGetReviews.GET_REVIEWS_SUCCESS,
    payload: data,
  };
};

const getReviewsError = (data) => {
  return {
    type: typesAdminGetReviews.GET_REVIEWS_ERROR,
    payload: data,
  };
};

export const getReviewsClearError = () => {
  return {
    type: typesAdminGetReviews.GET_REVIEWS_CLEAR_ERROR,
  };
};

/**
 * @desc
 * get orders from currently logged in user
 */
export const getReviewsFetch = (id, accessToken) => (dispatch) => {
  dispatch(getReviewsStart());
  fetch(`http://localhost:5000/api/reviews?id=${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${JSON.parse(accessToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      dispatch(getReviewsSuccess(data));
    })
    .catch((err) => {
      dispatch(getReviewsError(err));
    });
};
