import React, { useState } from 'react';
import styled from 'styled-components';

//Styles:
const StyledTextField = styled.input`
    margin: 0.5em 0.5em;
    border: 1px solid white;
    border-radius: 5em;
    background-color: #111a28;
    color: white;
    padding: 0.5em 1em;
    width: 100%;
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

//Render:

const CustomNumberField = ({ placeholder, existingStat, changeFunc }) => {
    const renderPlaceholder = () => {
        if (existingStat) {
            return (
                <StyledTextField
                    type="number"
                    placeholder={existingStat}
                    onChange={changeFunc}
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 4);
                    }}
                />
            );
        } else if (placeholder && !existingStat) {
            return (
                <StyledTextField
                    type="number"
                    placeholder={placeholder}
                    onChange={changeFunc}
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 4);
                    }}
                />
            );
        }
    };

    return <>{renderPlaceholder()}</>;
};

export default CustomNumberField;
