import React from 'react';

//Styles:
import styled from 'styled-components';

const ButtonLabel = styled.p`
    font-size: 1.8em;
    font-weight: 500;
    margin-left: 0.5em;
    white-space: nowrap;
    color: #fdbc3d;
    text-shadow: 2px 2px 2px #14181f;
`;

const CustomExerciseSelector = styled.button`
    margin: 1em 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 100%;
    padding: 1.5em 2em;
    border: none;
    cursor: pointer;
    /* background: #111a28; */
    background: rgba(17, 26, 40, 1);
    border-radius: 0.7em;
    -webkit-box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;

    &:hover {
        background: #1c2330;
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const AddExerciseOptionButton = ({ buttonLabel, icon, clickFunction }) => {
    return (
        <>
            <CustomExerciseSelector onClick={clickFunction}>
                {icon}
                <ButtonLabel>{buttonLabel}</ButtonLabel>
            </CustomExerciseSelector>
        </>
    );
};

export default AddExerciseOptionButton;
