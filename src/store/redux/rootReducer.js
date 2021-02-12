import {combineReducers} from "redux";
import authReducer from './action/authReducers';
import userReducers from './userReducers';

 const rootReducer = combineReducers({
auth:authReducer,
user:userReducers
});
export default rootReducer;