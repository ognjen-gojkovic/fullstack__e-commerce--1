import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";

import {
  myOrdersFetch,
  orderClearError,
} from "../../redux/actions/Actions.MyOrders";
import { Link } from "react-router-dom";

const ListOrders = () => {
  const dispatch = useDispatch();
  const reduxStateMyOrders = useSelector((state) => state.reducerMyOrders);
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

  React.useEffect(() => {
    dispatch(myOrdersFetch(accessToken));

    if (reduxStateMyOrders.error) alert(`${reduxStateMyOrders.error.msg}`);
    dispatch(orderClearError());
  }, [dispatch, accessToken, reduxStateMyOrders.error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "OrderID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
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
          sort: "asc",
        },
      ],
      rows: [],
    };

    reduxStateMyOrders.orders &&
      reduxStateMyOrders.orders.orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: `${order.totalPrice}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          actions: (
            <Link to={`/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <h1 className="mt-5">My Orders</h1>
      {reduxStateMyOrders.loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </>
  );
};

export default ListOrders;
