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

        dispatch({
            type: USER_GET_EXISTING_DATA,
            payload: response.data.responseObject,
        });
    };
}

export function addNewBench(newBenchValue) {
    return async (dispatch, getState) => {
        const response = await api.post(`/user/addNewBench`, {
            newBenchValue,
        });

        console.log(response);

        dispatch({
            type: USER_ADD_NEW_BENCH,
            payload: response.data.responseObject,
        });
    };
}

export function addNewSquat(newSquatValue) {
    return async (dispatch, getState) => {
        const response = await api.post(`/user/addNewSquat`, {
            newSquatValue,
        });

        console.log(response);

        dispatch({
            type: USER_ADD_NEW_SQUAT,
            payload: response.data.responseObject,
        });
    };
}

export function addNewDeadlift(newDeadliftValue) {
    return async (dispatch, getState) => {
        console.log('action creator deadlift');

        const response = await api.post(`/user/addNewDeadlift`, {
            newDeadliftValue,
        });

        console.log(response);

        dispatch({
            type: USER_ADD_NEW_DEADLIFT,
            payload: response.data.responseObject,
        });
    };
}
