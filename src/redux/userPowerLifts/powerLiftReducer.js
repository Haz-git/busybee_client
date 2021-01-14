import {
    USER_ADD_NEW_BENCH,
    USER_ADD_NEW_DEADLIFT,
    USER_ADD_NEW_SQUAT,
    USER_GET_EXISTING_DATA,
} from './powerLiftTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_EXISTING_DATA:
            return { ...state, powerLiftStats: action.payload };
        case USER_ADD_NEW_BENCH:
            return { ...state, powerLiftStats: action.payload };
        case USER_ADD_NEW_DEADLIFT:
            return { ...state, powerLiftStats: action.payload };
        case USER_ADD_NEW_SQUAT:
            return { ...state, powerLiftStats: action.payload };
        default:
            return state;
    }
};
