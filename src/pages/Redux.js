import React from "react";
// mui
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
// import useselector for view the state data or redux store
import { useSelector } from "react-redux";
// import action file and define all funtions used in the file
import { decrement, increment } from "../redux/actions/counterAction";
// import usedispatch for send the action to redux then it will perform the action
import { useDispatch } from "react-redux";

function Redux() {
  // get the state value like this state or redux state
  const counter = useSelector((state) => state.counter);
  console.log("COUNTER", counter);
  // config the dispatch
  const dispatch = useDispatch();
  return (
    <div className="container">
      <h5 className="text-center">REDUX</h5>
      <h6 className="text-center">
        {counter.msg} [{counter.number}]
      </h6>
      <div className="text-center">
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={() => dispatch(increment())}
        >
          Plus (+)
        </Button>
        &nbsp;&nbsp;
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={() => dispatch(decrement())}
        >
          Minus (-)
        </Button>
      </div>
      <br></br>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="fs-6">
          1. Install redux cmd - <strong>npm i redux react-redux</strong>
          <br></br>
          2. 4 concepts in redux <br></br>
          <b>STORE</b> - is the global one for manage the all data, only one
          store is there for all application.<br></br> <b>ACTION</b> - defines
          the actions what ever we perform using the redux like increment ,
          decrement etc.., <br></br>
          <b>REDUCER</b> - write logics in this file, we can add multiple
          reducers in a project but we combine and pass in the store. <br></br>
          <b>DISPATCH</b> - we send the corresponding function to perform using
          redux<br></br>
          3. Create store first -
          <code>import `createStore` from 'redux'; in index.js file</code>
          <br></br>
          4. Config the store with name and pass reducer in it -{" "}
          <code>const store = createStore(reducer)</code> <br></br>
          5. Create folder for <b>redux</b> in the src, redux folder inside this
          folder create <b>actions</b> and <b>reducers</b> folders.
          <br></br>
          6. Now create <b>index.js file</b> in the reducers folder (is the root
          file of the multiple reducers)
          <br></br>
          7. Create <b>sample reducer file</b>, counter reducer increment and
          decrement
          <br></br> &nbsp;&nbsp;&nbsp;&nbsp;
          <b>*</b> reducer have initial state and action as the parameter{" "}
          <br></br>&nbsp;&nbsp;&nbsp;&nbsp;<b>*</b> write swicth for perform the
          corresponding action <br></br>&nbsp;&nbsp;&nbsp;&nbsp;<b>*</b> export
          the reducer to several places
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;e.g <br></br>
          <code>
            switch(action.type) <br></br>case "INCREMENT" : return state + 1;{" "}
            <br></br>case "DECREMENT" : return state - 1; <br></br>default :
            return state; <br></br>export default counterReducer;
          </code>
          <br></br>
          8. Refer the 6th point , in the index file we combine all reducers{" "}
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>*</b>import all reducers here we multiple
          means we import all here
          <br></br>
          <code>import counterReducer from "./counterReducer";</code>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>*</b>combine all the reducers <br></br>{" "}
          <code>import `` combineReducers `` from "redux";</code>
          <br></br>&nbsp;&nbsp;&nbsp;&nbsp;<b>*</b>pass all the reducers as key
          value pair, we use key value for define reducer here after <br></br>
          <code>
            const allReducers = combineReducers(
            {
              // left side is the reducer name
              `      counter: counterReducer,
`
            }
            );
          </code>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>*</b>export the reducer export default
          allReducers;
          <br></br>
          9. import our root reducer (reducers index.js, we combined all
          reducers) in our main index.js file, ref 3 rd point. <br></br>
          <code>import allReducers from './redux/reducers';</code>
          <br></br>
          10. Now pass the reducer to our store <br></br>
          <code>const store = createStore(allReducers)</code>
          <br></br>
          11. See the redux state management via chrome inspect add readux
          devtools extension in chrome. <br></br> add dev tool extension for
          redux to check redux in chrome (main index.js file)<br></br>
          <b>
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
          </b>
          <br></br>
          <code>
            const store = createStore(allReducers,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__())
          </code>
          <br></br>
          After this open inspect we can redux option to view the redux state.
          <br></br>
          12. Now add provider (we provide the store to react for use store in
          react application) <br></br>
          <code>import `Provider`` from 'react-redux'</code>
          <br></br>
          13. Now give the provider tag for entire application (main index.js
          file)
          <code> Provider App Provider</code>
          <br></br>
          14. Add our store to provider <br></br>
          <code>provider store='store_name'</code>
          <br></br>
          15.Use the value from redux or state (use this import and config we
          use this data in any page)<br></br> import <b>useselector</b> for use
          the state data or redux store <br></br>{" "}
          <code>import 'useSelector' from 'react-redux';</code> <br></br> get
          the state value like this <br></br>
          <code>const counter = useSelector(state=>state.counter)</code>{" "}
          console.log('COUNTER',counter)<br></br>
          16. Now create the action file against reducer counterAction.js file
          refer setup txt file
          <br></br>
          17.import action file and define all funtions used in the file in
          app.js or where we want<br></br>
          <code>
            import `decrement,increment` from './redux/actions/counterAction';
          </code>
          <br></br>
          18.import <b>usedispatch</b> for send the action to redux then it will
          perform the action in app.js or where we want<br></br>
          <code>import ` useDispatch` from "react-redux";</code>
          <br></br>
          19.config the dispatch <b>const dispatch = useDispatch() </b>
          <br></br>20. dispatch the action like
          <code>
            <button onClick={() => dispatch(increment())}>add</button>
          </code>
        </CardContent>
      </Card>
    </div>
  );
}

export default Redux;
