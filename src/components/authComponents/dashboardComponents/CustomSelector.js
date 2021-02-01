import React from 'react';
import styled from 'styled-components';

//Styles:

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
        font-size: 1.45em;
    }
`;

const StyledOption = styled.option``;
//Render:

const CustomSelector = ({ changeFunc, optionsList, optionsDefaultValue }) => {
    const renderSelector = () => {
        if (optionsList === null || optionsList === undefined) {
            return (
                <StyledSelector onChange={changeFunc}>
                    <StyledOption value="Lbs">Lbs</StyledOption>
                    <StyledOption value="Kgs">Kgs</StyledOption>
                </StyledSelector>
            );
        } else if (optionsList !== null && optionsList !== undefined) {
            return (
                <StyledSelector onChange={changeFunc}>
                    <StyledOption value="">
                        Choose a {optionsDefaultValue}...
                    </StyledOption>
                    {optionsList.map((option) => (
                        <StyledOption value={`${option.exerciseName}`}>
                            {option.exerciseName}
                        </StyledOption>
                    ))}
                </StyledSelector>
            );
        }
    };

    return <>{renderSelector()}</>;
};

export default CustomSelector;
