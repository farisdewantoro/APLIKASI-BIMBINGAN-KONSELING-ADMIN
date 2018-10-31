import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_ADMIN} from './types';

// Login - Get Admin Token

export const loginAdmin = adminData => dispatch =>{
    axios.post('/api/admin/login',adminData)
    .then(res=>{
        // Save to localstorage
        const {token} = res.data;
        // set token to localstorage
        localStorage.setItem('jwtToken',token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentAdmin(decoded));
    })
    .catch(err=>

            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }));
};

// Set logged in admin
export const setCurrentAdmin = (decoded) => {
    return{
        type:SET_CURRENT_ADMIN,
        payload:decoded
    }
}

// Logout admin
export const logoutAdmin = () => dispatch =>{
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth Header for future request
    setAuthToken(false);
    // Set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}));
}