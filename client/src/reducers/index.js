import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import muridReducer from './muridReducer';
import rapotReducer from './rapotReducer';
export default combineReducers({
    auth:authReducer,
    errors: errorReducer,
    murids:muridReducer,
    rapot:rapotReducer
});