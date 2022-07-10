import React from "react";
import Login from "../auth/Login";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

const ShippingNavigator = () => {
  const location = useLocation();
  const [redirect, setRedirect] = useState("");
  const reduxStateAuth = useSelector((state) => state.reducerAuth);

  React.useEffect(() => {
    if (location.search) {
      let redirect = "/" + location.search.split("=")[1];
      setRedirect(redirect);
    } else {
      setRedirect("/");
    }
  }, [location.search]);

  return reduxStateAuth.isAuthenticated ? (
    <Navigate to={{ pathname: redirect }} />
  ) : (
    <Login />
  );
};

export default ShippingNavigator;
