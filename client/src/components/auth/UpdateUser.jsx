import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfileAction,
  updateProfileReset,
} from "../../redux/actions/Actions.User";
import { clearErrorRegister } from "../../redux/actions/Actions.Register";
import { LSAndSSCredentials } from "../../redux/actions/Actions.Login";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateAuth = useSelector((state) => state.reducerAuth) || {};
  const reduxStateUser = useSelector((state) => state.reducerUser) || {};
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });
  const [avatar, setAvatar] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(
    "/images/default_avatar.jpg"
  );

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (reduxStateAuth.user) {
      setUser({
        name: reduxStateAuth.user.name,
        email: reduxStateAuth.user.email,
      });
      setAvatarPreview(reduxStateAuth.user.avatar.url);
    }
    if (reduxStateAuth.error) alert(reduxStateAuth.error.msg);
    dispatch(clearErrorRegister());

    if (reduxStateUser.isUpdated) {
      alert("User updated successfully.");

      // fetch updated user
      const credentials = {
        user,
        accessToken: "",
      };
      dispatch(LSAndSSCredentials(credentials));
      navigate("/me");
    }

    // dispatch 'profile reset action'
    dispatch(updateProfileReset());
  }, [
    dispatch,
    reduxStateAuth.error,
    reduxStateAuth.user,
    reduxStateUser.isUpdated,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("avatar", avatar);

    dispatch(updateProfileAction(formData, accessToken));

    setUser({
      name: "",
      email: "",
    });
    setAvatar(null);
    setAvatarPreview("");
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        // 1 means - proccessing
        // 2 means - is finished proccessing
        if (reader.readyState === 2) {
          setAvatar(e.target.files[0]);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0] || "");

      setAvatar(e.target.files[0]);
      setAvatarPreview(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
