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

        //IsLoaded flag for BlueprintLayoutSelectionPage:

        return true;
    };
}

export function submitFormattedProgram(
    formattedProgramObject,
    programId,
    callback
) {
    return async (dispatch) => {
        const response = await api.post('/user/programs/editformattedprogram', {
            programId,
            formattedProgramObject,
        });

        console.log(formattedProgramObject);

        dispatch({
            type: USER_EDIT_FORMATTED_PROGRAM,
            payload: response.data.userFormattedProgram.userFormattedPrograms,
        });

        if (response && callback) {
            callback(true);
        }
    };
}
