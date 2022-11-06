const authReducer = (state = { token: null ,userLog :null }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.jwtToken,
        userLog: action.payload.data
      };
    case "LOGOUT":
      return {
        token: null,
        userLog: null
      };
    default:
      return state
  }
};

export default authReducer;
