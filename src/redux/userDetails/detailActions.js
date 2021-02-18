import api from '../../api';
import { USER_GET_EXISTING_DETAILS } from './detailTypes';

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
