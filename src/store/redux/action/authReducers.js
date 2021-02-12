const initialState = {isAuthUser:false, userId:0, userName:""}

function AuthReducer(
    state = initialState,
    action
)
{
    switch(action.type){
        case "LOGOUT_ACTION":
            localStorage.clear();
            return initialState;
        case "LOGIN_ACTION":
            return{
                ...state,
                isAuthUser:true,
                userId:0,
                userName:""
            };
            default:
                return state;
    }
};
export default AuthReducer;