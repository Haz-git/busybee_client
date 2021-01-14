import api from '../../api';
import {
    USER_ADD_NEW_BENCH,
    USER_ADD_NEW_DEADLIFT,
    USER_ADD_NEW_SQUAT,
    USER_GET_EXISTING_DATA,
} from './powerLiftTypes';

export function getUserLiftingData() {
    return async (dispatch, getState) => {
        const response = await api.get(`/user/getMainPLStats`);

        console.log(response);

        // dispatch({
        //     type: USER_ADD_NEW_BENCH,
        //     payload: response.data,
        // });
    };
}

export function addNewBench(newBenchValue) {
    return async (dispatch, getState) => {
        const {
            auth: {
                user: { _id },
            },
        } = getState();

        const response = await api.post(`/user/addNewBench`, {
            _id,
            newBenchValue,
        });

        console.log(response);

        // dispatch({
        //     type: USER_ADD_NEW_BENCH,
        //     payload: response.data,
        // });
    };
}

export function addNewSquat(newSquatValue) {
    return async (dispatch, getState) => {
        const {
            auth: {
                user: { _id },
            },
        } = getState();

        const response = await api.post(`/user/addNewSquat`, {
            _id,
            newSquatValue,
        });

        console.log(response);

        // dispatch({
        //     type: USER_ADD_NEW_SQUAT,
        //     payload: response.data,
        // });
    };
}

export function addNewDeadlift(newDeadliftValue) {
    return async (dispatch, getState) => {
        const {
            auth: {
                user: { _id },
            },
        } = getState();

        const response = await api.post(`/user/addNewDeadlift`, {
            _id,
            newDeadliftValue,
        });

        console.log(response);

        // dispatch({
        //     type: USER_ADD_NEW_DEADLIFT,
        //     payload: response.data,
        // });
    };
}
