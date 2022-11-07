const spinnerReducer = (state={setOpen:false},  action ) => {
  switch (action.type) {
    case "LOAD_SPIN":
      return {
        setOpen:true
      };
    case "HIDE_SPIN":
      return {
        setOpen:false
      };
    default:
      return state;
  }
};

export default spinnerReducer