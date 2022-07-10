import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  userClearError,
  newPasswordAction,
} from "../../redux/actions/Actions.User";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reduxStateForgotPassword = useSelector(
    (state) => state.reducerForgotPassword
  );

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    if (reduxStateForgotPassword.error)
      alert(reduxStateForgotPassword.error.msg);
    dispatch(userClearError());

    if (reduxStateForgotPassword.success) {
      alert("Password Updated Successfully.");
    }
    navigate("/login");
  }, [
    dispatch,
    reduxStateForgotPassword.msg,
    navigate,
    reduxStateForgotPassword.error,
    reduxStateForgotPassword.success,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      password,
      confirmPassword,
    };

    dispatch(newPasswordAction(credentials, params.token));

    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">New Password</h1>

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

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
