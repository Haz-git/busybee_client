import {
    USER_RETRIEVE_STATS,
    USER_ADD_NEW_STAT,
    USER_EDIT_STAT,
    USER_DELETE_STAT,
} from './userStatTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_RETRIEVE_STATS:
            return { ...state, stats: action.payload };
        case USER_ADD_NEW_STAT:
            return { ...state, stats: action.payload };
        case USER_EDIT_STAT:
            return { ...state, stats: action.payload };
        case USER_DELETE_STAT:
            return { ...state, stats: action.payload };
        default:
            return state;
    }
};
