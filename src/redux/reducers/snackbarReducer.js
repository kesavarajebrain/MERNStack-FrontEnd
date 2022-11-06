const snackbarReducer = (state = { }, action) => {
    switch (action.type) {
      case "SNACKBAR_SUCCESS":
        return {
            ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.payload
        };
      case "SNACKBAR_CLEAR":
        return {
            ...state,
            successSnackbarOpen: false,
            errorSnackbarOpen: false,
            infoSnackbarOpen: false
        };
      default:
        return state
    }
  };
  
  export default snackbarReducer;
  