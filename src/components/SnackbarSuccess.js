import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import {clearSnackbar} from "../redux/actions/snackbarAction";
//icon
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
function SnackbarSuccess() {
  const dispatch = useDispatch();
  function handleClose() {
    dispatch(clearSnackbar());
  }
  const { successSnackbarMessage, successSnackbarOpen } = useSelector(
    (state) => state.snackBar
  );
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={successSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar">
          <DoneAllIcon/>
          {successSnackbarMessage}
        </span>
      }
      action={[
        <CloseIcon
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
        </CloseIcon>,
      ]}
    />
  );
}

export default SnackbarSuccess;
