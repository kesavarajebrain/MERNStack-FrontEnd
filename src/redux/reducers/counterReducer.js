const counterReducer = (state={msg:'Redux Counter Example', number:0},action) =>{
    //reducer have initial state and action as the parameter

    // write swicth for perform the corresponding action
    switch(action.type){
        case "INCREMENT":
            return {
                msg:'Increment Action',
                number:state.number + 1
            };

        case "DECREMENT":
            return {
                msg:'Decrement Action',
                number:state.number - 1
            };
            
         default:
            return state;   

    }
}

// export the reducer to several places
export default counterReducer;