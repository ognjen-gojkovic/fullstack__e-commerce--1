import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";

import {
  allUsersFetch,
  adminAllUsersClearError,
} from "../../redux/actions/Actions.AdminAllUsers";
import {
  deleteUserAdminFetch,
  deleteUserClearError,
  deleteUserReset,
} from "../../redux/actions/Actions.AdminDeleteUser";

import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateAllUsers = useSelector((state) => state.reducerAdminAllUsers);
  const reduxStateAdmiDeleteUser = useSelector(
    (state) => state.reducerAdminDeleteUser
  );

  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    dispatch(allUsersFetch(accessToken));

    if (reduxStateAllUsers.error) {
      alert(reduxStateAllUsers.error.message);
      dispatch(adminAllUsersClearError());
    }

    if (reduxStateAdmiDeleteUser.isDeleted) {
      alert("User deleted successfully.");
      navigate("/admin/users");
      dispatch(deleteUserReset());
    }

    if (reduxStateAdmiDeleteUser.error) {
      alert(reduxStateAllUsers.error.message);
      dispatch(deleteUserClearError());
    }
  }, [
    dispatch,
    accessToken,
    reduxStateAllUsers.error,
    reduxStateAdmiDeleteUser.error,
    reduxStateAdmiDeleteUser.isDeleted,
    navigate,
  ]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUserAdminFetch(id, accessToken));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reduxStateAllUsers.users &&
      reduxStateAllUsers.users.users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role.type,

          actions: (
            <>
              <Link
                to={`/admin/user/${user._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>

            {reduxStateAllUsers.loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setUsers()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UsersList;
