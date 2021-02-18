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
    newLastName
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
    };
}

export function userEditEmail(requestType, newEmail) {
    return async (dispatch) => {
        const response = await api.post('/user/settings/edituserdetails', {
            requestType,
            newEmail,
        });

        dispatch({
            type: USER_EDIT_EMAIL,
            payload: response.data.user,
        });
    };
}

export function userEditPassword(
    requestType,
    newPassword,
    newPasswordConfirm,
    currentPassword
) {
    return async (dispatch) => {
        const response = await api.post('/user/settings/edituserdetails', {
            requestType,
            newPassword,
            newPasswordConfirm,
            currentPassword,
        });

        dispatch({
            type: USER_EDIT_PASSWORD,
            payload: response.data.user,
        });
    };
}
