import {
    LOGOUT_ACTION,
    LOGIN_ACTION,
    AUTH_ERROR,
    LOGIN_FAIL
} from '../../../api/type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

function AuthReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case LOGIN_ACTION:
            localStorage.setItem("token",
                action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_ACTION:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: null,
                isLoading: false
            };
        default:
            return state;
    }
};
export default AuthReducer;