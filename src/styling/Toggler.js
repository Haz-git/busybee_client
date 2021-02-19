import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.generalText};
    border-radius: 30px;
    cursor: pointer;
    font-size: 0.8em;
    padding: 0.8em;
    transition: all 0.5s linear;
    margin-left: 0.5em;
    margin-right: 0.5em;

    &:hover {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }
`;

const Toggle = ({ theme, toggleTheme, callBack }) => {
    const renderThemeTitle = () => {
        if (theme === 'light') {
            return 'Snow';
        } else {
            return 'Midnight';
        }
    };

    //Inputting callback function supplied by 'App' parent component in order to change theme from settings.
    return (
        <Button onClick={() => toggleTheme(callBack)}>
            {renderThemeTitle()}
        </Button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
};

export default Toggle;
