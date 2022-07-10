import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";

import {
  allAdminProductsFetch,
  allAdminProductsClearError,
} from "../../redux/actions/Actions.AdminProducts";
import {
  adminDeleteProductFetch,
  adminDeleteProductClearError,
  adminDeleteProductReset,
} from "../../redux/actions/Actions.AdminDeleteProduct";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";

const ProductsList = () => {
  const dispatch = useDispatch();
  const reduxStateProducts = useSelector((state) => state.reducerAdminProducts);
  const reduxStateProductDelete = useSelector(
    (state) => state.reducerAdminDeleteProduct
  );
  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    dispatch(allAdminProductsFetch(accessToken));

    if (reduxStateProducts.error) dispatch(allAdminProductsClearError());
    if (reduxStateProductDelete.error) dispatch(adminDeleteProductClearError());

    if (reduxStateProductDelete.isDeleted) {
      alert("Product deleted successfully.");
      dispatch(adminDeleteProductReset());
    }
  }, [
    dispatch,
    accessToken,
    reduxStateProducts.error,
    reduxStateProductDelete.isDeleted,
    reduxStateProductDelete.error,
  ]);

  const handleDelete = (id, accessToken) => {
    dispatch(adminDeleteProductFetch(id, accessToken));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reduxStateProducts.products &&
      reduxStateProducts.products.products.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.name,
          price: `${product.price}`,
          stock: product.stock,
          actions: (
            <>
              <Link
                to={`/admin/products/${product._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => handleDelete(product._id, accessToken)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
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
            <h1 className="my-5">All Products</h1>

            {reduxStateProducts.loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
