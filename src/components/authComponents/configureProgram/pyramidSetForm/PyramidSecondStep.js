import React, { useState, useEffect } from 'react';
import SetConfig from './SetConfig';
import { v4 as uuid } from 'uuid';

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

const ConfigObjectContainer = styled.div`
    padding-bottom: 4.5em;
`;

const PyramidSecondStep = ({
    currentStep,
    valueSet,
    valueExercise,
    programId,
}) => {
    const [setObjectsArray, setSetObjectsArray] = useState([]);

    useEffect(() => {
        //Issue: it turns out when the user changes his/her mind on how many sets a pyramid will be, YES it will render the accurate number of SetConfigs, but the previously added objects into setObjectArray will not be deleted!

        //Therefore, we will utilize useEffect to check on 'valueSet' and if valueSet changes, we will reset the setObjectsArray state to default.

        setSetObjectsArray([]);
    }, [valueSet]);
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

    const sortSetObjectsArray = () => {
        return setObjectsArray.sort((a, b) =>
            parseInt(a.setId) > parseInt(b.setId) ? 1 : -1
        );
    };

    const handleOnChangeSelector = (unitObject) => {
        //This function serves to handle the onChange event for unit selection:

        /*
            If the user does not explicitly select for 'Kgs', then unit will not be added to an object. Therefore, If an object does not have a unit key, then it is inferred that the weight is in Lbs by default.
        */

        //create a temporary array:
        let tempObjectsArray = setObjectsArray;

        //Extract contents from the weightObject:
        const { setId, unit } = unitObject;

        const targetIndex = tempObjectsArray.findIndex(
            (input) => input.setId === setId
        );

        //Check to see if targetIndex === -1. If === -1, we add the object directly to the array. If !== -1, we traverse to object location, and insert the weight into the object (overwriting existing values)...

        if (targetIndex === -1) {
            tempObjectsArray.push({
                setId: setId,
                unit: unit,
            });
        } else if (targetIndex > -1) {
            //This means that the set already exists in the array, we will not re-set or set the weight value in the set.
            tempObjectsArray[targetIndex]['unit'] = unit;
        }

        console.log(tempObjectsArray);

        setSetObjectsArray(tempObjectsArray);
    };

    const handleOnChangeWeight = (weightObject) => {
        //This function serves to handle the onChange event for weight:

        //create a temporary array:
        let tempObjectsArray = setObjectsArray;

        //Extract contents from the weightObject:
        const { setId, weight } = weightObject;

        const targetIndex = tempObjectsArray.findIndex(
            (input) => input.setId === setId
        );

        //Check to see if targetIndex === -1. If === -1, we add the object directly to the array. If !== -1, we traverse to object location, and insert the weight into the object (overwriting existing values)...

        if (targetIndex === -1) {
            tempObjectsArray.push({
                setId: setId,
                weight: weight,
            });
        } else if (targetIndex > -1) {
            //This means that the set already exists in the array, we will not re-set or set the weight value in the set.
            tempObjectsArray[targetIndex]['weight'] = weight;
        }

        console.log(tempObjectsArray);

        setSetObjectsArray(tempObjectsArray);
    };

    const handleOnChangeReps = (repsObject) => {
        //This function serves to handle the onChange event for reps:
        console.log(repsObject);

        //create a temporary array:
        let tempObjectsArray = setObjectsArray;

        //Extract contents from the weightObject:
        const { setId, reps } = repsObject;

        const targetIndex = tempObjectsArray.findIndex(
            (input) => input.setId === setId
        );

        //Check to see if targetIndex === -1. If === -1, we add the object directly to the array. If !== -1, we traverse to object location, and insert the weight into the object (overwriting existing values)...

        if (targetIndex === -1) {
            tempObjectsArray.push({
                setId: setId,
                reps: reps,
            });
        } else if (targetIndex > -1) {
            //This means that the set already exists in the array, we will not re-set or set the weight value in the set.
            tempObjectsArray[targetIndex]['reps'] = reps;
        }

        console.log(tempObjectsArray);

        setSetObjectsArray(tempObjectsArray);
    };

    const createSetConfigArray = () => {
        //Creating an array of setConfigs to be rendered in renderSetConfigObjects
        let setConfigArray = [];

        for (let i = 0; i < valueSet; i++) {
            setConfigArray.push({
                setId: `${i + 1}`,
            });
        }

        return setConfigArray;
    };

    const renderSetConfigObjects = () => {
        const configObjects = createSetConfigArray();

        if (configObjects !== undefined && configObjects.length !== 0) {
            return configObjects.map((config) => (
                <SetConfig
                    // key={uuid()}
                    setNum={config.setId}
                    weightHandler={handleOnChangeWeight}
                    repHandler={handleOnChangeReps}
                    unitHandler={handleOnChangeSelector}
                />
            ));
        }
    };

    //The action creator should be here and rendered when all fields are filled: It should require: programId, exerciseName (valueExercise), and the array of sets/reps/weight AFTER using the sorting function.

    return (
        <>
            {currentStep !== 2 ? null : (
                <MainContainer>
                    <ConfigObjectContainer>
                        {renderSetConfigObjects()}
                    </ConfigObjectContainer>
                </MainContainer>
            )}
        </>
    );
};

export default PyramidSecondStep;
