//Dependencies
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

//Styling:
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styling/Theme';
import { getMode } from '../styling/useDarkMode';
import { GlobalStyle } from '../styling/GlobalStyles';

//Components:
import MainLandingPage from './landingPage/MainLandingPage';
import MainloginForm from './loginPage/MainloginForm';
import MainSignupForm from './signupPage/MainSignupForm';
import NavbarLanding from './landingPage/NavbarLanding';

//Authentication Component:
import AuthCheckComponent from './AuthCheckComponent';

//Authentication-Required Components:
import Dashboard from './authComponents/Dashboard';
import DashboardTopNavbar from './authComponents/DashBoardTopNavbar';
import DashboardNavbar from './authComponents/DashboardNavbar';

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
                    <ThemeProvider theme={grabbedTheme}>
                        <GlobalStyle />
                        {location.pathname !== '/login' &&
                            location.pathname !== '/signup' && (
                                <DashboardTopNavbar
                                    modeStatus={changeModeStatus}
                                />
                            )}
                        {location.pathname !== '/login' &&
                            location.pathname !== '/signup' && (
                                <DashboardNavbar />
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
                            <AuthCheckComponent>
                                <Route
                                    exact
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                            </AuthCheckComponent>
                        </Switch>
                    </ThemeProvider>
                </>
            );
        }
    };

    return <>{renderApp()}</>;
});

export default App;
