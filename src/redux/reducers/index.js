// import all reducers here we multiple means we import all here
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import snackbarReducer from "./snackbarReducer"
import spinnerReducer from "./spinnerReducer"
//combine all the reducers
import { combineReducers } from "redux";

// pass all the reducers as key value pair, we use key value for define reducer here after
const allReducers = combineReducers({
  // left side is the reducer name
  counter: counterReducer,
  users:userReducer,
  authUser:authReducer,
  snackBar:snackbarReducer,
  spinner:spinnerReducer
});

// export the reducer

export default allReducers;
