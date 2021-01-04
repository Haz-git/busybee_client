//Dependencies
import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './historyObject';

//Styling:
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

//Components:
import MainLandingPage from './landingPage/MainLandingPage';
import MainloginForm from './loginPage/MainloginForm';
import MainSignupForm from './signupPage/MainSignupForm';
import NavbarLanding from './landingPage/NavbarLanding';

//Render

const App = () => {
    return (
        <>
            <Router history={history}>
                <NavbarLanding />
                <Switch>
                    <Route exact path="/" component={MainLandingPage} />
                    <Route exact path="/login" component={MainloginForm} />
                    <Route exact path="/signup" component={MainSignupForm} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
