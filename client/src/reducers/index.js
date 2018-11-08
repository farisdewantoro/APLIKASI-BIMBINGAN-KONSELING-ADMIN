import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import muridReducer from './muridReducer';
export default combineReducers({
    auth:authReducer,
    errors: errorReducer,
    murids:muridReducer
    
});