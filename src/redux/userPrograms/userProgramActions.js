import api from '../../api';
import {
    USER_GET_EXISTING_PROGRAMS,
    USER_ADD_NEW_PROGRAM,
    USER_EDIT_PROGRAM,
    USER_DELETE_PROGRAM,
    USER_ADD_TO_PROGRAM_COUNT,
} from './userProgramTypes';

export function getUserProgramData() {
    return async (dispatch) => {
        const response = await api.get('/user/programs');

        dispatch({
            type: USER_GET_EXISTING_PROGRAMS,
            payload: response.data.userPrograms,
        });

        //true flag for isLoaded state in MainPrograms.js:

        return true;
    };
}

export function addToUserProgramCount(programId) {
    return async (dispatch) => {
        const response = await api.post(`/user/increaseprogramruncount`, {
            programId,
        });

        dispatch({
            type: USER_ADD_TO_PROGRAM_COUNT,
            payload: response.data.userPrograms,
        });
    };
}

export function addNewProgram(
    programName,
    programDesc,
    snackbarCallback,
    tutorialId,
    buttonCallback,
    modalCallback
) {
    return async (dispatch) => {
        let response;

        if (tutorialId !== undefined && tutorialId !== null) {
            response = await api.post(`/user/addnewprogram`, {
                programName,
                programDesc,
                tutorialId,
            });
        } else {
            response = await api.post(`/user/addnewprogram`, {
                programName,
                programDesc,
            });
        }

        dispatch({
            type: USER_ADD_NEW_PROGRAM,
            payload: response.data.userPrograms,
        });

        if (
            response &&
            snackbarCallback &&
            buttonCallback &&
            modalCallback &&
            (tutorialId === undefined || tutorialId === null)
        ) {
            buttonCallback(false);
            modalCallback(false);
            snackbarCallback(true);
        }
    };
}

export function editExistingProgram(
    programId,
    newProgramName,
    newProgramDesc,
    snackbarCallback
) {
    return async (dispatch) => {
        const response = await api.patch(`/user/editprogram`, {
            programId,
            newProgramName,
            newProgramDesc,
        });

        dispatch({
            type: USER_EDIT_PROGRAM,
            payload: response.data.userPrograms,
        });

        if (response) {
            snackbarCallback(true);
        }
    };
}

export function deleteExistingProgram(programId, snackbarCallback) {
    return async (dispatch) => {
        const response = await api.delete(`/user/deleteprogram`, {
            data: { programId },
        });

        dispatch({
            type: USER_DELETE_PROGRAM,
            payload: response.data.userPrograms,
        });

        if (response) {
            snackbarCallback(true);
        }
    };
}

export function addProgramTimeLength(programId, totalTime) {
    return async (dispatch) => {
        const response = await api.post('/user/addnewprogramtimelength', {
            programId,
            totalTime,
        });

        dispatch({
            type: USER_EDIT_PROGRAM,
            payload: response.data.userPrograms,
        });
    };
}
