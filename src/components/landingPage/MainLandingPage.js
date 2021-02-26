import React, { useState, useEffect } from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';
import { Link } from 'react-router-dom';
import { getJWT } from '../../utils/jwthelper';
import history from '../historyObject';
import gymjot_logo from '../../imgs/gymjot_transparent.png';
import PWAPrompt from 'react-ios-pwa-prompt';

//Styles:
import styled, { keyframes } from 'styled-components';
import Button from '@material-ui/core/Button';

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
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const moveInLogin = keyframes`
    from {
        transform: translateY(80%);
    }

    to {
        transform: translateY(0);
    }
`;

const moveInJoin = keyframes`
    from {
        transform: translateY(120%);
    }

    to {
        transform: translateY(0);
    }
`;

const MobMainContainer = styled.div`
    background: ${(props) => props.theme.background};
    height: 100vh;
`;

const MobWrapper = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
`;

const MobHeaderContainer = styled.div``;

const LogoContainer = styled.div``;

export const StyledMainLogo = styled.img`
    object-fit: cover;
    height: 14em;
    width: 14em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    animation: ${rotateAnimate} 1s ease;
`;

const MobHeader = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 4em;
    font-weight: 900;
    color: ${(props) => props.theme.mainMobHeaderColor};
    animation: ${fadeIn} 0.5s ease;
`;

const MobLabel = styled.label`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1.2em;
    font-weight: 900;
    color: ${(props) => props.theme.mainMobHeaderColor};
    animation: ${fadeIn} 0.5s ease;
`;

const MobButtonContainer = styled.div`
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MobButtonDiv = styled.div`
    margin: 0.5em 0;
`;

const CustomLoginButton = styled.button`
    color: white;
    max-width: 100%;
    min-width: 100%;
    background: #156711;
    border-radius: 2em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 300;
    font-size: 1.2em;
    letter-spacing: 0.1em;
    padding: 0.8em 0;
    border: none;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 5px;
    animation: ${moveInLogin} 0.5s ease;

    &:hover {
        background: #14a84b;
    }
`;

const CustomJoinButton = styled.button`
    color: white;
    max-width: 100%;
    min-width: 100%;
    background: #27303f;
    border-radius: 2em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 300;
    font-size: 1.2em;
    letter-spacing: 0.1em;
    padding: 0.8em 0;
    border: none;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 5px;
    animation: ${moveInJoin} 0.5s ease;

    &:hover {
        background: #5c677b;
    }
`;

//Render:
const MainLandingPage = () => {
    const [statePopup, setStatePopup] = useState(false);

    useEffect(() => {
        //This useEffect serves to check if the user has a JWT. If avaliable --> send to AuthCheck to check to expiration.

        const jwtFromStorage = getJWT();

        if (jwtFromStorage !== undefined && jwtFromStorage !== null) {
            history.push('/dashboard');
        }
    }, []);

    const renderMainPage = () => {
        if (isMobile) {
            return (
                <MobileView>
                    <PWAPrompt
                        promptOnVisit={1}
                        timesToShow={40000}
                        copyClosePrompt="Close"
                        permanentlyHideOnDismiss={false}
                        copyBody="This web application provides mobile app capabilities on Safari. Add it to your home screen for optimal experience."
                    />
                    <MobMainContainer>
                        <MobWrapper>
                            <MobHeaderContainer>
                                <LogoContainer>
                                    <StyledMainLogo
                                        src={gymjot_logo}
                                        alt="gymjot logo"
                                    />
                                </LogoContainer>
                                <MobHeader>GymJot</MobHeader>
                                <MobLabel>Train more efficiently.</MobLabel>
                            </MobHeaderContainer>
                            <MobButtonContainer>
                                <MobButtonDiv>
                                    <Link to="/login">
                                        <CustomLoginButton>
                                            Sign In
                                        </CustomLoginButton>
                                    </Link>
                                </MobButtonDiv>
                                <MobButtonDiv>
                                    <Link to="/signup">
                                        <CustomJoinButton>
                                            Join Us
                                        </CustomJoinButton>
                                    </Link>
                                </MobButtonDiv>
                            </MobButtonContainer>
                        </MobWrapper>
                    </MobMainContainer>
                </MobileView>
            );
        } else {
            return (
                <BrowserView>
                    <MobMainContainer>
                        <MobWrapper>
                            <MobHeaderContainer>
                                <LogoContainer>
                                    <StyledMainLogo
                                        src={gymjot_logo}
                                        alt="gymjot logo"
                                    />
                                </LogoContainer>
                                <MobHeader>GymJot</MobHeader>
                                <MobLabel>
                                    We're Sorry! GymJot does not have browser
                                    support...yet! Try again on a mobile device.
                                </MobLabel>
                            </MobHeaderContainer>
                        </MobWrapper>
                    </MobMainContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderMainPage()}</>;
};

export default MainLandingPage;
