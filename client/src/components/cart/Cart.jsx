import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCartAction,
  removeFromCartAction,
} from "../../redux/actions/Action.Cart";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateCart = useSelector((state) => state.reducerCart);

  const incrementStock = (item) => {
    const newItem = { ...item };
    if (newItem.quantity >= item.stock) return;
    newItem.quantity = newItem.quantity + 1;
    dispatch(addToCartAction(newItem));
  };
  const decrementStock = (item) => {
    const newItem = { ...item };
    if (newItem.quantity <= 1) return;
    newItem.quantity = newItem.quantity - 1;
    dispatch(addToCartAction(newItem));
  };

  const handleDelete = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {reduxStateCart.cart.length === 0 ? (
        <h2 className="mt-5">Your cart is Empty!</h2>
      ) : (
        <>
          <h2 class="mt-5">
            Your Cart: <b>{reduxStateCart.cart.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {reduxStateCart.cart.map((i) => (
                <>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={i.images[0].url}
                          alt={i.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${i._id}`}>{i.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{i.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decrementStock(i)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={i.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() => incrementStock(i)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleDelete(i._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {reduxStateCart.cart.reduce(
                      (acc, i) => acc + Number(i.quantity),
                      0
                    )}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {reduxStateCart.cart
                      .reduce(
                        (acc, i) => acc + Number(i.price) * Number(i.quantity),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={handleCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
