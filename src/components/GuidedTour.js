import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour from 'reactour';
import historyObject from './historyObject';

const GuidedTour = withRouter(
    ({ openOn, closeFunc, location: { pathname } }) => {
        //States for moving around the app. Unfortunately, using the history object with reactour generates an infinite loop. We'll first check if we have navigated to an area before using the historyObject.

        const [hasNavigatedToSettings, setHasNavigatedToSettings] = useState(
            false
        );

        console.log(pathname);

        const disableBody = (target) => disableBodyScroll(target);
        const enableBody = (target) => enableBodyScroll(target);

        const steps = [
            {
                content: 'Welcome to the GymJot Walkthrough!',
            },
            ...(pathname === '/dashboard'
                ? [
                      {
                          selector: '.UserPowerStats-StatCardContainer',
                          content: `Check the status of your primary lifts at a glance.`,
                      },
                      {
                          content: 'Settings Menu',
                          action: () => historyObject.push('/settings'),
                      },
                  ]
                : []),
            ...(pathname === '/settings'
                ? [
                      {
                          selector: '.MainSettings-MainHeader',
                          content: 'Test',
                      },
                  ]
                : []),
        ];

        return (
            <>
                <Tour
                    steps={steps}
                    isOpen={openOn}
                    onRequestClose={() => closeFunc(false)}
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
                />
            </>
        );
    }
);

export default GuidedTour;
