import { USER_LOG_IN } from './userLoginTypes';
import history from '../../components/historyObject';
import api from '../../api';

const userLogin = (formValues) => async (dispatch) => {
    let response;

    try {
        response = await api.post('/user/login', { ...formValues });
    } catch (err) {
        //If there is an error, that must mean the user's verification credentials are wrong.
        if (err) {
            const errorFlag = true;
            return errorFlag;
        }
    }

    //There is currently no dispatch for this function in Redux. Perhaps later we will need something like that.

    if (response) {
        try {
            localStorage.setItem('jwt', JSON.stringify(response.data.token));

            history.push('/dashboard');
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                localStorage.clear();
                localStorage.setItem('jwt', response.data.token);
            } else {
                alert(`I'm Sorry! There seems to be a problem logging you in.`);
                console.log(e);
            }
        }
    }

    dispatch({
        type: USER_LOG_IN,
        payload: response.data,
    });
};

export default userLogin;
