import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import SetConfig from './SetConfig';

//Styles:
import styled, { keyframes } from 'styled-components';

const carouselMovement = keyframes`
    from {
        opacity: 0;
        transform: translate(2%);
    }

    to {
        opacity: 1;
        transform: translate(0,0);
    }
`;

const MainContainer = styled.div`
    animation: ${carouselMovement} 0.3s linear;
`;
const TitleHeader = styled.h1`
    color: white;
    font-size: 1em;
`;

const PyramidSecondStep = ({
    currentStep,
    valueSet,
    weightHandler,
    repHandler,
}) => {
    /*
        valueSet will be used to determine the number of SetConfigs to render:

        Loop through valueSet amount of time, and push and empty object into the array with:

        {
            valueId: [i],
            weight: x,
            reps: y,
            unit: Lbs/Kgs
        }
    */

    const createSetConfigArray = () => {
        let setConfigArray = [];

        for (let i = 0; i < valueSet; i++) {
            setConfigArray.push({
                setId: `${i}`,
                weight: '',
                reps: '',
                unit: '',
            });
        }

        return setConfigArray;
    };

    const renderSetConfigObjects = () => {
        const configObjects = createSetConfigArray();

        if (configObjects !== undefined && configObjects.length !== 0) {
            return configObjects.map((config) => (
                <SetConfig
                    setNum={config.setId}
                    weightHandler={weightHandler}
                    repHandler={repHandler}
                />
            ));
        }
    };

    return (
        <>
            {currentStep !== 2 ? null : (
                <MainContainer>{renderSetConfigObjects()}</MainContainer>
            )}
        </>
    );
};

export default PyramidSecondStep;
