import React, { useState } from 'react';
import GuidedTourContainer from './GuidedTourContainer';
import GuidedTourArrow from './GuidedTourArrow';
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
import { addRecord } from '../redux/userStatRecords/recordActions';

const GuidedTour = withRouter(
    ({
        addRecord,
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
            padding: '.6em .5em .5em .5em',
            margin: '0 0',
            maxWidth: '15em',
            width: '15em',
            boxShadow: 'rgba(255, 255, 255, .15) 0px 1px 8px',
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

        function submitTutorialRecords() {
            submitTutorialRecords = function () {};

            addRecord(tutorialStatId, '5', '3', '70', 'Lbs', undefined);
        }

        const steps = [
            {
                content: (
                    <GuidedTourContainer
                        header="Welcome!"
                        desc={`Hey! Thanks for letting me take you around. Let's start in your dashboard.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.UserPowerStats-StatCardContainer',
                content: (
                    <GuidedTourContainer
                        header="Main Lifts"
                        desc={`Check the status of your primary lifts at a glance.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.UserTopPrograms-MainContainer',
                content: (
                    <GuidedTourContainer
                        header="Top Programs"
                        desc={`Your most frequently run programs will be shown here.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.UserRecentStats-MainContainer',
                content: (
                    <GuidedTourContainer
                        header="Recent Stats"
                        desc={`Your most recently saved stats will be shown here.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Settings"
                        desc={`Everything related to your personal details.`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Option Blocks"
                        desc={`Edit your saved user details through these options. Or, sign out.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Your Programs"
                        desc={`Personalized programs created by you...yes you!`}
                    />
                ),
                action: () => {
                    if (pathname !== '/programs') {
                        historyObject.push('/programs');
                    }
                },
                style: stepsStyle,
            },
            {
                selector: '.MainPrograms-CreateProgramButton',
                content: (
                    <GuidedTourContainer
                        header="Create Program"
                        desc={`Start your own custom program with a single button.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Create Program"
                        desc={`Let me create a test program for you. You can delete this later, or keep it.`}
                    />
                ),
                style: stepsStyle,
                action: () => addTutorialProgram(),
                // Wrapping the function solves the issue of re-creating a test program every-time a user moves back to this step.
                //Also there is an issue of this function running continuously when user stays in the step...Edit: the step actually runs only once. Mapping the state to props is causing infinite re-render.
            },
            {
                selector: '.ProgramCard-MainContainer',
                content: (
                    <GuidedTourContainer
                        header="Program Details"
                        desc={`Customize the title and description of the program.`}
                    />
                ),
                style: stepsStyle,
                position: 'top',
            },
            {
                selector: '.ProgramCard-ConfigureButton',
                content: (
                    <GuidedTourContainer
                        header="Configuration"
                        desc={`Let's add some exercises to your new program.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`All the tools required for a well-made program.`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`Add your favorite exercises.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`Choose from multiple options to add an exercise.`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`I'll create a sample exercise for you. Do you like curls?`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`Here's your (my) exercise details.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.ProgramExerciseCard-PushoverContainer',
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`Additional options to delete your exercise, or add a rest period between each set.`}
                    />
                ),
                style: stepsStyle,
                action: () =>
                    dispatchMouseClickEvent(
                        'ProgramExerciseCard-PushoverContainer'
                    ),
            },
            {
                selector: '.ConfigureMain-AddRestButtonOpening',
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`You can add a rest period between each exercise. I think you'll be fine, though.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.ConfigureMain-EditLayoutButtonOpening',
                content: (
                    <GuidedTourContainer
                        header="Customization"
                        desc={`Make sure to format the program before you finish. Unfortunately, we don't know the order you want to run your exercises!`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Program Format"
                        desc={`Basically a reading list for GymJot.`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Program Format"
                        desc={`This number shows the order an exercise will show up.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.StyledSelector-BlueprintSelector',
                content: (
                    <GuidedTourContainer
                        header="Program Format"
                        desc={`Select from your exercises entered in the last page.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Program Format"
                        desc={`When finished selecting, a button will appear to save your format. Make sure to save it!`}
                    />
                ),
                style: stepsStyle,
                action: () => submitTutorialFormattedProgram(),
            },
            {
                selector: '.BackButtonHeader-BackButton',
                content: (
                    <GuidedTourContainer
                        header="Program Format"
                        desc={`Don't worry, I have formatted this program automatically for you just now. You can return to previous pages via this back button.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Deja Vu"
                        desc={`We've returned back to your programs!`}
                    />
                ),
                style: stepsStyle,
                action: () => {
                    if (pathname !== '/programs') {
                        historyObject.push('/programs');
                    }
                },
            },
            {
                selector: '.ProgramCard-PlayButton',
                content: (
                    <GuidedTourContainer
                        header="Running Programs"
                        desc={`After formatting a program, you can run it. Let's try that now.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Running Programs"
                        desc={`Never forget your next exercise again. That is, unless we forget...uh oh.`}
                    />
                ),
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
                content: (
                    <GuidedTourContainer
                        header="Running Programs"
                        desc={`Here's the details on the exercise you must perform.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.RunCards-ButtonContainer',
                content: (
                    <GuidedTourContainer
                        header="Running Programs"
                        desc={`Move between your previous, current, and next exercises in your program.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.BackButtonHeader-BackButton',
                content: (
                    <GuidedTourContainer
                        header="Moving On"
                        desc={`Let's exit here.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Stat Log"
                        desc={`Your own personal bank of everything you've done at the Gym.`}
                    />
                ),
                style: stepsStyle,
                action: () => {
                    if (pathname !== '/stats') {
                        historyObject.push('/stats');
                    }
                },
            },
            {
                selector: '.MainStats-AddButton',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`Use this button to log a new stat.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.MainStats-AddButton',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`Let's create your first stat. After working your biceps...let's train some legs?`}
                    />
                ),
                style: stepsStyle,
                action: () => submitTutorialStat(),
                position: 'left',
            },
            {
                selector: '.StatCard-NameContainer',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`Here's your stat name and the date which it was added.`}
                    />
                ),
                style: stepsStyle,
            },
            {
                selector: '.StatCard-StyledDropdownButton',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`This caret reveals additional options!`}
                    />
                ),
                style: stepsStyle,
                action: () =>
                    dispatchMouseClickEvent('StatCard-StyledDropdownButton'),
                position: 'top',
            },
            {
                selector: '.StatCard-ButtonContainer',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`Delete your stat, change your stat name, or view your records.`}
                    />
                ),
                style: stepsStyle,
                position: 'bottom',
            },
            {
                selector: '.StatCard-DatabaseIcon',
                content: (
                    <GuidedTourContainer
                        header="Adding Stats"
                        desc={`Let's explore stat records.`}
                    />
                ),
                style: stepsStyle,
                position: 'bottom',
                action: () => submitTutorialRecords(),
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Stat Records"
                        desc={`I've added a record for you. Let's take a look.`}
                    />
                ),
                style: stepsStyle,
                action: () =>
                    dispatchMouseClickEvent('StatCard-Database-Button'),
            },
            {
                selector: '.RecordCard-DateContainer',
                content: (
                    <GuidedTourContainer
                        header="Stat Records"
                        desc={`Your record modification dates are saved.`}
                    />
                ),
                style: stepsStyle,
                position: 'bottom',
            },
            {
                selector: '.RecordCard-DetailsContainer',
                content: (
                    <GuidedTourContainer
                        header="Stat Records"
                        desc={`You can store your sets, reps, weight, and unit. Track your progressive overload!`}
                    />
                ),
                style: stepsStyle,
                position: 'bottom',
            },
            {
                selector: '.RecordCard-DropdownButton',
                content: (
                    <GuidedTourContainer
                        header="Stat Records"
                        desc={`You can delete or edit a record here.`}
                    />
                ),
                style: stepsStyle,
                position: 'top',
                action: () =>
                    dispatchMouseClickEvent('RecordCard-DropdownButton'),
            },
            {
                content: (
                    <GuidedTourContainer
                        header="Farewell"
                        desc={`That's about it! There's other features but I'm confident you'll find them on your own. Thank you for trying out GymJot!`}
                    />
                ),
                action: () => {
                    if (pathname !== '/dashboard') {
                        historyObject.push('/dashboard');
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
                    prevButton={<></>}
                    nextButton={<GuidedTourArrow />}
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
    addRecord,
    addNewStat,
    submitFormattedProgram,
    addNewProgram,
    addNewProgramExercise,
    addToUserProgramCount,
})(GuidedTour);
