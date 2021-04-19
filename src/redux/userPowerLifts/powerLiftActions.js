import api from '../../api';
import {
    USER_ADD_NEW_BENCH,
    USER_ADD_NEW_DEADLIFT,
    USER_ADD_NEW_SQUAT,
    USER_GET_EXISTING_DATA,
} from './powerLiftTypes';

export function getUserLiftingData() {
    return async (dispatch) => {
        const response = await api.get(`/user/getMainPLStats`);

        dispatch({
            type: USER_GET_EXISTING_DATA,
            payload: response.data.responseObject,
        });
    };
}

export function addNewBench(
    newBenchValue,
    snackbarCallback,
    buttonCallback,
    modalCallback
) {
    return async (dispatch) => {
        const response = await api.post(`/user/addNewBench`, {
            newBenchValue,
        });

        dispatch({
            type: USER_ADD_NEW_BENCH,
            payload: response.data.responseObject,
        });

        if (response && snackbarCallback && buttonCallback && modalCallback) {
            buttonCallback(false);
            modalCallback(false);
            snackbarCallback(true);
        }
    };
}

export function addNewSquat(
    newSquatValue,
    snackbarCallback,
    buttonCallback,
    modalCallback
) {
    return async (dispatch) => {
        const response = await api.post(`/user/addNewSquat`, {
            newSquatValue,
        });

        dispatch({
            type: USER_ADD_NEW_SQUAT,
            payload: response.data.responseObject,
        });

        if (response && snackbarCallback && buttonCallback && modalCallback) {
            buttonCallback(false);
            modalCallback(false);
            snackbarCallback(true);
        }
    };
}

export function addNewDeadlift(
    newDeadliftValue,
    snackbarCallback,
    buttonCallback,
    modalCallback
) {
    return async (dispatch) => {
        const response = await api.post(`/user/addNewDeadlift`, {
            newDeadliftValue,
        });

        dispatch({
            type: USER_ADD_NEW_DEADLIFT,
            payload: response.data.responseObject,
        });

        if (response && snackbarCallback && buttonCallback && modalCallback) {
            buttonCallback(false);
            modalCallback(false);
            snackbarCallback(true);
        }
    };
}
