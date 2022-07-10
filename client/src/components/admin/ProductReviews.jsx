import React from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";

import {
  getReviewsFetch,
  getReviewsClearError,
} from "../../redux/actions/Actions.AdminGetReviews";

import {
  deleteReviewAdminFetch,
  deleteReviewClearError,
  deleteReviewReset,
} from "../../redux/actions/Actions.AdminDeleteReview";

import Sidebar from "./Sidebar";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = React.useState("");
  const reduxStateGetReviews = useSelector(
    (state) => state.reducerAdminAGetReviews
  );
  const reduxStateDeleteReview = useSelector(
    (state) => state.reducerAdminDeleteReview
  );

  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    if (productId !== "") dispatch(getReviewsFetch(productId, accessToken));

    if (reduxStateGetReviews.error) {
      alert(reduxStateGetReviews.error.message);
      dispatch(getReviewsClearError());
    }

    if (reduxStateDeleteReview.isDeleted) {
      alert("Review Deleted Successfully.");
      dispatch(deleteReviewReset());
    }

    if (reduxStateDeleteReview.error) {
      alert(reduxStateDeleteReview.error.message);
      dispatch(deleteReviewClearError());
    }
  }, [
    dispatch,
    productId,
    accessToken,
    reduxStateDeleteReview.error,
    reduxStateDeleteReview.isDeleted,
    reduxStateGetReviews.error,
  ]);

  const deleteReviewHandler = (id, productId, accessToken) => {
    dispatch(deleteReviewAdminFetch(id, productId, accessToken));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviewsFetch(productId, accessToken));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reduxStateGetReviews.reviews &&
      reduxStateGetReviews.reviews.reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,

          actions: (
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() =>
                deleteReviewHandler(review._id, productId, accessToken)
              }
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {reduxStateGetReviews.reviews &&
            reduxStateGetReviews.reviews.reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <>
                <p className="mt-5 text-center">No Reviews.</p>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
