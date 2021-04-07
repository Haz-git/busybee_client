import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour from 'reactour';
import historyObject from './historyObject';

const GuidedTour = withRouter(
    ({ openOn, closeFunc, location: { pathname } }) => {
        const disableBody = (target) => disableBodyScroll(target);
        const enableBody = (target) => enableBodyScroll(target);
        const accentColor = 'white';
        //States for moving around the app. Unfortunately, using the history object with reactour generates an infinite loop. We'll first check if we have navigated to an area before using the historyObject.
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

        const steps = [
            {
                content: 'Welcome to the GymJot Walkthrough!',
                style: stepsStyle,
                position: 'bottom',
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
                    maskSpace={10}
                    closeWithMask={false}
                    showNavigation={true}
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

export default GuidedTour;
