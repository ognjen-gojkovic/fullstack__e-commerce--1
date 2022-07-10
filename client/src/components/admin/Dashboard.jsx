import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
  allAdminProductsFetch,
  allAdminProductsClearError,
} from "../../redux/actions/Actions.AdminProducts";

import {
  allOrdersFetch,
  allOrdersClearError,
} from "../../redux/actions/Actions.AdminAllOrders";

import {
  allUsersFetch,
  adminAllUsersClearError,
} from "../../redux/actions/Actions.AdminAllUsers";

/**
 * @desc
 * i should fetch everthing here and then distribute it to each component
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const reduxStateAllProducts = useSelector(
    (state) => state.reducerAdminProducts
  );
  const reduxStateAllOrders = useSelector(
    (state) => state.reducerAdminAllOrders
  );
  const reduxStateAllUsers = useSelector((state) => state.reducerAdminAllUsers);
  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    dispatch(allAdminProductsFetch(accessToken));
    dispatch(allOrdersFetch(accessToken));
    dispatch(allUsersFetch(accessToken));

    if (reduxStateAllProducts.error) dispatch(allAdminProductsClearError());
    if (reduxStateAllOrders.error) dispatch(allOrdersClearError());
    if (reduxStateAllUsers.error) dispatch(adminAllUsersClearError());
  }, [
    dispatch,
    reduxStateAllProducts.error,
    reduxStateAllOrders.error,
    reduxStateAllUsers.error,
    accessToken,
  ]);

  const checkStock = () => {
    let outOfStock = 0;
    reduxStateAllProducts.products &&
      reduxStateAllProducts.products.products.forEach((product) => {
        if (product.stock === 0) {
          outOfStock += 1;
        }
      });
    return outOfStock;
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br /> <b>${reduxStateAllOrders.totalAmount.toFixed(2)}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products
                    <br />{" "}
                    <b>
                      {reduxStateAllProducts.products &&
                        reduxStateAllProducts.products.products.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br />{" "}
                    <b>
                      {reduxStateAllOrders.orders &&
                        reduxStateAllOrders.orders.orders.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                    <br />{" "}
                    <b>
                      {reduxStateAllUsers.users &&
                        reduxStateAllUsers.users.users.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock
                    <br /> <b>{checkStock()}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
