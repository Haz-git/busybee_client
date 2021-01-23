import React from 'react';
import styled from 'styled-components';

//Styles:

const StyledSelector = styled.select`
    margin: 0.5em 0.5em;
    border: 1px solid white;
    border-radius: 5em;
    background-color: inherit;
    color: white;
    padding: 0.5em 1em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 1em;

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

const CustomSelector = ({ changeFunc }) => {
    return (
        <StyledSelector onChange={changeFunc}>
            <StyledOption value="Lbs">Lbs</StyledOption>
            <StyledOption value="Kgs">Kgs</StyledOption>
        </StyledSelector>
    );
};

export default CustomSelector;
