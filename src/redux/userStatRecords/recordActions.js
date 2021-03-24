import api from '../../api';
import {
    USER_RETRIEVE_RECORD,
    USER_ADD_NEW_RECORD,
    USER_EDIT_RECORD,
    USER_DELETE_RECORD,
} from './recordTypes';

//Action Creators for records:

export function retrieveRecord(exerciseId) {
    return async (dispatch) => {
        const response = await api.post('/user/stat/getallrecords', {
            exerciseId,
        });

        console.log(response);

        dispatch({
            type: USER_RETRIEVE_RECORD,
            payload: response.data.statRecords,
        });

        return true;
    };
}

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
            payload: response.data.userUpdatedRecords,
        });

        //Creating a snackbar to notify new record add:

        if (response) {
            callback(true);
        }
    };
}

export function deleteRecord(exerciseId, recordId, callback) {
    return async (dispatch) => {
        const response = await api.delete('/user/stat/deleterecord', {
            data: {
                exerciseId,
                recordId,
            },
        });

        dispatch({
            type: USER_DELETE_RECORD,
            payload: response.data.userUpdatedRecords,
        });

        //Creating a snackbar to notify user that a record is deleted:

        if (response) {
            callback(true);
        }
    };
}

export function editRecord(
    exerciseId,
    recordId,
    sets,
    reps,
    weight,
    unit,
    callback
) {
    return async (dispatch) => {
        const response = await api.patch('/user/stat/editrecord', {
            exerciseId,
            recordId,
            sets,
            reps,
            weight,
            unit,
        });

        dispatch({
            type: USER_EDIT_RECORD,
            payload: response.data.userUpdatedRecords,
        });

        //Creating a snackbar to notify user that record is edited:

        if (response) {
            callback(true);
        }
    };
}
