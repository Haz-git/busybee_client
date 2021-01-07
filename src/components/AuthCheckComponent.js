import React, { Component } from 'react';
import { getJWT } from '../utils/jwthelper';
import history from './historyObject';
import jsonwebtoken from 'jsonwebtoken';

class AuthenticatedComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        };
    }

    componentDidMount() {
        // Use helper function to grab JWT from localstorage.
        let isExpired = false;
        const jwt = getJWT();

        //If there's no JWT present in the localstorage, no JWT must be sent over from server, meaning that login is wrong. Push the user back to the login page.
        if (!jwt) {
            history.push('/login');
        } else {
            //After checking if there is a JWT in the first place, we must check if the JWT is expired.
            const jsonWebToken = localStorage.getItem('jwt');
            const formattedToken = jsonWebToken.split(' ')[1].slice(0, -1);
            const decodedToken = jsonwebtoken.decode(formattedToken, {
                complete: true,
            });

            const dateNow = new Date();

            if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
                isExpired = true;
                history.push('/login');
                alert('Your session has expired. Please log in to continue.');
            }
        }

        //If the user's JWT is present: set the React state to 'temp' instead of undefined.
        this.setState({
            user: 'temp',
        });
    }

    render() {
        //If the react state is undefined, return a small statement. Else, return the app dashboard.

        if (this.state.user === undefined) {
            return (
                <div>
                    <h1>
                        The route you are accessing is protected. Please log in.
                    </h1>
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}

export default AuthenticatedComponents;
