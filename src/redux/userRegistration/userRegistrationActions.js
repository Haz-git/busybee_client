import api from '../../api';
import history from '../../components/historyObject';
import { USER_REGISTRATION } from './userRegistrationTypes';

const userRegistration = (
    formValues,
    snackbarCallback,
    buttonCallback
) => async (dispatch) => {
    //Sending redux-form values to Atlas:

    const response = await api.post('/user/signup', { ...formValues });

    //There is currently no dispatch for this function in Redux. Perhaps later we will need something like that.

    if (response && snackbarCallback && buttonCallback) {
        //if response.ok === true, then the user's account has been created.
        snackbarCallback(true);
        buttonCallback(false);
    }
};

export default userRegistration;
