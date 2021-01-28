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
