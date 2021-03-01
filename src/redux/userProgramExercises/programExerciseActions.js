import api from '../../api';
import {
    USER_GET_PROGRAM_EXERCISES,
    USER_ADD_PROGRAM_EXERCISE,
    USER_DELETE_PROGRAM_EXERCISE,
    USER_ADD_REST,
    USER_DELETE_REST,
    USER_ADD_REST_BETWEEN_SETS,
    USER_ADD_PYRAMID_SET,
} from './programExerciseTypes';

export function getUserProgramExerciseData(programId) {
    return async (dispatch) => {
        const response = await api.post('/user/programs/getprogramexercises', {
            programId,
        });

        dispatch({
            type: USER_GET_PROGRAM_EXERCISES,
            payload: response.data.userProgramExercises,
        });

        //this returns true for the loader flag in ConfigureMain:
        return true;
    };
}

export function addNewProgramExercise(
    programId,
    programExerciseType,
    sets,
    reps,
    programExerciseName,
    weight,
    unit,
    callback
) {
    return async (dispatch) => {
        const response = await api.post(
            '/user/programs/addnewprogramexercise',
            {
                programId,
                programExerciseType,
                sets,
                reps,
                programExerciseName,
                weight,
                unit,
            }
        );

        dispatch({
            type: USER_ADD_PROGRAM_EXERCISE,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}

export function deleteProgramExercise(programId, programExerciseId, callback) {
    return async (dispatch) => {
        const response = await api.delete(
            `/user/programs/deleteprogramexercise`,
            {
                data: { programId, programExerciseId },
            }
        );

        dispatch({
            type: USER_DELETE_PROGRAM_EXERCISE,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}

export function addNewRestPeriod(
    programId,
    programExerciseType,
    restLengthMinute,
    restLengthSecond,
    callback
) {
    return async (dispatch) => {
        const response = await api.post(`/user/programs/addnewrestperiod`, {
            programId,
            programExerciseType,
            restLengthMinute,
            restLengthSecond,
        });

        dispatch({
            type: USER_ADD_REST,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}

export function addNewRestPeriodBetweenSets(
    programId,
    exerciseId,
    restLengthMinute,
    restLengthSecond,
    callback
) {
    return async (dispatch) => {
        const response = await api.post(
            `/user/programs/addrestperiodbetweensets`,
            {
                programId,
                exerciseId,
                restLengthMinute,
                restLengthSecond,
            }
        );

        dispatch({
            type: USER_ADD_REST_BETWEEN_SETS,
            payload: response.data.userProgramExercises,
        });

        // if (response) {
        //     callback(true);
        // }
    };
}

export function deleteRestPeriod(programId, restId, callback) {
    return async (dispatch) => {
        const response = await api.delete(
            '/user/programs/deleteprogramrestperiod',
            {
                data: {
                    programId,
                    restId,
                },
            }
        );

        dispatch({
            type: USER_DELETE_REST,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}

export function addNewPyramidSet(
    programId,
    programExerciseName,
    setObjectsArray,
    callback
) {
    return async (dispatch) => {
        const response = await api.post(
            `/user/programs/addnewprogrampyramidset`,
            {
                programId,
                programExerciseName,
                setObjectsArray,
            }
        );

        dispatch({
            type: USER_ADD_PYRAMID_SET,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}
