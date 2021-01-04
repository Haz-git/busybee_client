import React from 'react';
import Toggler from '../../styling/Toggler';
import { useDarkMode } from '../../styling/useDarkMode';

//Styles:
import styled from 'styled-components';

const DefaultNavbar = styled.div`
    background-color: ${(props) => props.theme.background};
`;

//Render:
const NavbarLanding = ({ modeStatus }) => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <DefaultNavbar>
            <p>This should be the navbar.</p>
            <div>
                <Toggler
                    theme={theme}
                    toggleTheme={toggleTheme}
                    callBack={modeStatus}
                />
            </div>
        </DefaultNavbar>
    );
};

export default NavbarLanding;
