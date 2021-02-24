import {
    USER_GET_EXISTING_DETAILS,
    USER_EDIT_GENERAL_INFO,
    USER_EDIT_EMAIL,
    USER_EDIT_PASSWORD,
    USER_CHANGE_ISNEWUSER_VALUE,
} from './detailTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_EXISTING_DETAILS:
            return { ...state, user: action.payload };
        case USER_EDIT_GENERAL_INFO:
            return { ...state, user: action.payload };
        case USER_EDIT_EMAIL:
            return { ...state, user: action.payload };
        case USER_EDIT_PASSWORD:
            return { ...state, user: action.payload };
        case USER_CHANGE_ISNEWUSER_VALUE:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
