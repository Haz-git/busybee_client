import React from 'react';
import styled from 'styled-components';

//Styles:

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3em 0;
`;

const NumberLabelContainer = styled.div`
    position: relative;
    margin-right: 0.5em;
    height: 2.5em;
    width: 3em;
    background-color: #111a28;
    border: 1px solid #fdbc3d;
    border-radius: 50%;
    -webkit-box-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
`;

const NumberLabel = styled.h4`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    font-size: 1.1em;
    color: #fdbc3d;
    font-weight: 900;
`;

const StyledSelector = styled.select`
    margin: 0.4em 0em;
    border: none;
    width: 100%;
    border-radius: 5em;
    background-color: #111a28;
    color: white;
    padding: 0.5em 1em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 1em;
    -webkit-box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.1em;
    }
`;

const StyledOption = styled.option``;

const BlueprintSelector = ({
    changeFunc,
    optionsList,
    optionsDefaultValue,
    numLabel,
    numId,
}) => {
    const extractSetObjectsArray = (array) => {
        let returnArray = [];

        for (let i = 0; i < array.length; i++) {
            returnArray.push(`S: ${array[i].setId}`);
            returnArray.push(`R: ${array[i].reps}`);
            returnArray.push(`W: ${array[i].weight}`);
            array[i].unit !== undefined
                ? returnArray.push(array[i].unit)
                : returnArray.push('Lbs');
        }

        return returnArray.join(' ');
    };

    return (
        <>
            <MainContainer>
                <NumberLabelContainer>
                    <NumberLabel>{numLabel}</NumberLabel>
                </NumberLabelContainer>
                <StyledSelector onChange={changeFunc}>
                    <StyledOption value="" disabled selected>
                        Choose a {optionsDefaultValue}...
                    </StyledOption>
                    {optionsList.map((option) => (
                        <StyledOption
                            value={
                                numId +
                                ` ` +
                                `${option.programExerciseId || option.restId}`
                            }
                        >
                            {option.setObjectsArray !== undefined
                                ? `${
                                      option.programExerciseName
                                  } - (Pyramid) ${extractSetObjectsArray(
                                      option.setObjectsArray
                                  )}`
                                : null}
                            {option.programExerciseId !== undefined &&
                            option.setObjectsArray === undefined
                                ? `${option.programExerciseName} : ${option.weight} lbs, ${option.reps} reps, ${option.sets} sets`
                                : null}
                            {option.restLengthMinute &&
                            option.restLengthSecond !== undefined
                                ? ` Rest Period: (${option.restLengthMinute}m ${option.restLengthSecond}s)`
                                : null}
                        </StyledOption>
                    ))}
                </StyledSelector>
            </MainContainer>
        </>
    );
};

export default BlueprintSelector;
