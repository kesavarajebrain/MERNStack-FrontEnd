import React from "react";
//import css
import "../components/stylesheets/Dashboard.css";
// use effect will work on page load
import { useEffect, useState } from "react";
// import useselector for view the state data or redux store
import { useSelector } from "react-redux";
// import action file and define all funtions used in the file
import { setUsers } from "../redux/actions/userAction";
// snackbar action
import {showSuccessSnackbar} from '../redux/actions/snackbarAction';
// spinner action
import {hideSpinner,loadSpinner } from '../redux/actions/spinnerAction'
// import usedispatch for send the action to redux then it will perform the action
import { useDispatch } from "react-redux";
//mui
import Alert from "@mui/material/Alert";
// import other pages
import Userlist from "./Userlist";
import Userform from "./Userform";
// spinner
import Spinner from "../components/Spinner";

function Dashboard() {
  // state management for store users
  // const [allUsers, setAllUsers] = useState(null);
  // get the state value like this state or redux state
  const user = useSelector((state) => state.users.allUsers);
  // get the auth token from state
  const authToken = useSelector((state) => state.authUser);
  console.log("USERS", user);
  console.log("Auth", authToken);
  // config the dispatch
  const dispatch = useDispatch();

  //useeffect call on page loads, give empty array it wil call only once if not it calling contiously
  useEffect(() => {
    const sendAdmindata = {
      admin_id: authToken.userLog._id,
    };
    const fetchUsers = async () => {
      dispatch(loadSpinner())
      const response = await fetch("/user/getAllUsers", {
        // send logged user Id
        method: "POST",
        body: JSON.stringify(sendAdmindata),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      console.log(json.data);
      if (response.ok) {
        dispatch(setUsers(json.data));
        dispatch(hideSpinner())
        // dispatch(showSuccessSnackbar(json.result));
        // setAllUsers(json.data, json.result);
      }
    };
    // check the token then only useeffect will call
    if (authToken) {
      fetchUsers();
    }
  }, [dispatch, authToken]);

  return (
    <div className="container mainContainer">
      <div className="container">
        <div className="mainSection">
          <div className="col-md-12 row">
            <div className="col-md-7">
              {user == null ||
                (user.length == 0 && (
                  <div className="text-center">
                    <Alert severity="error">No Records Available!</Alert>
                  </div>
                ))}
              {user &&
                user.map((user) => <Userlist key={user._id} userData={user} />)}
            </div>
            <div className="col-md-5">
              <Userform />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
