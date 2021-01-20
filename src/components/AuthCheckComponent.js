import React, { Component } from 'react';
import { getJWT } from '../utils/jwthelper';
import history from './historyObject';
import jsonwebtoken from 'jsonwebtoken';
import styled from 'styled-components';

//Styles:

//Pushing app container upwards to make space for dashboard bottom navbar.

const MainAppContainer = styled.div`
    padding-bottom: 2.8em;
`;

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
        } else if (jwt) {
            //After checking if there is a JWT in the first place, we must check if the JWT is expired.
            const jsonWebToken = localStorage.getItem('jwt');
            const formattedToken = jsonWebToken.split(' ')[1].slice(0, -1);
            const decodedToken = jsonwebtoken.decode(formattedToken, {
                complete: true,
            });

            const dateNow = new Date();

            if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
                //The JWT is expired: Remove the JWT.
                localStorage.removeItem('jwt');
                isExpired = true;
                alert('Your session has expired. Please log in to continue.');
                history.push('/login');
            } else {
                //The JWT is valid and not expired:

                history.push('/dashboard');
            }

            //If the JWT is availiable and has not expired, then push the user to the dashboard:
        }

        //We need additional verification-- server sided. I was thinking that we could send a direct request to the API here, verify and send 'confirmed' or failed to procced to render the child components.

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

        return (
            <>
                <MainAppContainer>{this.props.children}</MainAppContainer>
            </>
        );
    }
}

export default AuthenticatedComponents;
