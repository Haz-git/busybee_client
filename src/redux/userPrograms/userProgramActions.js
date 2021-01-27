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

export function addNewProgram(programName, programDesc) {
    return async (dispatch) => {
        const response = await api.post(`/user/addnewprogram`, {
            programName,
            programDesc,
        });

        dispatch({
            type: USER_ADD_NEW_PROGRAM,
            payload: response.data.userPrograms,
        });
    };
}

export function editExistingProgram(programId, programName, programDesc) {
    return async (dispatch) => {
        const response = await api.patch(`/user/editprogram`, {
            programId,
            programName,
            programDesc,
        });

        dispatch({
            type: USER_EDIT_PROGRAM,
            payload: response.data.userPrograms,
        });
    };
}

export function deleteExistingProgram(programId) {
    return async (dispatch) => {
        const response = await api.delete(`/user/editprogram`, {
            data: { programId },
        });

        dispatch({
            type: USER_DELETE_PROGRAM,
            payload: response.data.userPrograms,
        });
    };
}
