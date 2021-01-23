import React from 'react';

//Styles:
import styled from 'styled-components';
import gymjot_logo from '../../../imgs/gymjot_transparent.png';

const MainContainer = styled.div`
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;

    //Min-width = @ 375 or greater width, changes occur:

    /* @media only screen and (min-width: 414px) {
        display: inline-block;
    } */
`;

const DetailsContainer = styled.div``;

export const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.8em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 900;
    margin-bottom: 0.2em;

    @media only screen and (min-width: 375px) {
        font-size: 2em;
    }
`;

const UserDetailLabel = styled.h2`
    margin: 0.2em 0;
    font-family: 'Lato';
    font-size: 1em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 500;
    white-space: nowrap;

    @media only screen and (min-width: 375px) {
        font-size: 1.2em;
    }
`;

const LogoContainer = styled.div``;

const StyledLogo = styled.img`
    object-fit: cover;
    height: 6.7em;
    width: 6.7em;
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.LogoShadow};

    @media only screen and (min-width: 375px) {
        height: 7.2em;
        width: 7.2em;
    }
`;

//Render:

const UserGreeting = ({ firstName, lastName, userName, email, _id }) => {
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
