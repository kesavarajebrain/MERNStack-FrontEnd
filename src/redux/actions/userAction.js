export const setUsers = (data) =>{
    return {
        type:"SET_USERS",
        payload:data
    }
}

export const createdUser = (data) =>{
    return {
        type:"CREATED_USER",
        payload:data
    }
}

export const deleteSingleUser = (data) =>{
    return {
        type:"DELETE_USER",
        payload:data
    }
}

export const editSingleUser = (data) =>{
    return {
        type:"EDIT_USER",
        payload:data
    }
}

export const updateSingleUser = (data) =>{
    return {
        type:"UPDATE_USER",
        payload:data
    }
}
