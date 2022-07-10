import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updatePasswordAction,
  updatePasswordReset,
  clearErrorRegister,
} from "../../redux/actions/Actions.User";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateAuth = useSelector((state) => state.reducerAuth) || {};
  const reduxStateUser = useSelector((state) => state.reducerUser) || {};
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  React.useEffect(() => {
    if (reduxStateAuth.error) alert(reduxStateAuth.error.msg);
    dispatch(clearErrorRegister());

    if (reduxStateUser.isUpdated) {
      alert("Password updated successfully.");

      navigate("/me");
    }

    // dispatch 'password reset action'
    dispatch(updatePasswordReset());
  }, [dispatch, reduxStateAuth.error, reduxStateUser.isUpdated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      oldPassword,
      newPassword,
    };

    dispatch(updatePasswordAction(credentials, accessToken));

    setOldPassword("");
    setNewPassword("");
  };
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={reduxStateUser.loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
