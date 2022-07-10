import React from "react";
import Login from "../auth/Login";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ isAdmin }) => {
  const navigate = useNavigate();
  const reduxStateAuth = useSelector((state) => state.reducerAuth);

  React.useEffect(() => {
    if (
      reduxStateAuth.user &&
      reduxStateAuth.user.role.type !== "admin" &&
      isAdmin === true
    ) {
      navigate("/");
    }
  }, [navigate, reduxStateAuth, isAdmin]);

  return reduxStateAuth.isAuthenticated ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
