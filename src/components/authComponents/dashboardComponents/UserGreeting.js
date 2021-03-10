import React from 'react';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

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

const BrowserMainContainer = styled.div`
    display: flex;
    text-align: left;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 1.5em;
`;

const DetailsContainer = styled.div``;

export const MainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 1.8em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 900;
    margin-bottom: 0.2em;
    animation: ${fadeIn} 0.2s ease;
    text-shadow: ${({ theme }) => theme.textShadow};

    @media only screen and (min-width: 375px) {
        font-size: 2em;
    }

    @media screen and (min-width: 414px) {
        font-size: 2.35em;
    }
`;

export const BrowserMainHeader = styled.h1`
    font-family: 'Lato';
    font-size: 3em;
    text-align: left;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 900;
    margin-bottom: 0.2em;
    animation: ${fadeIn} 0.2s ease;
    text-shadow: ${({ theme }) => theme.textShadow};
`;

const UserDetailLabel = styled.h2`
    margin: 0.2em 0;
    font-family: 'Lato';
    font-size: 1em;
    color: ${({ theme }) => theme.UserGreetingColor};
    font-weight: 500;
    white-space: nowrap;
    text-shadow: ${({ theme }) => theme.textShadow};

    @media only screen and (min-width: 375px) {
        font-size: 1.2em;
    }

    @media screen and (min-width: 414px) {
        font-size: 1.35em;
    }
`;

const LogoContainer = styled.div``;

const BrowserLogoContainer = styled.div`
    margin-left: 2em;
`;

export const StyledLogo = styled.img`
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

    @media screen and (min-width: 414px) {
        height: 8em;
        width: 8em;
    }
`;

//Render:

const UserGreeting = ({ firstName, lastName, userName, email, _id }) => {
    const renderUserGreeting = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
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
                </MobileOnlyView>
            );
        } else if (isBrowser) {
            return (
                <BrowserView>
                    <BrowserMainContainer>
                        <DetailsContainer>
                            <BrowserMainHeader>
                                Hello, {firstName}!
                            </BrowserMainHeader>
                            <UserDetailLabel>{email}</UserDetailLabel>
                            <UserDetailLabel>@{userName}</UserDetailLabel>
                        </DetailsContainer>
                        <BrowserLogoContainer>
                            <StyledLogo src={gymjot_logo} alt="gymjot logo" />
                        </BrowserLogoContainer>
                    </BrowserMainContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderUserGreeting()}</>;
};

export default UserGreeting;
