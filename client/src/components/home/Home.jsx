import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  clearError,
} from "../../redux/actions/Actions.Products";
import Pagination from "react-js-pagination";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Product from "../product/Product";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Home = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state.reducerProducts) || {};
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([1, 1000]);
  const [category, setCategory] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  React.useEffect(() => {
    dispatch(fetchAllProducts(keyword, currentPage, price, category, rating));
    if (reduxStore.error) {
      alert(reduxStore.error.msg);
      dispatch(clearError());
    }
  }, [
    dispatch,
    currentPage,
    reduxStore.error,
    keyword,
    price,
    category,
    rating,
  ]);

  const setCurrentPageNumber = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      {reduxStore.loading && <Loader />}
      <MetaData title={"Buy Best products online."} />

      <section id="products" className="container mt-5">
        <div className="row">
          {keyword ? (
            <>
              <div className="col-6--col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="mb-4">Categories</h4>
                    <ul className="pl-0">
                      {categories.map((cat) => {
                        return (
                          <li
                            style={{ cursor: "pointer", listStyle: "none" }}
                            key={cat}
                            onClick={() => setCategory(cat)}
                          >
                            {cat}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="mb-4">Ratings</h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => {
                        return (
                          <li
                            style={{ cursor: "pointer", listStyle: "none" }}
                            key={star}
                            onClick={() => setRating(star)}
                          >
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${star * 20}%`,
                                }}
                              ></div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-9">
                <div className="row">
                  {reduxStore.products.map((product) => {
                    return <Product key={product._id} product={product} />;
                  })}
                </div>
              </div>
            </>
          ) : (
            reduxStore.products.map((product) => {
              return <Product key={product._id} product={product} />;
            })
          )}
        </div>
      </section>

      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={reduxStore.resPerPage}
          totalItemsCount={reduxStore.productsCount}
          onChange={setCurrentPageNumber}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
};

export default Home;
