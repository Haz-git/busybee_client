import React, { useEffect, useState } from 'react';

//Redux Actions:
import { connect } from 'react-redux';
import { getUserProgramData } from '../../redux/userPrograms/userProgramActions';
import { getUserStatData } from '../../redux/userStats/userStatActions';
import {
    getUserExistingDetails,
    changeIsNewUserValue,
    getIsNewUserValue,
} from '../../redux/userDetails/detailActions';

//Components:
import GlobalSnackbar from './dashboardComponents/GlobalSnackbar';
import TutorialModal from './tutorialComponents/TutorialModal';
import UserGreeting from './dashboardComponents/UserGreeting';
import UserPowerStats from './dashboardComponents/UserPowerStats';
import UserTopPrograms from './dashboardComponents/UserTopPrograms';
import UserRecentStats from './dashboardComponents/UserRecentStats';
import { LoadingContainer } from '../authComponents/configureProgram/ConfigureMain';
import CustomLoadingDots from '../authComponents/configureProgram/CustomLoadingDots';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    text-align: center;
    padding: 1em 1em;
    margin-bottom: 5em;
`;

//Render:

const Dashboard = ({
    user,
    programs,
    stats,
    getUserProgramData,
    getUserStatData,
    getUserExistingDetails,
    changeIsNewUserValue,
    getIsNewUserValue,
    startAppTour,
    closeAppTour,
}) => {
    //Loading State:
    const [isLoaded, setIsLoaded] = useState(false);

    //Tutorial Modal State:
    const [stateTutorialModal, setStateTutorialModal] = useState(false);

    //Snackbars State:
    const [stateBenchSnackbar, setStateBenchSnackbar] = useState(false);
    const [stateDeadliftSnackbar, setStateDeadliftSnackbar] = useState(false);
    const [stateSquatSnackbar, setStateSquatSnackbar] = useState(false);

    useEffect(() => {
        if (
            user.user === undefined ||
            stats.stats === undefined ||
            programs.programs === undefined
        ) {
            const getUserExistingProgramData = async () => {
                const boolProgramData = await getUserProgramData();
                const boolStatData = await getUserStatData();
                const boolUserDetails = await getUserExistingDetails();
                const isNewUserValue = await getIsNewUserValue();
                if (
                    boolStatData === true &&
                    boolProgramData === true &&
                    boolUserDetails === true &&
                    isNewUserValue !== undefined &&
                    isNewUserValue !== null
                ) {
                    setIsLoaded(boolProgramData);
                    setStateTutorialModal(isNewUserValue);
                }
            };

            getUserExistingProgramData();
        } else if (
            user.user !== undefined &&
            stats.stats !== undefined &&
            programs.programs !== undefined
        ) {
            //This means that either the user has changed (logging into a different user) --> Or the component has been re-mounted.
            setStateTutorialModal(user.user.isNewUser);
            setIsLoaded(true);
        }
    }, []);

    //Snackbar callbacks:

    const handleBenchSnackbar = (bool) => {
        setStateBenchSnackbar(bool);
    };

    const handleDeadliftSnackbar = (bool) => {
        setStateDeadliftSnackbar(bool);
    };

    const handleSquatSnackbar = (bool) => {
        setStateSquatSnackbar(bool);
    };

    //Snackbar close controllers:

    const closeBenchSnackbar = () => {
        setStateBenchSnackbar(false);
    };

    const closeDeadliftSnackbar = () => {
        setStateDeadliftSnackbar(false);
    };

    const closeSquatSnackbar = () => {
        setStateSquatSnackbar(false);
    };

    const closeTutorialModal = () => {
        changeIsNewUserValue(false);
        setStateTutorialModal(false);

        //Needs to send dispatch here to change value of isNewUser to false;
    };

    const sendUserToTutorialPage = () => {
        //This should send the callback to initial the tour...
        setStateTutorialModal(false);
        startAppTour(true);
    };

    const renderLoadingIfNoUserDetails = () => {
        if (
            user.user !== undefined &&
            user.user !== null &&
            isLoaded !== false
        ) {
            const { firstName, lastName, userName, email } = user.user;

            return (
                <>
                    <MainContainer>
                        <UserGreeting
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            userName={userName}
                        />
                        <UserPowerStats
                            benchSnackbarCallback={handleBenchSnackbar}
                            squatSnackbarCallback={handleSquatSnackbar}
                            deadliftSnackbarCallback={handleDeadliftSnackbar}
                        />
                        <UserTopPrograms userPrograms={programs.programs} />
                        <UserRecentStats userStats={stats.stats} />
                    </MainContainer>
                    <TutorialModal
                        openBoolean={stateTutorialModal}
                        closeFunction={closeTutorialModal}
                        buttonSubmitFunction={sendUserToTutorialPage}
                        firstName={firstName}
                    />
                    <GlobalSnackbar
                        openFunction={stateBenchSnackbar}
                        closeFunction={closeBenchSnackbar}
                        autoHideDuration={3000}
                        anchorOriginVertical="top"
                        anchorOriginHorizontal="center"
                        alertSeverity="success"
                        alertMessage="Your new bench has been saved."
                    />
                    <GlobalSnackbar
                        openFunction={stateDeadliftSnackbar}
                        closeFunction={closeDeadliftSnackbar}
                        autoHideDuration={3000}
                        anchorOriginVertical="top"
                        anchorOriginHorizontal="center"
                        alertSeverity="success"
                        alertMessage="Your new deadlift has been saved."
                    />
                    <GlobalSnackbar
                        openFunction={stateSquatSnackbar}
                        closeFunction={closeSquatSnackbar}
                        autoHideDuration={3000}
                        anchorOriginVertical="top"
                        anchorOriginHorizontal="center"
                        alertSeverity="success"
                        alertMessage="Your new squat has been saved."
                    />
                </>
            );
        } else {
            return (
                <LoadingContainer>
                    <CustomLoadingDots />
                </LoadingContainer>
            );
        }
    };

    return <>{renderLoadingIfNoUserDetails()}</>;
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        programs: state.programs,
        stats: state.stats,
    };
};

export default connect(mapStateToProps, {
    getUserProgramData,
    getUserStatData,
    getUserExistingDetails,
    changeIsNewUserValue,
    getIsNewUserValue,
})(Dashboard);
