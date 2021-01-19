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

        console.log(response);

        dispatch({
            type: USER_RETRIEVE_STATS,
            payload: response.data.userSavedStats,
        });
    };
}
