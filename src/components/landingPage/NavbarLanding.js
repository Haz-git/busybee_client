import React from 'react';
import Toggler from '../../styling/Toggler';
import { useDarkMode } from '../../styling/useDarkMode';
import { Link } from 'react-router-dom';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';

//Styles:
import styled from 'styled-components';

const DefaultNavbar = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.background};
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 99999 !important;
    padding: 0.3em;
    transition: all 0.5s;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme.navBottomBorder};
`;

const LogoLink = styled(Link)``;

const NavLinkContainer = styled.div`
    display: flex;
    align-items: center;
`;

const NavLink = styled(Link)`
    text-decoration: none !important;
    color: ${(props) => props.theme.generalText};
    margin-left: 1em;
    margin-right: 1em;
    font-size: 0.6em;
    transition: all 0.5s;
    &::after {
        display: block;
        content: '';
        height: 0.2em;
        width: 0;
        background: transparent;
        transition: width 0.5s ease, background-color 0.5s ease;
    }

    &:hover::after {
        width: 100%;
        background: #ee6c4d;
    }

    &:hover {
        color: ${(props) => props.theme.generalText} !important;
    }

    @media only screen and (min-width: 300px) {
        font-size: 0.65em;
        margin-left: 1em;
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (min-width: 350px) {
        font-size: 0.65em;
        margin-left: 1.2em;
        margin-right: 1.2em;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (min-width: 480px) {
        font-size: 0.75em;
        margin-left: 1.5em;
        margin-right: 1.5em;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 12px;
        margin-left: 1.7em;
        margin-right: 1.7em;
        white-space: nowrap;
        overflow: hidden;
    }
`;

//Render:
const NavbarLanding = ({ modeStatus }) => {
    const [theme, toggleTheme] = useDarkMode();

    const renderNavbar = () => {
        if (isBrowser) {
            return (
                <DefaultNavbar>
                    <LogoLink to="/">GymJot</LogoLink>
                    <NavLinkContainer>
                        <Toggler
                            theme={theme}
                            toggleTheme={toggleTheme}
                            callBack={modeStatus}
                        />
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Join</NavLink>
                    </NavLinkContainer>
                </DefaultNavbar>
            );
        } else {
            //The navigation bar will not show on mobile devices to create a more native-app like experience.
            return null;
        }
    };

    return <>{renderNavbar()}</>;
};

export default NavbarLanding;
