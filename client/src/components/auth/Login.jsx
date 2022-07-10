import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  clearErrorLogin,
} from "../../redux/actions/Actions.Login";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Login = () => {
  const dispatch = useDispatch();
  const reduxStateAuth = useSelector((state) => state.reducerAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [redirect, setRedirect] = React.useState("");

  React.useEffect(() => {
    /**
     * @desc
     * this part is relevant for cart component
     * if customer goes to cart and he is not logged in,
     * he is redirected to login page and after he logs in
     * he is redirected to shipping component
     */
    const redirect = location.search && "/" + location.search.split("=")[1];

    if (reduxStateAuth.isAuthenticated) navigate(redirect);
    if (reduxStateAuth.error) alert(reduxStateAuth.error.msg);
    dispatch(clearErrorLogin());
  }, [
    dispatch,
    reduxStateAuth.error,
    navigate,
    location,
    reduxStateAuth.isAuthenticated,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAction(email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {reduxStateAuth.loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="login" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={(e) => handleSubmit(e)}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
