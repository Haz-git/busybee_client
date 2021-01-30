import React, { useState } from 'react';
import styled from 'styled-components';

//Styles:
const StyledTextField = styled.input`
    /* margin: 0.5em 0.5em; */
    border: none;
    border-radius: 5em;
    background-color: #111a28;
    color: white;
    padding: 0.5em 1em;
    width: 100%;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 1em;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.3em;
    }
`;

//Render:

const CustomTextField = ({
    type,
    placeholder,
    existingStat,
    changeFunc,
    maxlength,
}) => {
    const renderPlaceholder = () => {
        if (existingStat) {
            return (
                <StyledTextField
                    type={type}
                    placeholder={existingStat}
                    onChange={changeFunc}
                    maxLength={maxlength ? maxlength : undefined}
                />
            );
        } else if (placeholder && !existingStat) {
            return (
                <StyledTextField
                    type={type}
                    placeholder={placeholder}
                    onChange={changeFunc}
                    maxLength={maxlength ? maxlength : undefined}
                />
            );
        }
    };

    return <>{renderPlaceholder()}</>;
};

export default CustomTextField;
