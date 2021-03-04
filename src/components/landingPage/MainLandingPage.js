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
import gymjot_splash from '../../imgs/gymjot_kettle_splash_sqush.jpg';
import PWAPrompt from 'react-ios-pwa-prompt';

//Styles:
import styled, { keyframes } from 'styled-components';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import Button from '@material-ui/core/Button';

const InfoIcon = styled(InfoCircle)`
    height: 1.3em;
    width: 1.3em;
    color: white;
    margin: 0 0.2em;
`;

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

const DeskUserCredentialsContainer = styled.div`
    height: 40em;
    width: 60em;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 10em 10em; */
    margin: 0 auto;
`;

const DeskSplashScreenContainer = styled.div``;

const DeskSplashScreenImg = styled.img`
    object-fit: cover;
    height: 35em;
    width: 25em;
    border-radius: 1em;
    margin: 1em 1em;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
`;

const DeskLoginFieldsContainer = styled.div`
    height: 35em;
    width: 25em;
    max-width: 25em;
    border-radius: 1em;
    border: none;
    padding: 1em 1em;
    margin: 1em 1em;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
`;

const DeskStyledMainLogo = styled.img`
    object-fit: cover;
    height: 10em;
    width: 10em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 3px;
    animation: ${rotateAnimate} 1s ease;
`;

const DeskHeader = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 3em;
    font-weight: 900;
    color: ${(props) => props.theme.mainMobHeaderColor};
    animation: ${fadeIn} 0.5s ease;
`;

const DeskLabel = styled.label`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 1.5em;
    font-weight: 900;
    color: ${(props) => props.theme.mainMobHeaderColor};
    animation: ${fadeIn} 0.5s ease;
`;

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

const DeskButtonContainer = styled.div`
    padding: 0.7em 0.7em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 0;
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

const DeskButtonDiv = styled.div`
    margin: 0.4em 0;
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

const CustomDeskLoginButton = styled(CustomLoginButton)`
    padding: 0.4em;
    letter-spacing: 0.05em;
    font-size: 1.4em;
    text-shadow: rgba(0, 0, 0, 1) 0px 1.5px 1.5px;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
        transform: scale(1.05);
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

const CustomDeskJoinButton = styled(CustomJoinButton)`
    padding: 0.4em;
    letter-spacing: 0.05em;
    font-size: 1.4em;
    text-shadow: rgba(0, 0, 0, 1) 0px 1.5px 1.5px;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const DeskInfoContainer = styled.div`
    margin: 4.5em 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeskInfoText = styled.p`
    font-family: 'Lato', sans-serif, helvetica;
    font-size: 1.1em;
    font-weight: 400;
    color: white;
    animation: ${fadeIn} 0.5s ease;
    margin: 0 0.2em;
`;

const CopyrightContainer = styled.div`
    position: fixed;
    margin-bottom: 1em;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const CopyrightText = styled.p`
    font-family: 'Lato', sans-serif, helvetica;
    font-size: 1em;
    font-weight: 400;
    color: white;
    animation: ${fadeIn} 0.5s ease;
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
                        copyBody="This web application provides mobile app capabilities on Safari Browser. Add it to your home screen for optimal experience."
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
                            <DeskUserCredentialsContainer>
                                <DeskSplashScreenContainer>
                                    <DeskSplashScreenImg
                                        src={gymjot_splash}
                                        alt="gymjot splash screen"
                                    />
                                </DeskSplashScreenContainer>
                                <DeskLoginFieldsContainer>
                                    <LogoContainer>
                                        <DeskStyledMainLogo
                                            src={gymjot_logo}
                                            alt="gymjot logo"
                                        />
                                    </LogoContainer>
                                    <DeskHeader>GymJot</DeskHeader>
                                    <DeskLabel>
                                        Train more efficiently.
                                    </DeskLabel>
                                    <DeskButtonContainer>
                                        <DeskButtonDiv>
                                            <Link to="/login">
                                                <CustomDeskLoginButton>
                                                    Sign In
                                                </CustomDeskLoginButton>
                                            </Link>
                                        </DeskButtonDiv>
                                        <DeskButtonDiv>
                                            <Link to="/signup">
                                                <CustomDeskJoinButton>
                                                    Join Us
                                                </CustomDeskJoinButton>
                                            </Link>
                                        </DeskButtonDiv>
                                    </DeskButtonContainer>
                                    <DeskInfoContainer>
                                        <InfoIcon />
                                        <DeskInfoText>
                                            This app is mobile optimized.
                                        </DeskInfoText>
                                    </DeskInfoContainer>
                                </DeskLoginFieldsContainer>
                            </DeskUserCredentialsContainer>
                        </MobWrapper>
                    </MobMainContainer>
                    <CopyrightContainer>
                        <CopyrightText>
                            <span>&#169;</span> 2021 Created By - Harry Zhou
                        </CopyrightText>
                    </CopyrightContainer>
                </BrowserView>
            );
        }
    };

    return <>{renderMainPage()}</>;
};

export default MainLandingPage;
