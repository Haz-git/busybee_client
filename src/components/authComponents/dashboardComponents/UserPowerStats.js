import React from 'react';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    text-align: left;
`;

const MainHeader = styled.h2`
    font-family: 'Lato';
    font-size: 0.85em;
    color: ${({ theme }) => theme.UserPowerHeaderColor};
    font-weight: 400;
`;

//Render:

const UserPowerStats = () => {
    return (
        <>
            <MainContainer>
                <MainHeader>Your progress</MainHeader>
            </MainContainer>
        </>
    );
};

export default UserPowerStats;
