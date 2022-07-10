import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  updateProductAdminFetch,
  updateProductClearError,
  updateProductReset,
} from "../../redux/actions/Actions.AdminUpdateProduct";
import { fetchProductDetails } from "../../redux/actions/Actions.ProductDetails";
import Sidebar from "./Sidebar";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const reduxStateProductDetails = useSelector(
    (state) => state.reducerProductDetails
  );
  const reduxStateUpdateProduct = useSelector(
    (state) => state.reducerAdminUpdateProduct
  );
  const accessToken = sessionStorage.getItem("accessToken");

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [seller, setSeller] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [oldImages, setOldImages] = React.useState([]);
  const [imagesPreview, setImagesPreview] = React.useState([]);

  React.useEffect(() => {
    const id = params.id;
    if (
      !reduxStateProductDetails.product ||
      !reduxStateProductDetails.product.product ||
      (reduxStateProductDetails.product &&
        reduxStateProductDetails.product.product._id !== params.id)
    ) {
      dispatch(fetchProductDetails(id));
    } else {
      setName(reduxStateProductDetails.product.product.name);
      setPrice(reduxStateProductDetails.product.product.price);
      setDescription(reduxStateProductDetails.product.product.description);
      setCategory(reduxStateProductDetails.product.product.category);
      setSeller(reduxStateProductDetails.product.product.seller);
      setStock(reduxStateProductDetails.product.product.stock);
      setOldImages(reduxStateProductDetails.product.product.images);
    }

    if (reduxStateUpdateProduct.error) {
      alert(reduxStateUpdateProduct.error.message);
      dispatch(updateProductClearError());
    }

    if (reduxStateUpdateProduct.isUpdated) {
      alert("Product updated successfully.");
      navigate("/admin/products");
      dispatch(updateProductReset());
    }
  }, [
    dispatch,
    reduxStateUpdateProduct.error,
    reduxStateUpdateProduct.isUpdated,
    reduxStateProductDetails.product,
    params.id,
    navigate,
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });
*/
    const product = {
      name,
      price,
      description,
      category,
      stock,
      seller,
      images: images && images,
    };
    dispatch(updateProductAdminFetch(params.id, product, accessToken));

    setName("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setStock(0);
    setSeller("");
    setImages([]);
    setOldImages([]);
    setImagesPreview([]);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
              <h1 className="mb-4">Update Product</h1>

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

                {oldImages &&
                  oldImages.map((img) => (
                    <img
                      src={img.url}
                      key={img.url}
                      alt={img.url}
                      width="55"
                      height="52"
                      className="mt-3 mr-2"
                    />
                  ))}

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
                disabled={reduxStateUpdateProduct.loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
