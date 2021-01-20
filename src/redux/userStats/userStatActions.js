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
            type: USER_ADD_NEW_STAT,
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
