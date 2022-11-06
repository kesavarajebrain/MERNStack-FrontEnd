export const showSuccessSnackbar = (message) => {
    return {
      type: "SNACKBAR_SUCCESS", 
      payload:message
    };
  };
  
  export const clearSnackbar = () => {
    return {
     type: "SNACKBAR_CLEAR",
     payload:null
    };
  };