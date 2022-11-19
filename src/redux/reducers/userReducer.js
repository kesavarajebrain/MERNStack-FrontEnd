const userReducer = (
  state = { allUsers: null, editedUser: null, v: null },
  action
) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        // allusers is the name of array inside the user obj in redux state check redux console
        // users:{
        //     allUsers:[]
        // }
        allUsers: action.payload,
        editedUser: null,
      };
    case "CREATED_USER":
      return {
        allUsers: [action.payload, ...state.allUsers],
      };
    case "DELETE_USER":
      return {
        allUsers: state.allUsers.filter(
          (user) => user._id !== action.payload._id
        ),
      };
    case "EDIT_USER":
      return {
        allUsers: [...state.allUsers],
        editedUser: action.payload,
      };
    case "UPDATE_USER":
      return{
        allUsers:state.allUsers.filter((element) => {
          if(element._id == action.payload._id) {
           console.log(element)
           console.log(state.allUsers[element._id])
           state.allUsers[element._id] = element
          }
      })
      }
    default:
      return state;
  }
};

export default userReducer;
