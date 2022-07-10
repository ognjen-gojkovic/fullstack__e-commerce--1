import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  newProductAdminFetch,
  newProductClearError,
  newProductReset,
} from "../../redux/actions/Actions.AdminNewProduct";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxStateNewProduct = useSelector(
    (state) => state.reducerAdminNewProduct
  );
  const accessToken = sessionStorage.getItem("accessToken");

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [seller, setSeller] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [imagesPreview, setImagesPreview] = React.useState([]);

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
    if (reduxStateNewProduct.error) {
      alert(reduxStateNewProduct.error.message);
      dispatch(newProductClearError());
    }

    if (reduxStateNewProduct.success) {
      navigate("/admin/products");
      alert("New Product created successfully.");
      dispatch(newProductReset());
    }
  }, [
    dispatch,
    reduxStateNewProduct.error,
    reduxStateNewProduct.success,
    navigate,
    category,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      description,
      category,
      stock,
      seller,
      images,
    };
    dispatch(newProductAdminFetch(product, accessToken));
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // 1 means - proccessing
        // 2 means - is finished proccessing
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  onChange={(e) => {
                    console.log("cat:", e.target.value);
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt={img}
                    width="55"
                    height="52"
                    className="mt-3 mr-2"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={reduxStateNewProduct.loading ? true : false}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
