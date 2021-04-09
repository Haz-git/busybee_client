import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour from 'reactour';
import historyObject from './historyObject';

//Dispatch Actions:
import { connect } from 'react-redux';
import {
    addNewProgram,
    addToUserProgramCount,
} from '../redux/userPrograms/userProgramActions';
import { addNewProgramExercise } from '../redux/userProgramExercises/programExerciseActions';
import { submitFormattedProgram } from '../redux/userFormattedPrograms/formattedProgramsActions';
import { addNewStat } from '../redux/userStats/userStatActions';

const GuidedTour = withRouter(
    ({
        addNewStat,
        addToUserProgramCount,
        submitFormattedProgram,
        addNewProgramExercise,
        addNewProgram,
        openOn,
        closeFunc,
        location: { pathname },
    }) => {
        const disableBody = (target) => disableBodyScroll(target);
        const enableBody = (target) => enableBodyScroll(target);
        const accentColor = 'white';
        //States for moving around the app. Unfortunately, using the history object with reactour generates an infinite loop. We'll first check if we have navigated to an area before using the historyObject.
        console.log('Test for infinite re-render');

        //Custom tutorial program information:
        const programName = 'Test Program',
            programDesc = 'Your first program! Wow!',
            tutorialId = 'TUTORIAL_SAMPLE_PROGRAM';

        //Custom program exercise information:
        const programExerciseName = 'Bicep Curls',
            programExerciseType = 'NEW_PROGRAM_EXERCISE',
            sets = '4',
            reps = '10',
            weight = '45',
            unit = 'Lbs';

        const PreFormattedTutorialProgramObject = [
            {
                orderId: '1',
                programExerciseId: 'tutorial',
                restDetails: undefined,
                exerciseDetails: {
                    dateAdded: `${new Date()}`,
                    programExerciseId: 'tutorial',
                    programExerciseName: 'Bicep Curls',
                    programExerciseType: 'NEW_PROGRAM_EXERCISE',
                    reps: '10',
                    sets: '4',
                    weight: '45',
                },
            },
        ];

        //Custom tutorial program stat:
        const tutorialStatName = 'Leg Press',
            tutorialStatId = 'TUTORIAL_SAMPLE_STAT';

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

        function addTutorialProgramExercise() {
            addTutorialProgramExercise = function () {};

            addNewProgramExercise(
                tutorialId,
                programExerciseType,
                sets,
                reps,
                programExerciseName,
                weight,
                unit,
                undefined
            );
        }

        function submitTutorialFormattedProgram() {
            submitTutorialFormattedProgram = function () {};

            submitFormattedProgram(
                PreFormattedTutorialProgramObject,
                tutorialId
            );
        }

        function dispatchMouseClickEvent(elementId) {
            //I'm sure this isn't best practice for React since we are manipulating the DOM elements directly. However, this seems to be the fastest way I currently know to dispatch a mouse click event.
            //Additionally, since I'm using this to open modals, it appears that there's focus-fighting between reactour and the material UI modals. I will have to sort that out later.

            const mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: false,
            });

            const targetNode = document.getElementById(elementId);

            if (targetNode) {
                targetNode.dispatchEvent(mouseEvent);
            } else {
                console.warn('Node Id not found for dispatchMouseClickEvent()');
            }
        }

        function submitTutorialStat() {
            submitTutorialStat = function () {};

            addNewStat(tutorialStatName, undefined, tutorialStatId);
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
            {
                selector: '.ConfigureMain-AddExerciseButtonOpening',
                content: `Use this button to browse options to add your favorite exercises.`,
                style: stepsStyle,
            },
            {
                content: 'There are many ways to add your favorite exercises',
                action: () => {
                    //Open issue: it appears that when historyObject is used, it causes GuidedTour to re-render, and therefore it makes sense that programExercise cards are being added everything the back button is pressed.

                    //I'm thinking the only way over this is to disable the ability to return to previous steps. Check out the custom helper in reactour demo, press enter to view it in the live demo.
                    if (
                        pathname !==
                        `/programs/configure/select/${programName}/${tutorialId}`
                    ) {
                        historyObject.push(
                            `/programs/configure/select/${programName}/${tutorialId}`
                        );

                        addTutorialProgramExercise();
                    }
                },
                style: stepsStyle,
            },
            {
                content: `Let me create a sample exercise for you.`,
                style: stepsStyle,
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
            },
            {
                selector: '.ProgramExerciseCard-WrapperContainer',
                content: `Here's your exercise details.`,
                style: stepsStyle,
            },
            {
                selector: '.ProgramExerciseCard-PushoverContainer',
                content: `Check this out to remove your stat card or add rest between each set.`,
                style: stepsStyle,
            },
            {
                selector: '.ConfigureMain-AddRestButtonOpening',
                content: `Thinking you're going to be a little tired? Add a rest period!`,
                style: stepsStyle,
            },
            {
                selector: '.ConfigureMain-EditLayoutButtonOpening',
                content: `Make sure to format the program before you finish--We don't know in what order you want to run this program!`,
                style: stepsStyle,
            },
            {
                content: `Formatting your program`,
                style: stepsStyle,
                action: () => {
                    if (
                        pathname !==
                        `/programs/configure/blueprint/${programName}/${tutorialId}`
                    ) {
                        historyObject.push(
                            `/programs/configure/blueprint/${programName}/${tutorialId}`
                        );
                    }
                },
            },
            {
                selector: '.BlueprintSelector-NumberLabel',
                content: `This number shows the order an exercise will show up.`,
                style: stepsStyle,
            },
            {
                selector: '.StyledSelector-BlueprintSelector',
                content: `Select from your exercises entered in the last page.`,
                style: stepsStyle,
            },
            {
                content: `When finished selecting, a button will appear the save it. Make sure to save it!`,
                style: stepsStyle,
                action: () => submitTutorialFormattedProgram(),
            },
            {
                selector: '.BackButtonHeader-BackButton',
                content: `I have formatted this program automatically for you! You can return to previous pages via this back button!`,
                style: stepsStyle,
            },
            {
                content: `We've returned back to your programs!`,
                style: stepsStyle,
                action: () => {
                    if (pathname !== '/programs') {
                        historyObject.push('/programs');
                    }
                },
            },
            {
                selector: '.ProgramCard-PlayButton',
                content: `After formatting your program, you can run it! Let's try that.`,
                style: stepsStyle,
            },
            {
                content: `Running A Program`,
                style: stepsStyle,
                action: () => {
                    if (
                        pathname !== `/runprogram/${programName}/${tutorialId}`
                    ) {
                        addToUserProgramCount(tutorialId);
                        historyObject.push(
                            `/runprogram/${programName}/${tutorialId}`
                        );
                    }
                },
            },
            {
                selector: '.RunCards-CardContainer',
                content: `Here's your exercise details to perform.`,
                style: stepsStyle,
            },
            {
                selector: '.RunCards-ButtonContainer',
                content: `Move between your previous, current, and next exercises in your program.`,
                style: stepsStyle,
            },
            {
                selector: '.BackButtonHeader-BackButton',
                content: `Let's exit here.`,
                style: stepsStyle,
            },
            {
                content: `Your Stat Log`,
                style: stepsStyle,
                action: () => {
                    if (pathname !== '/stats') {
                        historyObject.push('/stats');
                    }
                },
            },
            {
                selector: '.MainStats-AddButton',
                content: `Use this button to log a new stat.`,
                style: stepsStyle,
            },
            {
                content: `Let's create your first stat.`,
                style: stepsStyle,
                action: () => submitTutorialStat(),
                position: 'top',
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
                    startAt={30}
                    showButtons={true}
                    showCloseButton={true}
                    prevButton={<></>}
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

export default connect(null, {
    addNewStat,
    submitFormattedProgram,
    addNewProgram,
    addNewProgramExercise,
    addToUserProgramCount,
})(GuidedTour);
