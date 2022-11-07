// import router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//changing default theme of mui
// npm install @material-ui/core install and import below
import { ThemeProvider, createMuiTheme } from "@mui/material/styles";
//config components
import Header from "./components/Header";
//config pages
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Redux from "./pages/Redux";
// import useselector for view the state data or redux store
import { useSelector } from "react-redux";
// dispatch
import { useDispatch } from "react-redux";
//
import { useEffect } from "react";
// action
import { loginAdmin } from "../src/redux/actions/authAction";
// common snackbar
import SnackbarSuccess from "./components/SnackbarSuccess";
import Spinner from "./components/Spinner";
// config custom things for mui
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
});

function App() {
  const dispatch = useDispatch();
  // dispatch once if we have the localstorage user data for retain the logged data if page page gets refreshed
  useEffect(() => {
    const loggedUserData = JSON.parse(localStorage.getItem("user"));
    if (loggedUserData) dispatch(loginAdmin(loggedUserData));
    //React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array  react-hooks/exhaustive-deps warning in the terminal so add dispatch in the array because we used inside the useeffect
  }, [dispatch]);

  // check the token availble in redux state
  const isAuthenticate = useSelector((state) => state.authUser.token);
  console.log(isAuthenticate);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* common snackbar */}
        <SnackbarSuccess/>
        {/* common spinner */}
        <Spinner/>
        <BrowserRouter>
          {/* Add header here */}
          {/* show the header only authuser gets a proper value */}
          {isAuthenticate && <Header />}
          <div className="pages">
            <Routes>
              <Route
                path="/login"
                element={
                  !isAuthenticate ? <Auth /> : <Navigate to="/dashboard" />
                }
              ></Route>
              <Route path="*" element={!isAuthenticate ? <Auth />: <Navigate to='/dashboard'/>}></Route>
              <Route
                path="/dashboard"
                element={
                  isAuthenticate ? <Dashboard /> : <Navigate to="/login" />
                }
              ></Route>
              <Route
                path="/redux"
                element={isAuthenticate ? <Redux /> : <Navigate to="/login" />}
              ></Route>
              {/* // wild card route if empty route ite get redirect to login */}
            </Routes>
          </div>
          {/* Add footer here */}
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
