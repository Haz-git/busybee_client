import React from 'react';
import Toggler from '../../../styling/Toggler';
import { useDarkMode } from '../../../styling/useDarkMode';

//Styles:
import styled from 'styled-components';

//Render:

const ThemeToggler = ({ modeStatus }) => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <>
            <Toggler
                theme={theme}
                toggleTheme={toggleTheme}
                callBack={modeStatus}
            />
        </>
    );
};

export default ThemeToggler;
