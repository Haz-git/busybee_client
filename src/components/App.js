//Dependencies
import React, { useState, useEffect } from 'react';
import { Switch, Router, Route, withRouter } from 'react-router-dom';
import history from './historyObject';

//Styling:
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styling/Theme';
import { getMode } from '../styling/useDarkMode';
import { GlobalStyle } from '../styling/GlobalStyles';

//Components:
import MainLandingPage from './landingPage/MainLandingPage';
import MainloginForm from './loginPage/MainloginForm';
import MainSignupForm from './signupPage/MainSignupForm';
import NavbarLanding from './landingPage/NavbarLanding';

//Render

const App = withRouter(({ location }) => {
    const [appTheme, setAppTheme] = useState('');

    useEffect(() => {
        async function initialState() {
            const initialModeValue = await getMode();
            setAppTheme(initialModeValue);
            console.log(appTheme);
        }

        initialState();
    }, []);

    const changeModeStatus = (modeValue) => {
        //This callback function is passed down to UserSettings, where the toggle button is.
        setAppTheme(modeValue);
    };

    const grabbedTheme =
        appTheme === 'light' || appTheme === '' ? lightTheme : darkTheme;

    const renderApp = () => {
        if (appTheme === '') {
            return null;
        } else {
            return (
                <>
                    <GlobalStyle />
                    <ThemeProvider theme={grabbedTheme}>
                        {location.pathname !== '/login' &&
                            location.pathname !== '/signup' && (
                                <NavbarLanding modeStatus={changeModeStatus} />
                            )}
                        <Switch>
                            <Route exact path="/" component={MainLandingPage} />
                            <Route
                                exact
                                path="/login"
                                component={MainloginForm}
                            />
                            <Route
                                exact
                                path="/signup"
                                component={MainSignupForm}
                            />
                        </Switch>
                    </ThemeProvider>
                </>
            );
        }
    };

    return <>{renderApp()}</>;
});

export default App;
