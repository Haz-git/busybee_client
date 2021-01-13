import React from 'react';

//Components:
import UserPowerStatCard from './UserPowerStatCard';

//Imgs:
import benchpress from '../../../imgs/benchpress256.png';
import squat from '../../../imgs/squat256.png';
import deadlift from '../../../imgs/deadlift256.png';

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
`;

//Render:

const UserPowerStats = () => {
    return (
        <>
            <MainContainer>
                <MainHeader>Your main lifts</MainHeader>
                <StatCardContainer>
                    <UserPowerStatCard header="Deadlift" img={deadlift} />
                    <UserPowerStatCard header="Squat" img={squat} />
                    <UserPowerStatCard header="Bench" img={benchpress} />
                </StatCardContainer>
            </MainContainer>
        </>
    );
};

export default UserPowerStats;
