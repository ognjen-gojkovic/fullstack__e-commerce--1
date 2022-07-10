import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/Actions.Login";
import Search from "./Search";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxAuthState = useSelector((state) => state.reducerAuth);
  const reduxStateCart = useSelector((state) => state.reducerCart);
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

  React.useEffect(() => {}, [accessToken, reduxAuthState.user]);

  const handleLogout = (token) => {
    dispatch(logoutAction(token));
    sessionStorage.clear();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <b>E-Shop</b>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {!accessToken ? (
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          ) : (
            <button
              className="btn ml-4"
              onClick={() => {
                handleLogout(accessToken);
              }}
            >
              Logout
            </button>
          )}

          <span id="cart" className="ml-3">
            <Link to="/cart">Cart</Link>
          </span>
          <span className="ml-1" id="cart_count">
            {reduxStateCart.cart.length}
          </span>
          {reduxAuthState.user && (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white"
                role="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={reduxAuthState.user.avatar.url}
                    alt={reduxAuthState.user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{reduxAuthState.user && reduxAuthState.user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {reduxAuthState.user && reduxAuthState.user.role !== "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item text-danger" to="/">
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
