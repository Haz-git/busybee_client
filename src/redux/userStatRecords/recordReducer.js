import {
    USER_RETRIEVE_RECORD,
    USER_ADD_NEW_RECORD,
    USER_EDIT_RECORD,
    USER_DELETE_RECORD,
} from './recordTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_RETRIEVE_RECORD:
            return { ...state, stats: action.payload };
        case USER_ADD_NEW_RECORD:
            return { ...state, stats: action.payload };
        case USER_EDIT_RECORD:
            return { ...state, stats: action.payload };
        case USER_DELETE_RECORD:
            return { ...state, stats: action.payload };
        default:
            return state;
    }
};
