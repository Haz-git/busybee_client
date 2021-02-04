import {
    USER_GET_PROGRAM_EXERCISES,
    USER_ADD_PROGRAM_EXERCISE,
    USER_DELETE_PROGRAM_EXERCISE,
    USER_ADD_REST,
    USER_DELETE_REST,
    USER_ADD_REST_BETWEEN_SETS,
} from './programExerciseTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_PROGRAM_EXERCISES:
            return { ...state, programs: action.payload };
        case USER_ADD_PROGRAM_EXERCISE:
            return { ...state, programs: action.payload };
        case USER_DELETE_PROGRAM_EXERCISE:
            return { ...state, programs: action.payload };
        case USER_ADD_REST:
            return { ...state, programs: action.payload };
        case USER_DELETE_REST:
            return { ...state, programs: action.payload };
        case USER_ADD_REST_BETWEEN_SETS:
            return { ...state, programs: action.payload };
        default:
            return state;
    }
};
