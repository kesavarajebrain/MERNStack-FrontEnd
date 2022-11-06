import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import store
import { createStore } from "redux";
//import provider -  provide our store to react application
import { Provider } from "react-redux";
// import our root reducer (reducers index.js, we combined all reducers)
import allReducers from "./redux/reducers";
// config store with name and pass reducer
// add dev tool extension for redux to check redux in chrome
const myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={myStore}>
    <App />
  </Provider>
);
