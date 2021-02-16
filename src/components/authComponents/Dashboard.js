import React, { useEffect, useState } from 'react';

//Redux Actions:
import { connect } from 'react-redux';
import { getUserProgramData } from '../../redux/userPrograms/userProgramActions';

//Components:
import UserGreeting from './dashboardComponents/UserGreeting';
import UserPowerStats from './dashboardComponents/UserPowerStats';
import UserTopPrograms from './dashboardComponents/UserTopPrograms';
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

const Dashboard = ({ user, programs, getUserProgramData }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getUserExistingProgramData = async () => {
            const bool = await getUserProgramData();
            setIsLoaded(bool);
        };

        getUserExistingProgramData();
    }, []);

    const renderLoadingIfNoUserDetails = () => {
        if (
            user.userLogIn !== undefined &&
            user.userLogIn !== null &&
            isLoaded !== false
        ) {
            const {
                firstName,
                lastName,
                userName,
                email,
                _id,
            } = user.userLogIn.user;
            return (
                <MainContainer>
                    <UserGreeting
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        userID={_id}
                        userName={userName}
                    />
                    <UserPowerStats />
                    <UserTopPrograms userPrograms={programs.programs} />
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
        user: state.auth,
        programs: state.programs,
    };
};

export default connect(mapStateToProps, { getUserProgramData })(Dashboard);
