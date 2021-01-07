import { USER_LOG_IN } from './userLoginTypes';
import api from '../../api';

const userLogin = (formValues) => async (dispatch) => {
    const response = await api.post('/user/login', { ...formValues });

    console.log(response);
};

export default userLogin;
