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
        allUsers:[state.allUsers.map((element) => {
          if(element._id == action.payload._id) {
            // state.allUsers.map((i)=>{
            //   state.allUsers[i].name = 'hgfdghj'
            //   state.allUsers[i].email = 'mbvbbvkjn ';
            //   state.allUsers[i].mobileNumber = 'mbvbbvkjn ';
            //   state.allUsers[i].updatedAt = 'mbvbbvkjn ';
            //   state.allUsers[i].createdAt = 'mbvbbvkjn ';
            //   state.allUsers[i].admin_id = 'mbvbbvkjn ';
            // })
            // console.log('32',action.payload)
            // console.log('1',element)
            // console.log('2',element._id)
            // console.log('3',action.payload._id)
            // console.log('4',state.allUsers[index] )
          
          }
      })]
        // allUsers: state.allUsers.map((u) => {
        //   console.log('****',u)
        //   console.log('action',action)
        //   console.log('action',u._id === action.payload._id)
        //   console.log('&&&&&&&', state.allUsers)
        //   // console.log('&&&&&&&', state.allUsers[user].name)
        //   if (u._id == action.payload._id) {
        //   }
        // })
      }
    default:
      return state;
  }
};

export default userReducer;
