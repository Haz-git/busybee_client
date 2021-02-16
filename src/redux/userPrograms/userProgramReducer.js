import {
    USER_GET_EXISTING_PROGRAMS,
    USER_ADD_NEW_PROGRAM,
    USER_EDIT_PROGRAM,
    USER_DELETE_PROGRAM,
    USER_ADD_TO_PROGRAM_COUNT,
} from './userProgramTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_EXISTING_PROGRAMS:
            return { ...state, programs: action.payload };
        case USER_ADD_NEW_PROGRAM:
            return { ...state, programs: action.payload };
        case USER_EDIT_PROGRAM:
            return { ...state, programs: action.payload };
        case USER_DELETE_PROGRAM:
            return { ...state, programs: action.payload };
        case USER_ADD_TO_PROGRAM_COUNT:
            return { ...state, programs: action.payload };
        default:
            return state;
    }
};
