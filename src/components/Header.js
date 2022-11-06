import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/Header.css";
// import useselector for view the state data or redux store
import { useSelector } from "react-redux";
// dispatch
import { useDispatch } from "react-redux";
// action
import { logoutAdmin } from "../redux/actions/authAction";
// empty the state on logout 
import { setUsers} from "../redux/actions/userAction"
function Header() {
  const dispatch = useDispatch();
  // Collapse isOpen State
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  // check the token availble in redux state
  const isAuthenticate = useSelector((state) => state.authUser.token);
  const loggedUserData = useSelector((state) => state.authUser.userLog);
  return (
    <div className="container-fluid mainNav">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <Link to="/dashboard">
            <h4 className="brandName">
              <img
                src={require("../assets/images/001-teamwork.png")}
                width={55}
                height={50}
              ></img>
              User Infosystem
            </h4>
          </Link>
          <button
            type="button"
            class="navbar-toggler"
            aria-expanded={!isNavCollapsed ? true : false}
            onClick={handleNavCollapse}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}>
            <div class="navbar-nav">
              <Link to="/dashboard" class="nav-item nav-link">
                <p>Dashboard</p>
              </Link>
              <Link to="/redux" class="nav-item nav-link">
                <p>Redux</p>
              </Link>
            </div>
            {isAuthenticate && (
              <div class="navbar-nav ms-auto">
                {/* //calling multiple function on click in array*/}
                <Link
                  class="nav-item nav-link"
                  onClick={() => [localStorage.removeItem('user'),
                    dispatch(logoutAdmin()), dispatch(setUsers(null))
                  ]}
                >
                  <h6 className="logOut">
                    <img
                      src={require("../assets/images/logout.png")}
                      width={25}
                      height={25}
                    ></img>
                    &nbsp;{" "}
                    <span className="fs-7">
                      {loggedUserData.name} <br></br>
                      {loggedUserData.email}
                    </span>
                  </h6>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
