//Dependencies
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

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

//Authentication Component:
import AuthCheckComponent from './AuthCheckComponent';

//Authentication-Required Components:
import Dashboard from './authComponents/Dashboard';
import TutorialMain from './authComponents/tutorialComponents/TutorialMain';
import MainNewsBoard from './authComponents/newsBoard/MainNewsBoard';
import DashboardNavbar from './authComponents/DashboardNavbar';
import MainPrograms from './authComponents/programDashboard/MainPrograms';
import MainStats from './authComponents/statsDashboard/MainStats';
import MainSettings from './authComponents/settingsDashboard/MainSettings';
import ConfigureMain from './authComponents/configureProgram/ConfigureMain';
import ExerciseSelectorPage from './authComponents/configureProgram/ExerciseSelectorPage';
import BlueprintLayoutSelectionPage from './authComponents/configureProgram/BlueprintLayoutSelectionPage';
import MainRunProgram from './authComponents/runProgramDashboard/MainRunProgram';
import PyramidMain from './authComponents/configureProgram/pyramidSetForm/PyramidMain';

//Device-containers:

// const AppBrowserContainer = styled.div`
//     //Margin for navbar.
//     /* margin-left: 8% !important;
//     margin-right: 8% !important; */
//     padding-left: 8%;
//     padding-right: 8%;
//     position: relative;
// `;

const AppBrowserContainer = styled.div`
    /* display: block;
    margin: 0 auto;
    max-width: 85em; */
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 0 auto;
    max-width: 85em;
`;

// const AppBrowserContentContainer = styled.div`
//     position: relative;
//     margin-left: 14em;
//     margin-right: 14em;
//     padding-top: 1em;
// `;

const AppBrowserNavigationContainer = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
`;

const AppBrowserNewsContainer = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
`;

const AppBrowserContentContainer = styled.div`
    position: relative;
    max-width: 55em;
    width: 55em;
    /* margin: 0 auto; */
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
`;

//Render

const App = withRouter(({ location }) => {
    //'dark' state value is temporary, should be set to '' on proper light/dark mode switching.
    const [appTheme, setAppTheme] = useState('dark');

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

    const grabbedTheme = appTheme === 'light' ? darkTheme : darkTheme;

    //For only now, we'll make the availiable theme Dark. We'll work on the light theme later.

    const renderApp = () => {
        if (isBrowser) {
            return (
                <BrowserView>
                    <ThemeProvider theme={grabbedTheme}>
                        <GlobalStyle />
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
                                {/* {location.pathname !== '/login' &&
                                    location.pathname !== '/signup' &&
                                    location.pathname !== '/' &&
                                    location.pathname !==
                                        '/newUserTutorial' && (
                                        <DashboardNavbar />
                                    )} */}
                                <AppBrowserContainer>
                                    <AppBrowserNavigationContainer>
                                        {location.pathname !== '/login' &&
                                            location.pathname !== '/signup' &&
                                            location.pathname !== '/' &&
                                            location.pathname !==
                                                '/newUserTutorial' && (
                                                <DashboardNavbar />
                                            )}
                                    </AppBrowserNavigationContainer>
                                    <AppBrowserContentContainer>
                                        <Route
                                            exact
                                            path="/dashboard"
                                            component={Dashboard}
                                        />
                                        <Route
                                            exact
                                            path="/newUserTutorial"
                                            component={TutorialMain}
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
                                                    modeStatus={
                                                        changeModeStatus
                                                    }
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
                                            component={
                                                BlueprintLayoutSelectionPage
                                            }
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
                                    </AppBrowserContentContainer>
                                    <AppBrowserNewsContainer>
                                        {location.pathname !== '/login' &&
                                            location.pathname !== '/signup' &&
                                            location.pathname !== '/' &&
                                            location.pathname !==
                                                '/newUserTutorial' && (
                                                <MainNewsBoard />
                                            )}
                                    </AppBrowserNewsContainer>
                                </AppBrowserContainer>
                            </AuthCheckComponent>
                        </Switch>
                    </ThemeProvider>
                </BrowserView>
            );
        } else if (isMobileOnly) {
            return (
                <MobileOnlyView>
                    <ThemeProvider theme={grabbedTheme}>
                        <GlobalStyle />
                        {location.pathname !== '/login' &&
                            location.pathname !== '/signup' &&
                            location.pathname !== '/' &&
                            location.pathname !== '/newUserTutorial' && (
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
                                <Route
                                    exact
                                    path="/newUserTutorial"
                                    component={TutorialMain}
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
                </MobileOnlyView>
            );
        }
    };

    return <>{renderApp()}</>;
});

export default App;
