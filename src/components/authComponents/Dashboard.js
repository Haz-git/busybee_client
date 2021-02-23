import React, { useEffect, useState } from 'react';

//Redux Actions:
import { connect } from 'react-redux';
import { getUserProgramData } from '../../redux/userPrograms/userProgramActions';
import { getUserStatData } from '../../redux/userStats/userStatActions';
import { getUserExistingDetails } from '../../redux/userDetails/detailActions';

//Components:
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
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

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

                if (
                    boolStatData === true &&
                    boolProgramData === true &&
                    boolUserDetails === true
                ) {
                    setIsLoaded(boolProgramData);
                }
            };

            getUserExistingProgramData();
        } else if (
            user.user !== undefined &&
            stats.stats !== undefined &&
            programs.programs !== undefined
        ) {
            //This means that either the user has changed (logging into a different user) --> Or the component has been re-mounted.
            setIsLoaded(true);
        }
    }, []);

    const renderLoadingIfNoUserDetails = () => {
        if (
            user.user !== undefined &&
            user.user !== null &&
            isLoaded !== false
        ) {
            const { firstName, lastName, userName, email } = user.user;
            return (
                <MainContainer>
                    <UserGreeting
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        userName={userName}
                    />
                    <UserPowerStats />
                    <UserTopPrograms userPrograms={programs.programs} />
                    <UserRecentStats userStats={stats.stats} />
                </MainContainer>
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
})(Dashboard);
