import React from 'react';

//Styles:
import styled, { keyframes } from 'styled-components';
import gymjot_logo from '../../../imgs/gymjot_transparent.png';

const rotateAnimate = keyframes`
    from {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        opacity: .1;

    }

    to {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        opacity: 1;
    }
`;

const fadeIn = keyframes`
    from {
        transform: translateY(-20%);
        -webkit-transform: rotate(-20%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        -webkit-transform: rotate(0);
        opacity: 1;
    }
`;

const MainContainer = styled.div`
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5em;

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
    animation: ${fadeIn} 0.2s ease;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;

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
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;

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
    animation: ${rotateAnimate} 0.3s ease;

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
