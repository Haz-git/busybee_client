import api from '../../api';

import {
    USER_RETRIEVE_STATS,
    USER_ADD_NEW_STAT,
    USER_EDIT_STAT,
    USER_DELETE_STAT,
} from './userStatTypes';

export function getUserStatData() {
    return async (dispatch, getState) => {
        const response = await api.get('/user/getallstats');

        dispatch({
            type: USER_RETRIEVE_STATS,
            payload: response.data.userSavedStats,
        });

        //true flag for isLoaded state in MainStats.js:

        return true;
    };
}

export function addNewStat(exerciseName, callback, tutorialStatId) {
    return async (dispatch) => {
        const response = await api.post('/user/addnewstat', {
            exerciseName,
            tutorialStatId,
        });

        dispatch({
            type: USER_ADD_NEW_STAT,
            payload: response.data.userSavedStats,
        });

        if (
            response &&
            callback &&
            tutorialStatId === undefined &&
            tutorialStatId === null
        ) {
            callback(true);
        }
    };
}

export function deleteStat(exerciseId, callback) {
    return async (dispatch) => {
        //For delete axios requests, data is possible in request bodies, but the following format is required.

        const response = await api.delete('/user/deletestat', {
            data: { exerciseId },
        });

        dispatch({
            type: USER_DELETE_STAT,
            payload: response.data.userSavedStats,
        });

        if (response) {
            callback(true);
        }
    };
}

export function editStat(exerciseId, newExerciseName, callback) {
    return async (dispatch) => {
        const response = await api.patch('/user/editstat', {
            exerciseId,
            newExerciseName,
        });

        dispatch({
            type: USER_EDIT_STAT,
            payload: response.data.userSavedStats,
        });

        if (response) {
            callback(true);
        }
    };
}
