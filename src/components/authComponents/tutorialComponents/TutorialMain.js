import React from 'react';
import Button from '@material-ui/core/Button';
import historyObject from '../../historyObject';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
} from '../configureProgram/ConfigureMain';
import {
    AbortButton,
    CloseIcon,
    AbortLabel,
} from '../runProgramDashboard/MainRunProgram';
import gymjot_logo from '../../../imgs/gymjot_transparent.png';
import { StyledLogo } from '../dashboardComponents/UserGreeting';

const MainContainer = styled.div`
    text-align: center;
`;

const LandingContainer = styled.div`
    margin-top: 2em;
`;

const LogoContainer = styled.div`
    margin: 1.3em 0;
`;

const MainText = styled.h1`
    font-family: 'Lato';
    color: white;
    font-size: 1.6em;
`;

const InfoText = styled.h3`
    font-family: 'Lato';
    color: white;
    font-size: 1em;
`;

const TutorialMain = () => {
    /*
        Should probably have something similar to pyramid main, like a form wizard where the user can look at images and such....

        Should have a state storage with total number of steps. Every info component will recieve a 'currentStep' prop and will only render if the currentStep matches what it's supposed to.

        Or, this can be a long, continuous scroll-down based 

    */

    return (
        <MainContainer>
            <HeaderContainer>
                <Link to="/dashboard">
                    <AbortButton>
                        <CloseIcon />
                        <AbortLabel>Exit</AbortLabel>
                    </AbortButton>
                </Link>
                <FlexWrapper>
                    <MainHeader>Tutorial</MainHeader>
                    <ExerciseHeader>1/2 Steps</ExerciseHeader>
                </FlexWrapper>
            </HeaderContainer>
            <LandingContainer>
                <MainText>Welcome to GymJot Tutorial</MainText>
                <LogoContainer>
                    <StyledLogo src={gymjot_logo} alt="gymjot logo" />
                </LogoContainer>
                <InfoText>We'll show you what we have to offer.</InfoText>
            </LandingContainer>
        </MainContainer>
    );
};

export default TutorialMain;
