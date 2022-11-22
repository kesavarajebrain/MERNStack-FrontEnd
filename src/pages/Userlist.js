import React, { useState } from "react";
//stylesheet
import "../components/stylesheets/Userlist.css";
//mui
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//snackbar
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// action
import { deleteSingleUser, editSingleUser } from "../redux/actions/userAction";
//dispatch
import { useDispatch,useSelector } from "react-redux";
// showing the date like real time app
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// snackbar action
import {showSuccessSnackbar} from '../redux/actions/snackbarAction';
// api
import { API_URL } from "../api/api.config";
// spinner action
import { loadSpinner,hideSpinner} from '../redux/actions/spinnerAction';
 // const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function Userlist({ userData }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser);
  // delete user funtion
  const deleteUser = async (userData) => {
    dispatch(loadSpinner())
    console.log(userData);
    const delData = {
      _id: userData._id,
    };
    const response = await fetch(`${API_URL}/user/deleteUserById`, {
      method: "POST",
      body: JSON.stringify(delData),
      headers: {
        "access-control-allow-origin" : "*",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
    });
    const json = await response.json();
    console.log(json)
    if (response.ok) {
      dispatch(deleteSingleUser(json.result));
      dispatch(showSuccessSnackbar(json.Msg))
      dispatch(hideSpinner())
      // openToast();
      // setResponse(json.Msg);
      // console.log(setResponse)
    }
  };

  // edit user 
  const editUser = async(userData) =>{
    await dispatch(editSingleUser(userData))
  }

  // snackbar
  // const openToast = () => {
  //   setOpenSnackBr({ vertical: "top", horizontal: "right" });
  // };
  // const closeSnackBar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenSnackBr(false);
  // };
  return (
    <div className="container userList">
      <p>
        <strong>Name :</strong>&nbsp;{userData.name}
      </p>
      <p>
        <strong>Email :</strong>&nbsp;{userData.email}
      </p>
      <p>
        <strong>Phone :</strong>&nbsp;{userData.mobileNumber}
      </p>
      <span>Added {formatDistanceToNow(new Date(userData.createdAt),{addSuffix:true})}</span>
      <div className="text-end">
        <Button variant="outlined" color="success" size="small" onClick={() => editUser(userData)}>
          <EditOutlinedIcon fontSize="small"></EditOutlinedIcon> Edit
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outlined"
          color="warning"
          size="small"
          onClick={() => deleteUser(userData)}
        >
          <DeleteForeverOutlinedIcon fontSize="small"></DeleteForeverOutlinedIcon>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Userlist;
