import React, { useState, useEffect } from "react";
//formik validation
import { useFormik } from "formik";
import * as Yup from "yup";
//mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// mui icon
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
// mui spinner
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
// stylesheet
import "../components/stylesheets/Userform.css";
//snackbar not in use
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import action file and define all funtions used in the file
import { createdUser, updateSingleUser } from "../redux/actions/userAction";
// import usedispatch for send the action to redux then it will perform the action
import { useDispatch } from "react-redux";
// use selector
import { useSelector } from "react-redux";
// snackbar action
import {showSuccessSnackbar} from '../redux/actions/snackbarAction';
//api 
import { API_URL } from "../api/api.config";
// spinner action
import {hideSpinner,loadSpinner } from '../redux/actions/spinnerAction';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Userform() {
  const dispatch = useDispatch();
  // state
  const [error, seterror] = useState(null);
  const [response, setResponse] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [updateResponse, setUpdateResponse] = useState(null);
  // button spinner
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // snackbar
  const [openSnackBar, setOpenSnackBr] = React.useState();
  const authToken = useSelector((state) => state.authUser);
  // validation
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNumber: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required!")
        .min(2, "Atleast 2 charectors minimum!")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed!"),
      mobileNumber: Yup.string()
        .required("Number is required")
        .min(10, "Minimum 10 charectors only!")
        .max(10, "Maximum 10 charectors only!")
        .matches(phoneRegExp, "Numbers only allowed!"),
      email: Yup.string()
        .email("Enter valid email!")
        .required("Email is required!"),
    }),

    onSubmit: async (formData) => {
      // button spinner
      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }
      dispatch(loadSpinner())
      console.log(formData);
      formData.admin_id = authToken.userLog._id
      // post data to api
      const user = formData;
      const response = await fetch(`${API_URL}/user/addNewUser`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken.token}`
        },
      });
      console.log(response);
      const json = await response.json();
      console.log(json.result);
      console.log(json.data);
      if (!response.ok) {
        seterror(json.error);
        dispatch(hideSpinner())
      }
      if (response.ok) {
        // after created a new user diapatch this
        dispatch(createdUser(json.data));
        // reset form
        formik.resetForm();
        dispatch(hideSpinner())
        //button spinner
        setSuccess(true);
        setLoading(false);
        // snackbar
        dispatch(showSuccessSnackbar(json.result))
        // set response to state
        setResponse(json.result);
        setUserdata(json.data);
      }
    },
  });

  const edit_user = useSelector((state) => state.users.editedUser);
  useEffect(() => {
    // SHOWING edit values to the form
    console.log("EDIT USER", edit_user);
    if (edit_user) {
      formik.values.name = edit_user.name;
      formik.values.mobileNumber = edit_user.mobileNumber;
      formik.values.email = edit_user.email;
    }
  }, [edit_user]);

  // Update user
  const updateUser = async (data) => {
    dispatch(loadSpinner())
    data._id = edit_user._id;
    console.log("UPDATE User", data);
    const response = await fetch(`${API_URL}/user/updateUserById`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${authToken.token}`
      },
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      console.log(json);
      dispatch(updateSingleUser(json.result));
      dispatch(showSuccessSnackbar(json.result))
      dispatch(hideSpinner())
      setUpdateResponse(json);
      // console.log(setResponse)
    }
  };

  //button spinner
  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  return (
    <div className="container">
      <h6 className="text-center">User Add Form</h6>
      <div className="formDiv">
        <form enableReinitialize autoComplete="off">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Username"
              size="small"
              variant="outlined"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <span className="text-danger">
                <ErrorTwoToneIcon fontSize="small" /> {formik.errors.name}
              </span>
            ) : null}

            <TextField
              id="outlined-basic"
              label="User Phone"
              size="small"
              variant="outlined"
              name="mobileNumber"
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
            />
            {formik.errors.mobileNumber ? (
              <span className="text-danger">
                <ErrorTwoToneIcon fontSize="small" />
                {formik.errors.mobileNumber}
              </span>
            ) : null}
            <TextField
              id="outlined-basic"
              label="User Email"
              size="small"
              variant="outlined"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <span className="text-danger">
                <ErrorTwoToneIcon fontSize="small" /> {formik.errors.email}
              </span>
            ) : null}
          </Box>
          <center>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ m: 1, position: "relative" }}>
                {!edit_user ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit(e);
                    }}
                    type="button"
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                  >
                    Add User
                  </Button>
                ) : (
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={() => updateUser(formik.values)}
                  >
                    Update User
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: blue[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Box>
          </center>
        </form>
        {/* show success msg */}
        {/* {response && (
          <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={closeSnackBar}
          >
            <Alert
              onClose={closeSnackBar}
              severity="success"
              sx={{ width: "100%" }}
            >
              {response && userdata && (
                <p>
                  {userdata.name}&nbsp;{response} successfully!
                </p>
              )}
              {updateResponse && <p>{updateResponse.result} successfully!</p>}
            </Alert>
          </Snackbar>
        )} */}
      </div>
    </div>
  );
}

export default Userform;
