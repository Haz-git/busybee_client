import React from 'react';

//Styles:
import styled from 'styled-components';
import gymjot_logo from '../../../imgs/gymjot_transparent.png';

const MainContainer = styled.div`
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;
`;

const DetailsContainer = styled.div``;

const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.5em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 400;
    margin-bottom: 0.2em;
`;

const UserDetailLabel = styled.h2`
    margin: 0.2em 0;
    font-family: 'Lato';
    font-size: 0.7em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 500;
`;

const LogoContainer = styled.div``;

const StyledLogo = styled.img`
    object-fit: cover;
    height: 5.3em;
    width: 5.3em;
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.LogoShadow};
`;

//Render:

const UserGreeting = ({ firstName, lastName, userName, email, _id }) => {
    console.log(userName);

    return (
        <>
            <MainContainer>
                <DetailsContainer>
                    <MainHeader>Hello, {firstName}!</MainHeader>
                    <UserDetailLabel>{email}</UserDetailLabel>
                    <UserDetailLabel>@{userName}</UserDetailLabel>
                </DetailsContainer>
                <LogoContainer>
                    <StyledLogo src={gymjot_logo} alt="gymjot logo" />
                </LogoContainer>
            </MainContainer>
        </>
    );
};

export default UserGreeting;
