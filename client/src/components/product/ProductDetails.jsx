import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  productDetailsClearError,
} from "../../redux/actions/Actions.ProductDetails";
import {
  newReviewReset,
  newReviewFetch,
  newReviewClearError,
} from "../../redux/actions/Actions.NewReview";
import { addToCartAction } from "../../redux/actions/Action.Cart";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const reduxStateProductDetails = useSelector(
    (state) => state.reducerProductDetails
  );
  const reduxStateAuth = useSelector((state) => state.reducerAuth);
  const reduxStateNewReview = useSelector((state) => state.reducerNewReview);
  const [stockCount, setStockCount] = React.useState(1);
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

  // rating system
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    dispatch(fetchProductDetails(params.id));

    if (reduxStateProductDetails.error) {
      alert(reduxStateProductDetails.error.msg);
      dispatch(productDetailsClearError());
    }

    if (reduxStateNewReview.error) {
      alert(reduxStateNewReview.error.msg);
      dispatch(newReviewClearError());
    }

    if (reduxStateNewReview.success) {
      alert("Review posted successfully.");
      dispatch(newReviewReset());
    }
  }, [
    dispatch,
    params.id,
    reduxStateProductDetails.error,
    reduxStateNewReview.review,
    reduxStateNewReview.error,
    reduxStateNewReview.success,
  ]);

  const incrementStock = () => {
    if (stockCount >= reduxStateProductDetails.product.product.stock) return;

    setStockCount(stockCount + 1);
  };
  const decrementStock = () => {
    if (stockCount <= 0) return;

    setStockCount(stockCount - 1);
  };

  const handleCart = () => {
    const product = {
      ...reduxStateProductDetails.product.product,
      quantity: stockCount,
    };

    dispatch(addToCartAction(product));
  };

  const handleStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      let index = i + 1;
      stars.push(
        <li
          key={i}
          className="star"
          id={index}
          onClick={() => setRating(index)}
          onMouseOver={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <i
            style={{ color: `${index <= (hover || rating) ? "orange" : ""}` }}
            className={`fa-solid fa-star`}
          ></i>
        </li>
      );
    }
    return stars;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", params.id);

    dispatch(newReviewFetch(formData, accessToken));

    setComment("");
    setHover(0);
    setRating(0);
  };

  return (
    <>
      <MetaData
        title={
          reduxStateProductDetails.product &&
          reduxStateProductDetails.product.product.name
        }
      />
      {reduxStateProductDetails.loading && <Loader />}
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <Carousel pause="hover" nextLabel="" prevLabel="">
            {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.images.map((image) => {
                return (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={
                        reduxStateProductDetails.product &&
                        reduxStateProductDetails.product.product.title
                      }
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>
            {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.name}
          </h3>
          <p id="product_id"></p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${
                  (reduxStateProductDetails.product &&
                    reduxStateProductDetails.product.product.ratings / 5) * 100
                }%`,
              }}
            ></div>
          </div>
          <span id="no_of_reviews">
            (
            {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.numOfReviews}
            Reviews)
          </span>

          <hr />

          <p id="product_price">
            $
            {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.price}
          </p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decrementStock}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={stockCount}
              readOnly
            />

            <span className="btn btn-primary plus" onClick={incrementStock}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
            onClick={handleCart}
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status:{" "}
            <span id="stock_status">
              {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.stock > 0
                ? "In Stock"
                : "Out Of Stock"}
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>
            {reduxStateProductDetails.product &&
              reduxStateProductDetails.product.product.description}
          </p>
          <hr />
          <p id="product_seller mb-3">
            Sold by:{" "}
            <strong>
              {reduxStateProductDetails.product &&
                reduxStateProductDetails.product.product.seller}
            </strong>
          </p>

          {reduxStateAuth.user ? (
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              Submit Your Review
            </button>
          ) : (
            <div>
              {" "}
              <b>Login to post your review.</b>
            </div>
          )}

          <div className="row mt-2 mb-5">
            <div className="rating w-50">
              <div
                className="modal fade"
                id="ratingModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="ratingModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ratingModalLabel">
                        Submit Review
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ul className="stars">{handleStars()}</ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>

                      <button
                        className="btn my-3 float-right review-btn px-4 text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reduxStateProductDetails.product &&
        reduxStateProductDetails.product.product.reviews &&
        reduxStateProductDetails.product.product.reviews.length > 0 && (
          <ListReviews
            reviews={reduxStateProductDetails.product.product.reviews}
          />
        )}
    </>
  );
};

export default ProductDetails;
