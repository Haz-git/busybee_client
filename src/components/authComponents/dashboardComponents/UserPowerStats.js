import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Components:
import UserPowerStatCard from './UserPowerStatCard';

//Imgs:
import benchpress from '../../../imgs/benchpress256.png';
import squat from '../../../imgs/squat256.png';
import deadlift from '../../../imgs/deadlift256.png';

//Actions:
import {
    addNewBench,
    addNewSquat,
    addNewDeadlift,
    getUserLiftingData,
} from '../../../redux/userPowerLifts/powerLiftActions';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    margin-top: 1em;
    text-align: left;
`;

const MainHeader = styled.h2`
    font-family: 'Lato';
    font-size: 0.9em;
    color: ${({ theme }) => theme.UserPowerHeaderColor};
    font-weight: 900;
`;

const StatCardContainer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: center;
    align-content: center;
`;

//Render:

const UserPowerStats = ({ getUserLiftingData }) => {
    useEffect(() => {
        getUserLiftingData();
    }, []);

    return (
        <>
            <MainContainer>
                <MainHeader>Your main lifts</MainHeader>
                <StatCardContainer>
                    <UserPowerStatCard
                        header="Deadlift"
                        img={deadlift}
                        addAction={addNewDeadlift}
                    />
                    <UserPowerStatCard
                        header="Squat"
                        img={squat}
                        addAction={addNewSquat}
                    />
                    <UserPowerStatCard
                        header="Bench"
                        img={benchpress}
                        addAction={addNewBench}
                    />
                </StatCardContainer>
            </MainContainer>
        </>
    );
};

export default connect(null, { getUserLiftingData })(UserPowerStats);
