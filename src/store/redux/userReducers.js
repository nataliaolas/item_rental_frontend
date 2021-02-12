const initialState = {userId:0}

export default function userReducer(
    state=initialState,
    action
)
{
    switch(action){
        case "USER_ID_ACTION":
            return {
                ...state,
                userId:0
            };
            default:
                return state;
    }
}