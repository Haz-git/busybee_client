import React from 'react';
import styled from 'styled-components';

//Styles:

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-contents: center;
    margin: 0.3em 0;
`;

const NumberLabelContainer = styled.div`
    margin-right: 0.5em;
    padding: 0.5em 0.95em;
    background-color: #111a28;
    border: 1px solid #fdbc3d;
    border-radius: 50%;
    -webkit-box-shadow: rgba(0, 0, 0, 1) 0px 3px 4px;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
`;

const NumberLabel = styled.label`
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
                                `${option.programExerciseId || option.restId}`
                            }
                        >
                            {option.programExerciseName}
                            {option.restLengthMinute &&
                            option.restLengthSecond !== undefined
                                ? ` (${option.restLengthMinute}m ${option.restLengthSecond}s)`
                                : null}
                        </StyledOption>
                    ))}
                </StyledSelector>
            </MainContainer>
        </>
    );
};

export default BlueprintSelector;