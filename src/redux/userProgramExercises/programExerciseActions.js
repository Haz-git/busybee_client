import api from '../../api';
import {
    USER_GET_PROGRAM_EXERCISES,
    USER_ADD_PROGRAM_EXERCISE,
    USER_DELETE_PROGRAM_EXERCISE,
    USER_ADD_REST,
    USER_DELETE_REST,
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
    };
}

export function addNewProgramExercise(
    programId,
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
                sets,
                reps,
                programExerciseName,
                weight,
                unit,
            }
        );

        dispatch({
            type: USER_GET_PROGRAM_EXERCISES,
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
            type: USER_GET_PROGRAM_EXERCISES,
            payload: response.data.userProgramExercises,
        });

        if (response) {
            callback(true);
        }
    };
}
