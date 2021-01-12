import { USER_REGISTRATION } from '../userRegistration/userRegistrationTypes';
import { USER_LOG_IN } from '../userLogin/userLoginTypes';

const initialState = {};

//This reducer handles user login and user sign up authentication.

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTRATION:
            return { ...state, userSignUp: action.payload };
        case USER_LOG_IN:
            return { ...state, userLogIn: action.payload };
        default:
            return state;
    }
};
