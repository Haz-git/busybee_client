import React from 'react';
import Toggler from '../../styling/Toggler';
import { useDarkMode } from '../../styling/useDarkMode';
import { Link } from 'react-router-dom';

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
    margin-left: 0.5em;
    margin-right: 0.5em;
    transition: all 0.5s;
    &::after {
        display: block;
        content: '';
        height: 3px;
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
`;

//Render:
const NavbarLanding = ({ modeStatus }) => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <DefaultNavbar>
            <LogoLink to="/">Logo</LogoLink>
            <NavLinkContainer>
                <Toggler
                    theme={theme}
                    toggleTheme={toggleTheme}
                    callBack={modeStatus}
                />
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
            </NavLinkContainer>
        </DefaultNavbar>
    );
};

export default NavbarLanding;
