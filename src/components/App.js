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
import DashboardNavbar from './authComponents/DashboardNavbar';
import MainPrograms from './authComponents/programDashboard/MainPrograms';
import MainStats from './authComponents/statsDashboard/MainStats';
import MainSettings from './authComponents/settingsDashboard/MainSettings';
import ConfigureMain from './authComponents/configureProgram/ConfigureMain';
import ExerciseSelectorPage from './authComponents/configureProgram/ExerciseSelectorPage';
import BlueprintLayoutSelectionPage from './authComponents/configureProgram/BlueprintLayoutSelectionPage';
import MainRunProgram from './authComponents/runProgramDashboard/MainRunProgram';
import PyramidMain from './authComponents/configureProgram/pyramidSetForm/PyramidMain';

//Render

const App = withRouter(({ location }) => {
    const [appTheme, setAppTheme] = useState('');

    useEffect(() => {
        async function initialState() {
            const initialModeValue = await getMode();
            setAppTheme(initialModeValue);
        }

        initialState();
    }, []);

    const changeModeStatus = (modeValue) => {
        //This callback function is passed down to UserSettings, where the toggle button is.
        setAppTheme(modeValue);
    };

    const grabbedTheme = appTheme === 'light' ? lightTheme : darkTheme;

    const renderApp = () => {
        if (appTheme === '') {
            return null;
        } else {
            return (
                <>
                    <ThemeProvider theme={grabbedTheme}>
                        <GlobalStyle />
                        {location.pathname !== '/login' &&
                            location.pathname !== '/signup' &&
                            location.pathname !== '/' && <DashboardNavbar />}
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
                                <Route
                                    exact
                                    path="/programs"
                                    component={MainPrograms}
                                />
                                <Route
                                    exact
                                    path="/stats"
                                    component={MainStats}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    render={(props) => (
                                        <MainSettings
                                            {...props}
                                            modeStatus={changeModeStatus}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/programs/configure/:name/:id"
                                    component={ConfigureMain}
                                />
                                <Route
                                    exact
                                    path="/programs/configure/select/:name/:id"
                                    component={ExerciseSelectorPage}
                                />
                                <Route
                                    exact
                                    path="/programs/configure/blueprint/:name/:id"
                                    component={BlueprintLayoutSelectionPage}
                                />
                                <Route
                                    exact
                                    path="/programs/configure/select/pyramid/:name/:id"
                                    component={PyramidMain}
                                />
                                <Route
                                    exact
                                    path="/runprogram/:name/:id"
                                    component={MainRunProgram}
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
