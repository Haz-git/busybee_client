import { USER_LOGOUT } from './userLogoutTypes';
import historyObject from '../../components/historyObject';

//Utility function designed to help user sign out. Should remove JWT from localstorage + persisted items, and push user to the main login page....

export function userLogout() {
    return async (dispatch) => {
        //Of course, the removal of the JWT doesn't mean that this JWT cannot be used to contact the API. The weakness in this method is that anyone can take note of the JWT before logging out, and still use it to contact the API. A possible way to circumvent this issue is to create a blacklist serverside, and when the user logs out, the active JWT is stored in the blacklist until expiration.
        //We may implement that in the near future.

        //We'll first delete the JWT from localstorage:
        localStorage.removeItem('jwt');

        //Then we'll remove the persist:root item:

        localStorage.removeItem('persist:root');

        //Purge stored redux-state:

        //We will not use localStorage.clear() because we want to keep the theme.

        dispatch({
            type: USER_LOGOUT,
        });

        //Push user to login page:
        historyObject.push('/login');
    };
}
