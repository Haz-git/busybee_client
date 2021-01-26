import api from '../../api';
import {
    USER_GET_EXISTING_PROGRAMS,
    USER_ADD_NEW_PROGRAM,
    USER_EDIT_PROGRAM,
    USER_DELETE_PROGRAM,
} from './userProgramTypes';

export function getUserProgramData() {
    return async (dispatch) => {
        const response = await api.get('/user/programs');

        dispatch({
            type: USER_GET_EXISTING_PROGRAMS,
            payload: response.data.userPrograms,
        });
    };
}
