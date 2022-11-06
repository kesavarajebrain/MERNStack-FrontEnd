export const loginAdmin = (data) =>{
    return {
        type:"LOGIN",
        payload:data
    }
}

export const logoutAdmin = () =>{
    return {
        type:"LOGOUT",
        // payload:data
    }
}