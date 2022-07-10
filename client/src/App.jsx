import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { accessRefreshAction } from "./redux/actions/Actions.AccessRefresh";
import { LSAndSSCredentials } from "./redux/actions/Actions.Login";
import Profile from "./components/auth/Profile";
import UpdateUser from "./components/auth/UpdateUser";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import UpdatePassword from "./components/auth/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import NewPassword from "./components/auth/NewPassword";
import Cart from "./components/cart/Cart";
import ShippingInfo from "./components/cart/ShippingInfo";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaypalPayment from "./components/cart/PaypalPayment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUserAdmin from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import ShippingNavigator from "./components/routes/ShippingNavigator";
import { StyledApp } from "./StyledApp";

/**
 * @desc
 * lazy loading component
 * i.e. load component when needed
 */
const Home = React.lazy(() => import("./components/home/Home"));
const ProductDetails = React.lazy(() =>
  import("./components/product/ProductDetails")
);
const Register = React.lazy(() => import("./components/auth/Register"));

const App = () => {
  const dispatch = useDispatch();
  const reduxStateAuth = useSelector((state) => state.reducerAuth);
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const adminUser =
    reduxStateAuth.user && reduxStateAuth.user.role.type === "admin";

  /**
   * @desc
   * refresh access token before expiration
   */
  React.useEffect(() => {
    /**
     * @desc
     * set interval for refresh token only when user is loged-in
     * that is when accessToken is in browser storage
     * else it will return cross-origin error
     */
    if (accessToken) {
      const interval = setInterval(() => {
        dispatch(accessRefreshAction(accessToken));
      }, 10 * 60 * 1000);
      // 10 * 60 * 1000
      return () => clearInterval(interval);
    }
  }, [dispatch, accessToken]);

  /**
   * @desc
   * if app reloads and user still logged in
   * fetch user from localstorage and
   * accessToken from sessionStarage and save them in redux
   */
  React.useEffect(() => {
    if (localStorage.getItem("user") && sessionStorage.getItem("accessToken")) {
      let user = JSON.parse(localStorage.getItem("user"));
      let credentials = {
        user,
        accessToken,
      };
      dispatch(LSAndSSCredentials(credentials));
    }
  }, [dispatch, accessToken]);

  return (
    <StyledApp className="app">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route
            path="/register"
            element={
              <React.Suspense fallback="loading...">
                <Register />
              </React.Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <React.Suspense fallback="loading...">
                <ShippingNavigator />
              </React.Suspense>
            }
          />

          <Route
            path="/product/:id"
            element={
              <React.Suspense fallback="loading...">
                <ProductDetails />
              </React.Suspense>
            }
          />
          <Route
            path="/search/:keyword"
            element={
              <React.Suspense fallback="loading...">
                <Home />
              </React.Suspense>
            }
          />

          {/* Password FORGOT and RESET routes */}
          <Route
            path="/password/forgot"
            element={
              <React.Suspense fallback="loading...">
                <ForgotPassword />
              </React.Suspense>
            }
          />
          <Route
            path="/password/reset/:token"
            element={
              <React.Suspense fallback="loading...">
                <NewPassword />
              </React.Suspense>
            }
          />

          <Route
            path="/cart"
            element={
              <React.Suspense fallback="loading...">
                <Cart />
              </React.Suspense>
            }
          />

          {/* PROTECTED ROUTES*/}
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/shipping"
              element={
                <React.Suspense>
                  <ShippingInfo />
                </React.Suspense>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <React.Suspense>
                  <ConfirmOrder />
                </React.Suspense>
              }
            />

            <Route
              path="/order/payment"
              element={
                <React.Suspense fallback="loading...">
                  <PaypalPayment />
                </React.Suspense>
              }
            />

            <Route
              path="/orders/me"
              element={
                <React.Suspense fallback="loading...">
                  <ListOrders />
                </React.Suspense>
              }
            />
            <Route
              path="/order/:id"
              element={
                <React.Suspense fallback="loading...">
                  <OrderDetails />
                </React.Suspense>
              }
            />

            <Route
              path="/success"
              element={
                <React.Suspense fallback="loading...">
                  <OrderSuccess />
                </React.Suspense>
              }
            />

            <Route
              path="/me"
              element={
                <React.Suspense>
                  <Profile />
                </React.Suspense>
              }
            />

            <Route
              path="/me/update"
              element={
                <React.Suspense>
                  <UpdateUser />
                </React.Suspense>
              }
            />

            <Route
              path="/password/update"
              element={
                <React.Suspense>
                  <UpdatePassword />
                </React.Suspense>
              }
            />
          </Route>

          <Route
            path="/"
            element={
              <React.Suspense fallback="loading...">
                <Home />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
      <div>
        <Routes>
          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/dashboard"
              element={
                <React.Suspense>
                  <Dashboard />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
        <Routes>
          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/products"
              element={
                <React.Suspense>
                  <ProductsList />
                </React.Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/products/:id"
              element={
                <React.Suspense>
                  <UpdateProduct />
                </React.Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/product/new"
              element={
                <React.Suspense>
                  <NewProduct />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/orders"
              element={
                <React.Suspense>
                  <OrdersList />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/order/:id"
              element={
                <React.Suspense>
                  <ProcessOrder />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/users"
              element={
                <React.Suspense>
                  <UsersList />
                </React.Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/admin/user/:id"
              element={
                <React.Suspense>
                  <UpdateUserAdmin />
                </React.Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoutes isAdmin={adminUser} />}>
            <Route
              path="/reviews"
              element={
                <React.Suspense>
                  <ProductReviews />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </div>

      {user && user.role !== "admin" && <Footer />}
    </StyledApp>
  );
};

export default App;
