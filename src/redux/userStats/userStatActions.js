import api from '../../api';

import {
    USER_RETRIEVE_STATS,
    USER_ADD_NEW_STAT,
    USER_EDIT_STAT,
    USER_DELETE_STAT,
    USER_ADD_NEW_RECORD,
    USER_EDIT_RECORD,
    USER_DELETE_RECORD,
} from './userStatTypes';

export function getUserStatData() {
    return async (dispatch, getState) => {
        const response = await api.get('/user/getallstats');

        dispatch({
            type: USER_RETRIEVE_STATS,
            payload: response.data.userSavedStats,
        });
    };
}

export function addNewStat(exerciseName) {
    return async (dispatch) => {
        const response = await api.post('/user/addnewstat', { exerciseName });

        dispatch({
            type: USER_ADD_NEW_STAT,
            payload: response.data.userSavedStats,
        });
    };
}

export function deleteStat(exerciseId) {
    return async (dispatch) => {
        //For delete axios requests, data is possible in request bodies, but the following format is required.

        const response = await api.delete('/user/deletestat', {
            data: { exerciseId },
        });

        dispatch({
            type: USER_DELETE_STAT,
            payload: response.data.userSavedStats,
        });
    };
}

export function editStat(exerciseId, newExerciseName) {
    return async (dispatch) => {
        const response = await api.patch('/user/editstat', {
            exerciseId,
            newExerciseName,
        });

        dispatch({
            type: USER_EDIT_STAT,
            payload: response.data.userSavedStats,
        });
    };
}

//Action Creators for records:

export function addRecord(exerciseId, sets, reps, weight, unit, callback) {
    return async (dispatch) => {
        const response = await api.post('/user/stat/addnewrecord', {
            exerciseId,
            sets,
            reps,
            weight,
            unit,
        });

        dispatch({
            type: USER_ADD_NEW_RECORD,
            payload: response.data.userSavedStats,
        });

        console.log(typeof callback);

        //Creating a snackbar to notify new record add:

        if (response) {
            callback(true);
        }
    };
}

export function deleteRecord(exerciseId, recordId) {
    return async (dispatch) => {
        const response = await api.delete('/user/stat/deleterecord', {
            data: {
                exerciseId,
                recordId,
            },
        });

        console.log(response);

        // dispatch({
        //     type: USER_DELETE_RECORD,
        //     payload: response.data.userSavedStats,
        // });
    };
}

export function editRecord(exerciseId, recordId, sets, reps, weight, unit) {
    return async (dispatch) => {
        const response = await api.patch('/user/stat/editrecord', {
            exerciseId,
            recordId,
            sets,
            reps,
            weight,
            unit,
        });

        console.log(response);

        // dispatch({
        //     type: USER_EDIT_RECORD,
        //     payload: response.data.userSavedStats,
        // });
    };
}
