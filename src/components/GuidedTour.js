import React, { useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour from 'reactour';
import historyObject from './historyObject';

const GuidedTour = ({ openOn, closeFunc }) => {
    //States for moving around the app. Unfortunately, using the history object with reactour generates an infinite loop. We'll first check if we have navigated to an area before using the historyObject.

    const [hasNavigatedToSettings, setHasNavigatedToSettings] = useState(false);

    const disableBody = (target) => disableBodyScroll(target);
    const enableBody = (target) => enableBodyScroll(target);

    const steps = [
        {
            selector: '.UserPowerStats-StatCardContainer',
            content: `Here's your current primary lifts. You don't have any yet, but after this tutorial feel free to use 'edit' to add a new lift!`,
        },
        {
            content: 'Settings Menu',
            action: () => {
                if (!hasNavigatedToSettings) {
                    historyObject.push('/settings');
                    setHasNavigatedToSettings(true);
                }
            },
        },
        {
            selector: '.MainSettings-MainHeader',
            content: 'Test',
        },
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
            />
        </>
    );
};

export default GuidedTour;
