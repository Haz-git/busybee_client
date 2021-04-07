import React, { useState } from 'react';
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
            padding: '1.2em 1em',
            fontSize: '.9em',
            margin: '0 0',
            maxWidth: '15em',
            data_tour_elem__controls: {
                //Trying to center and change color of arrows...
                justifyContent: 'center',
                color: 'white',
            },
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
                content: 'Settings Menu',
                action: () => {
                    if (pathname !== '/settings') {
                        historyObject.push('/settings');
                    }
                },
                style: stepsStyle,
            },
        ];

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
