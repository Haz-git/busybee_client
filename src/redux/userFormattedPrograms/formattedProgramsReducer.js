import {
    USER_GET_FORMATTED_PROGRAM,
    USER_EDIT_FORMATTED_PROGRAM,
} from './formattedProgramTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_FORMATTED_PROGRAM:
            return { ...state, formattedProgram: action.payload };
        case USER_EDIT_FORMATTED_PROGRAM:
            return { ...state, formattedProgram: action.payload };
        default:
            return state;
    }
};
