import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";

import {
  allOrdersFetch,
  allOrdersClearError,
} from "../../redux/actions/Actions.AdminAllOrders";

import {
  deleteOrderReset,
  deleteOrderAdminFetch,
  deleteOrderClearError,
} from "../../redux/actions/Actions.AdminDeleteOrder";

import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateOrders = useSelector((state) => state.reducerAdminAllOrders);
  const reduxStateDeleteOrder = useSelector(
    (state) => state.reducerAdminDeleteOrder
  );
  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    dispatch(allOrdersFetch(accessToken));

    if (reduxStateOrders.error) {
      alert(reduxStateOrders.error.message);
      dispatch(allOrdersClearError());
    }

    if (reduxStateDeleteOrder.error) {
      alert(reduxStateDeleteOrder.error.message);
      dispatch(deleteOrderClearError());
    }

    if (reduxStateDeleteOrder.isDeleted) {
      alert("Order deleted Successfully.");
      navigate("/admin/orders");
      dispatch(deleteOrderReset());
    }
  }, [
    dispatch,
    reduxStateOrders.error,
    accessToken,
    reduxStateDeleteOrder.isDeleted,
    navigate,
    reduxStateDeleteOrder.error,
  ]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAdminFetch(id, accessToken));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Itmes",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reduxStateOrders.orders &&
      reduxStateOrders.orders.orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: `${order.totalPrice}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <b>
                <p style={{ color: "green" }}>{order.orderStatus}</p>
              </b>
            ) : (
              <b>
                <p style={{ color: "red" }}>{order.orderStatus}</p>
              </b>
            ),
          actions: (
            <>
              <Link
                to={`/admin/order/${order._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteOrderHandler(order._id)}
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
            <h1 className="my-5">All Orders</h1>

            {reduxStateOrders.loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setOrders()}
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

export default OrdersList;
