import { combineReducers } from "redux";
import { reducerProducts } from "./reducers/Reducer.Products";
import { reducerProductDetails } from "./reducers/Reducer.ProductDetails";
import { reducerAuth } from "./reducers/Reducer.Auth";
import { reducerUser } from "./reducers/Reducer.User";
import { reducerForgotPassword } from "./reducers/Reducer.ForgotPassword";
import { reducerCart } from "./reducers/Reducer.Cart";
import { reducerOrder } from "./reducers/Reducer.Order";
import { reducerMyOrders } from "./reducers/Reducer.MyOrders";
import { reducerOrderDetails } from "./reducers/Reducer.OrderDetails";
import { reducerNewReview } from "./reducers/Reducer.NewReview";
import { reducerAdminProducts } from "./reducers/Reducer.AdminProducts";
import { reducerAdminNewProduct } from "./reducers/Reducer.AdminNewProduct";
import { reducerAdminDeleteProduct } from "./reducers/Reducer.AdminDeleteProduct";
import { reducerAdminUpdateProduct } from "./reducers/Reducer.AdminUpdateProduct";
import { reducerAdminAllOrders } from "./reducers/Reducer.AdminAllOrders";
import { reducerAdminUpdateOrder } from "./reducers/Reducer.AdminUpdateOrder";
import { reducerAdminDeleteOrder } from "./reducers/Reducer.AdminDeleteOrder";
import { reducerAdminAllUsers } from "./reducers/Reducer.AdminAllUsers";
import { reducerAdminUpdateUser } from "./reducers/Reducer.AdminUpdateUser";
import { reducerUserDetails } from "./reducers/Reducer.UserDetails";
import { reducerAdminDeleteUser } from "./reducers/Reducer.AdminDeleteUser";
import { reducerAdminAGetReviews } from "./reducers/Reducer.AdminGetReviews";
import { reducerAdminDeleteReview } from "./reducers/Reducer.AdminDeleteReview";

export const rootReducer = combineReducers({
  reducerProducts,
  reducerProductDetails,
  reducerAuth,
  reducerUser,
  reducerForgotPassword,
  reducerCart,
  reducerOrder,
  reducerMyOrders,
  reducerOrderDetails,
  reducerNewReview,
  reducerAdminProducts,
  reducerAdminNewProduct,
  reducerAdminDeleteProduct,
  reducerAdminUpdateProduct,
  reducerAdminAllOrders,
  reducerAdminUpdateOrder,
  reducerAdminDeleteOrder,
  reducerAdminAllUsers,
  reducerAdminUpdateUser,
  reducerUserDetails,
  reducerAdminDeleteUser,
  reducerAdminAGetReviews,
  reducerAdminDeleteReview,
});
