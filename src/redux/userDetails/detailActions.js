import api from '../../api';
import {
    USER_GET_EXISTING_DETAILS,
    USER_EDIT_GENERAL_INFO,
    USER_EDIT_EMAIL,
    USER_EDIT_PASSWORD,
} from './detailTypes';

export function getUserExistingDetails() {
    return async (dispatch) => {
        const response = await api.get('/user/settings/getuserdetails');

        dispatch({
            type: USER_GET_EXISTING_DETAILS,
            payload: response.data.user,
        });

        if (response) {
            return true;
        }
    };
}

//Although it is possible to write a single dispatch function for all user detail edits, three are created below for increased readability.

export function userEditGeneralInfo(
    requestType,
    newUserName,
    newFirstName,
    newLastName,
    callback
) {
    return async (dispatch) => {
        const response = await api.post('/user/settings/edituserdetails', {
            requestType,
            newUserName,
            newFirstName,
            newLastName,
        });

        dispatch({
            type: USER_EDIT_GENERAL_INFO,
            payload: response.data.user,
        });

        if (response) {
            callback(true);
        }
    };
}

export function userEditEmail(requestType, newEmail, callback) {
    return async (dispatch) => {
        const response = await api.post('/user/settings/edituserdetails', {
            requestType,
            newEmail,
        });

        dispatch({
            type: USER_EDIT_EMAIL,
            payload: response.data.user,
        });

        if (response) {
            callback(true);
        }
    };
}

export function userEditPassword(
    requestType,
    newPassword,
    newPasswordConfirm,
    currentPassword,
    errorCallback,
    callback
) {
    return async (dispatch) => {
        const response = await api
            .post('/user/settings/edituserdetails', {
                requestType,
                newPassword,
                newPasswordConfirm,
                currentPassword,
            })
            .catch((err) => {
                console.log(err);

                //Notifies error callback if error is present (probably cause current password is not matching)
                errorCallback(true);
            });

        //If there is no error:
        errorCallback(false);

        //No need for a dispatch.

        callback(true);
    };
}
