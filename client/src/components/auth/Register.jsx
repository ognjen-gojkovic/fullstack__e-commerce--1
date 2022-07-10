import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerAction,
  clearErrorRegister,
} from "../../redux/actions/Actions.Register";
import MetaData from "../layout/MetaData";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateAuth = useSelector((state) => state.reducerAuth);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(
    "/images/default_avatar.jpg"
  );

  React.useEffect(() => {
    if (reduxStateAuth.isAuthenticated) navigate("/");
    if (reduxStateAuth.error) alert(reduxStateAuth.error.msg);
    dispatch(clearErrorRegister());
  }, [
    dispatch,
    reduxStateAuth.error,
    reduxStateAuth.isAuthenticated,
    navigate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", avatar);

    dispatch(registerAction(formData));
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        // 1 means - proccessing
        // 2 means - is finished proccessing
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <MetaData title={"Register User"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-3">Register</h1>

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
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={user.password}
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
                      alt="avatar preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={reduxStateAuth.loading}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
