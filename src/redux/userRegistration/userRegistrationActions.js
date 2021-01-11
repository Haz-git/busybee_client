import api from '../../api';
import history from '../../components/historyObject';
import { USER_REGISTRATION } from './userRegistrationTypes';

const userRegistration = (formValues, callback) => async (dispatch) => {
    //Sending redux-form values to Atlas:

    const response = await api.post('/user/signup', { ...formValues });

    //We'll feint a dispatch for the time being. There is no reducer set to collect this data.
    // dispatch({
    //     type: USER_REGISTRATION,
    //     payload: response.data,
    // });
    if (response) {
        console.log(response);
        //if response.ok === true, then the user's account has been created.
        callback(true);
    }

    // history.push('/login');
};

export default userRegistration;
