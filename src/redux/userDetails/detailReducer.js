import { USER_GET_EXISTING_DETAILS } from './detailTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_EXISTING_DETAILS:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
