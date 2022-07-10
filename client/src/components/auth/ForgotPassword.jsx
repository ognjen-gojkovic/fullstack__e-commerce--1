import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userClearError,
  forgotPasswordAction,
} from "../../redux/actions/Actions.User";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateForgotPassword = useSelector(
    (state) => state.reducerForgotPassword
  );

  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (reduxStateForgotPassword.error)
      alert(reduxStateForgotPassword.error.msg);
    dispatch(userClearError());

    if (reduxStateForgotPassword.msg) {
      alert(reduxStateForgotPassword.msg);
    }
  }, [
    dispatch,
    reduxStateForgotPassword.msg,
    reduxStateForgotPassword.error,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      email,
    };

    dispatch(forgotPasswordAction(credentials));

    setEmail("");
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={reduxStateForgotPassword.loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
