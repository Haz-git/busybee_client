import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour from 'reactour';
import historyObject from './historyObject';

//Dispatch Actions:
import { connect } from 'react-redux';
import { addNewProgram } from '../redux/userPrograms/userProgramActions';

const GuidedTour = withRouter(
    ({ addNewProgram, openOn, closeFunc, location: { pathname } }) => {
        const disableBody = (target) => disableBodyScroll(target);
        const enableBody = (target) => enableBodyScroll(target);
        const accentColor = 'white';
        //States for moving around the app. Unfortunately, using the history object with reactour generates an infinite loop. We'll first check if we have navigated to an area before using the historyObject.
        console.log('Test for infinite re-render');

        //store custom tutorial program information:
        let programName = 'Test Program',
            programDesc = 'Your first program! Wow!',
            tutorialId = 'TUTORIAL_SAMPLE_PROGRAM';

        const stepsStyle = {
            backgroundColor: '#1a222f',
            color: 'white',
            padding: '2em 1em .5em 1em',
            fontSize: '.9em',
            margin: '0 0',
            maxWidth: '15em',
            textShadow: 'rgba(0, 0, 0, 1) 0px 1px 1px',
            //The controls (arrows) for reactour is centered in globalstyles.js
        };

        function addTutorialProgram() {
            addTutorialProgram = function () {};

            addNewProgram(programName, programDesc, undefined, tutorialId); //We pass undefined for callback, since this is tutorial..
        }

        const steps = [
            {
                content: `Welcome to the GymJot Walkthrough! We'll start in the dashboard.`,
                style: stepsStyle,
            },
            {
                selector: '.UserPowerStats-StatCardContainer',
                content: `Check the status of your primary lifts at a glance.`,
                style: stepsStyle,
            },
            {
                selector: '.UserTopPrograms-MainContainer',
                content: `Your most frequently run programs will be shown here.`,
                style: stepsStyle,
            },
            {
                selector: '.UserRecentStats-MainContainer',
                content: `Your most recently saved stats will be shown here.`,
                style: stepsStyle,
            },
            {
                content: 'Settings Menu',
                action: () => {
                    if (pathname !== '/settings') {
                        historyObject.push('/settings');
                    }
                },
                style: stepsStyle,
            },
            {
                selector: '.MainSettings-SettingsOptionsContainer',
                content: `Edit your saved user details through these options.`,
                style: stepsStyle,
            },
            {
                content: 'Your Programs',
                action: () => {
                    if (pathname !== '/programs') {
                        historyObject.push('/programs');
                    }
                },
                style: stepsStyle,
            },
            {
                selector: '.MainPrograms-CreateProgramButton',
                content: `Create tailored lifting programs here!`,
                style: stepsStyle,
            },
            {
                content: `Let me create a test program for you. You can delete this later.`,
                style: stepsStyle,
                action: () => addTutorialProgram(),
                // Wrapping the function solves the issue of re-creating a test program every-time a user moves back to this step.
                //Also there is an issue of this function running continuously when user stays in the step...Edit: the step actually runs only once. Mapping the state to props is causing infinite re-render.
            },
            {
                selector: '.ProgramCard-MainContainer',
                content: `In your program card, you can customize the title and description. Moreover, once you've added exercises we provide a time estimate.`,
                style: stepsStyle,
            },
            {
                selector: '.ProgramCard-ConfigureButton',
                content: `Let's add some exercises to your new program through the configure button.`,
                style: stepsStyle,
            },
            {
                content: 'Customizing your Program',
                action: () => {
                    if (
                        pathname !==
                        `/programs/configure/${programName}/${tutorialId}`
                    ) {
                        historyObject.push(
                            `/programs/configure/${programName}/${tutorialId}`
                        );
                    }
                },
                style: stepsStyle,
            },
        ];

        const navigationHelper = (currentStep) => {
            //This should be a switch function to help the user move through the app during tutorial.
        };

        return (
            <>
                <Tour
                    steps={steps}
                    isOpen={openOn}
                    onRequestClose={() => {
                        //Body is not enabled after tutorial is closed?
                        closeFunc(false);
                    }}
                    rounded={10}
                    onAfterOpen={disableBody}
                    onBeforeClose={enableBody}
                    disableInteraction={true}
                    disableKeyboardNavigation={true}
                    showNumber={false}
                    maskSpace={4}
                    closeWithMask={false}
                    showNavigation={false}
                    update={pathname}
                    accentColor={accentColor}
                    startAt={0}
                    showButtons={true}
                    showCloseButton={true}
                    getCurrentStep={(current) => {
                        //We will create a current step checker here...switch function?
                        if (
                            pathname !== '/dashboard' &&
                            (current === 0 || current === 1)
                        ) {
                            historyObject.push('/dashboard');
                        }
                    }}
                />
            </>
        );
    }
);

export default connect(null, { addNewProgram })(GuidedTour);
