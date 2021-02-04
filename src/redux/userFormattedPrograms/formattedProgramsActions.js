import api from '../../api';
import {
    USER_GET_FORMATTED_PROGRAM,
    USER_EDIT_FORMATTED_PROGRAM,
} from './formattedProgramTypes';

export function getUserFormattedProgram(programId) {
    return async (dispatch) => {
        const response = await api.post('/user/programs/getformattedprogram', {
            programId,
        });

        dispatch({
            type: USER_GET_FORMATTED_PROGRAM,
            payload: response.data,
        });
    };
}

export function submitFormattedProgram(formattedProgramObject, programId) {
    return async (dispatch) => {
        const response = await api.post('/user/programs/editformattedprogram', {
            programId,
            formattedProgramObject,
        });

        dispatch({
            type: USER_EDIT_FORMATTED_PROGRAM,
            payload: response.data.userFormattedProgram.userFormattedPrograms,
        });
    };
}
