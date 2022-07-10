import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUserAdminFetch,
  updateUserClearError,
  updateUserReset,
} from "../../redux/actions/Actions.AdminUpdateUser";
import {
  getUserDetailsFetch,
  getUserDetailsClearError,
} from "../../redux/actions/Actions.User";
import Sidebar from "./Sidebar";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reduxStateAdminUpdateUser = useSelector(
    (state) => state.reducerAdminUpdateUser
  );
  const reduxStateAdminUserDetails = useSelector(
    (state) => state.reducerUserDetails
  );
  const userID = params.id;
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState({ type: "" });

  React.useEffect(() => {
    if (
      !reduxStateAdminUserDetails.user ||
      (reduxStateAdminUserDetails.user &&
        reduxStateAdminUserDetails.user._id !== userID)
    ) {
      dispatch(getUserDetailsFetch(userID, accessToken));
    } else {
      setName(reduxStateAdminUserDetails.user.name);
      setEmail(reduxStateAdminUserDetails.user.email);
      setRole(reduxStateAdminUserDetails.user.role.type);
    }

    if (reduxStateAdminUpdateUser.error) {
      alert(reduxStateAdminUpdateUser.error.msg);
      dispatch(updateUserClearError());
    }

    if (reduxStateAdminUserDetails.error) {
      alert(reduxStateAdminUserDetails.error.msg);
      dispatch(getUserDetailsClearError());
    }

    if (reduxStateAdminUpdateUser.success) {
      alert("User updated successfully.");

      navigate("/admin/users");

      // dispatch 'profile reset action'
      dispatch(updateUserReset());
    }
  }, [
    dispatch,
    accessToken,
    reduxStateAdminUpdateUser.success,
    reduxStateAdminUpdateUser.error,
    reduxStateAdminUserDetails.error,
    reduxStateAdminUserDetails.user,
    userID,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      role,
    };

    dispatch(
      updateUserAdminFetch(
        reduxStateAdminUserDetails.user._id,
        user,
        accessToken
      )
    );

    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleSubmit}>
                  <h1 className="mt-2 mb-5">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role_field">Role</label>

                    <select
                      id="role_field"
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={(e) => setRole({ type: e.target.value })}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
