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
        allUsers: [state.allUsers.filter((u) => {
          console.log('****',u)
          console.log('action',action)
          console.log('action',u._id === action.payload._id)
          console.log('&&&&&&&', state.allUsers)
          console.log('&&&&&&&', state.allUsers[0])
          // console.log('&&&&&&&', state.allUsers[user].name)
          if (u._id == action.payload._id) {
            u.name = 'test' ;
          }
        })]
      }
    default:
      return state;
  }
};

export default userReducer;