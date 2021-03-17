import React from 'react';
import Button from '@material-ui/core/Button';
import historyObject from '../../historyObject';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeIsNewUserValue } from '../../../redux/userDetails/detailActions';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import BackButtonHeader from '../dashboardComponents/BackButtonHeader';

import DashboardInfo from './DashboardInfo';
import ProgramInfo from './ProgramInfo';
import StatLogAndSettingsInfo from './StatLogAndSettingsInfo';

import styled from 'styled-components';
import {
    CloseIcon,
    BrowserCloseIcon,
} from '../runProgramDashboard/MainRunProgram';
import gymjot_logo from '../../../imgs/gymjot_transparent.png';
import { StyledLogo } from '../dashboardComponents/UserGreeting';

const MainContainer = styled.div`
    text-align: center;
`;

export const MainTutorialContainer = styled.div`
    display: block;
    text-align: center;
    margin: 1em 0;
`;

const LandingContainer = styled.div`
    margin-top: 2em;
`;

const TutorialCardContainer = styled.div`
    margin: 0 1em;
`;

const LogoContainer = styled.div`
    margin: 1.3em 0;
`;

const MainText = styled.h1`
    font-family: 'Lato';
    color: white;
    font-size: 1.6em;
`;

export const TutorialHeader = styled.h2`
    font-family: 'Lato';
    /* color: #fdbc3d; */
    color: white;
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 0.8em;
    font-weight: 900;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const InfoText = styled.h3`
    font-family: 'Lato';
    color: white;
    font-size: 1em;
`;

export const TutorialImage = styled.img`
    object-fit: contain;
    /* height: 16em; */
    width: 100%;
    border-radius: 1em;
    box-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;
    border: 1px solid #fdbc3d;
`;

export const TutorialDescriptionContainer = styled.div`
    text-align: left;
    padding: 0.3em 0.8em;
    margin: 0.5em 0;
`;

export const TutorialInfoText = styled.p`
    color: white;
    font-size: 1em;
    font-weight: 900;
    hyphens: auto;
    word-break: break-word;
    margin-bottom: 0.4em;
    text-shadow: rgba(0, 0, 0, 0.9) 0px 3px 5px;
`;

const TutorialEndText = styled.h2`
    color: #156711;
    font-size: 1.5em;
    font-weight: 900;
    hyphens: auto;
    word-break: break-word;
    margin-bottom: 0.4em;
    text-shadow: rgba(0, 0, 0, 0.9) 0px 3px 5px;
`;

const TutorialEndLabel = styled.h3`
    color: #90130c;
    font-size: 1em;
    font-weight: 900;
    hyphens: auto;
    word-break: break-word;
    margin-bottom: 0.4em;
    text-shadow: rgba(0, 0, 0, 0.9) 0px 3px 5px;
`;

const TutorialMain = ({ changeIsNewUserValue }) => {
    /*
        Should probably have something similar to pyramid main, like a form wizard where the user can look at images and such....

        Should have a state storage with total number of steps. Every info component will recieve a 'currentStep' prop and will only render if the currentStep matches what it's supposed to.

        Or, this can be a long, continuous scroll-down based 

    */

    const changeIsNewUserValueAndNavigateToDashboard = () => {
        const confirmStatus = window.confirm(
            'You will not be able to return to this tutorial after leaving. Are you sure you want to exit?'
        );

        const disableTutorial = async () => {
            const isValueChanged = await changeIsNewUserValue(false);

            if (isValueChanged === true) {
                historyObject.push('/dashboard');
            }
        };

        if (confirmStatus === true) {
            disableTutorial();
        }
    };

    return (
        <MainContainer>
            <BackButtonHeader
                onClickFunc={changeIsNewUserValueAndNavigateToDashboard}
                previousButtonLabel="Exit"
                buttonColor="#90130c"
                previousButtonIcon={
                    isBrowser ? <BrowserCloseIcon /> : <CloseIcon />
                }
                headerName={'Tutorial Phase'}
                headerDesc={`Documentation`}
            />
            <TutorialCardContainer>
                <DashboardInfo />
                <ProgramInfo />
                <StatLogAndSettingsInfo />
                <TutorialEndText>Congratulations!</TutorialEndText>
                <TutorialEndText>
                    You've completed the Tutorial!
                </TutorialEndText>
                <TutorialEndLabel>
                    Please press <em>Exit</em> to leave. This tutorial cannot be
                    accessed after leaving, review carefully!
                </TutorialEndLabel>
            </TutorialCardContainer>
        </MainContainer>
    );
};

export default connect(null, { changeIsNewUserValue })(TutorialMain);
