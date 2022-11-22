import React, { useState } from "react";
//import css
import "../components/stylesheets/Auth.css";
//mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
// mui icon
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
//formik validation
import { useFormik } from "formik";
import * as Yup from "yup";
// dispatch
import { useDispatch } from "react-redux";
// action
import { loginAdmin } from "../redux/actions/authAction";
// navigate to one page to other
import { useNavigate } from "react-router-dom";
// show hide password
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// snackbar action
import {showSuccessSnackbar} from '../redux/actions/snackbarAction';
// spinner action
import {hideSpinner,loadSpinner } from '../redux/actions/spinnerAction';
// env 
import {API_URL,HEADER} from '../api/api.config'
// snackbar
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function Auth() {
  // navigate page
  const navigate = useNavigate();
  // config dispatch
  const dispatch = useDispatch();
  // state for showing error and success
  const [showError, setError] = React.useState();
  const [showSuccess, setSuccess] = React.useState();
  // show hide password
  const [isVisible, setVisible] = useState(false);
  const [isVisibleTwo, setVisibleTwo] = useState(false);
  const toggle = () => {
    setVisible(!isVisible);
  };
  const toggleTwo = () => {
    setVisibleTwo(!isVisibleTwo);
  };
  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter valid email!")
        .required("Email is required!"),
      password: Yup.string()
        .required("Password is required!")
        .min(5, "Password atleast 5 letters!"),
      name: Yup.string().required("Name is required!"),
    }),

    onSubmit: async (formData) => {
      dispatch(loadSpinner())
      console.log(formData);
      // api call
      const logData = formData;
      const response = await fetch(`${API_URL}/admin/adminLogin`, {
        method: "POST",
        body: JSON.stringify(logData),
        headers: HEADER
      });
      const json = await response.json();
      if (!response.ok) {
        dispatch(hideSpinner())
        // set error to state
        setError(json.msg);
        // clear the error msg after 5sec
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (response.ok) {
        dispatch(loginAdmin(json));
        dispatch(hideSpinner())
        dispatch(showSuccessSnackbar(json.result))
        // save response in local storage
        localStorage.setItem("user", JSON.stringify(json));
        // setSuccess(json.msg);
        // // clear the error msg after 5sec
        // setTimeout(() => {
        //   setSuccess("");
        // }, 3000);

        // route to page
        navigate("/dashboard");
      }
    },
  });

  // state for show hide
  const [signDiv, setSignDivState] = React.useState(false);
  // sign up call

  const signNewAdmin = async (data) => {
    if (data.name === "" || data.email === "" || data.password === "")
      formik.handleSubmit();
    else {
      dispatch(loadSpinner())
      // api call
      const postData = data;
      const postResponse = await fetch(`${API_URL}/admin/addNewAdmin`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: HEADER
      });
      const postJson = await postResponse.json();
      if (!postResponse.ok) {
        // set error to state
        setError(postJson.msg);
        dispatch(hideSpinner())
        // clear the error msg after 5sec
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (postResponse.ok) {
        setSuccess(postJson.msg);
        // clear the error msg after 5sec
        setTimeout(() => {
          setSuccess("");
        }, 3000);
        dispatch(loginAdmin(postJson));
        dispatch(hideSpinner())
        // save response in local storage
        localStorage.setItem("user", JSON.stringify(postJson));
        // route to page
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-4 col-md-6 col-sm-6">
          {!signDiv && (
            <Card sx={{ minWidth: 275, borderRadius: "15px" }}>
              <CardContent>
                <div class="card-title text-center border-bottom mb-3">
                  <img
                    src={require("../assets/images/001-teamwork.png")}
                    width={50}
                    alt=""
                    height={50}
                  ></img>
                  <h5 class="mt-2">Login</h5>
                  {showError && <div className="error">{showError}</div>}
                  {showSuccess && <div className="success">{showSuccess}</div>}
                </div>
                <form>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div class="mb-4">
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.errors.email ? (
                        <span className="text-danger">
                          <ErrorTwoToneIcon fontSize="small" />{" "}
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                    <div class="mb-4">
                      <TextField
                        type={!isVisible ? "password" : "text"}
                        id="outlined-basic"
                        size="small"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div onClick={toggle} className='password'>
                        <span style={{cursor:'pointer'}}>
                          {isVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                      {formik.errors.password ? (
                        <span className="text-danger">
                          <ErrorTwoToneIcon fontSize="small" />{" "}
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                    <div class="d-grid">
                      <Button
                        type="button"
                        variant="contained"
                        onClick={(e) => {
                          // its a login we have only email and password , its required name for further api call so we just assign name as unknown because formik intial values have name
                          formik.values.name = "Unknown";
                          e.preventDefault();
                          formik.handleSubmit(e);
                        }}
                      >
                        <LoginRoundedIcon></LoginRoundedIcon>&nbsp; Login
                      </Button>
                      <span className="text-center mt-2">New User ?</span>
                      <Button
                        className="text-center mt-0"
                        size="small"
                        variant="text"
                        onClick={() => [
                          setSignDivState(true),
                          // on signup form intially its render name as unknown so here we empty the value
                          (formik.values.name = ""),
                          formik.resetForm(),
                        ]}
                      >
                        Signup Here
                      </Button>
                    </div>
                  </Box>
                </form>
              </CardContent>
            </Card>
          )}
          {/* ///////////////////////// signup div ///////////////////////////////*/}
          {signDiv && (
            <Card sx={{ minWidth: 275, borderRadius: "15px" }}>
              <CardContent>
                <div class="card-title text-center border-bottom mb-3">
                  <img
                    src={require("../assets/images/001-teamwork.png")}
                    width={50}
                    alt=""
                    height={50}
                  ></img>
                  <h5 class="mt-2">Signup</h5>
                  {showError && <div className="error">{showError}</div>}
                  {showSuccess && <div className="success">{showSuccess}</div>}
                </div>
                <form>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div class="mb-4">
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      {formik.errors.name ? (
                        <span className="text-danger">
                          <ErrorTwoToneIcon fontSize="small" />{" "}
                          {formik.errors.name}
                        </span>
                      ) : null}
                    </div>
                    <div class="mb-4">
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.errors.email ? (
                        <span className="text-danger">
                          <ErrorTwoToneIcon fontSize="small" />{" "}
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                    <div class="mb-4">
                      <TextField
                        type={!isVisibleTwo ? "password" : "text"}
                        id="outlined-basic"
                        size="small"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                       <div onClick={toggleTwo} className='password'>
                        <span style={{cursor:'pointer'}}>
                          {isVisibleTwo ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                      {formik.errors.password ? (
                        <span className="text-danger">
                          <ErrorTwoToneIcon fontSize="small" />{" "}
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                    <div class="d-grid">
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => {
                          signNewAdmin(formik.values);
                        }}
                      >
                        <LoginRoundedIcon></LoginRoundedIcon>&nbsp; Signup
                      </Button>
                      <span className="text-center mt-2">Have Account ?</span>
                      <Button
                        className="text-center mt-0"
                        size="small"
                        variant="text"
                        onClick={() => [
                          setSignDivState(false),
                          formik.resetForm(),
                        ]}
                      >
                        Login Here
                      </Button>
                    </div>
                  </Box>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
