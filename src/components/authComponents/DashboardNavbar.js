import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';
import SettingsModal from './settingsDashboard/SettingsModal';
import { userLogout } from '../../redux/userLogout/userLogoutActions';
import { connect } from 'react-redux';

//Styles:
import styled, { keyframes } from 'styled-components';
//Icons:
import { Home } from '@styled-icons/ionicons-solid/Home';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { StatsChart } from '@styled-icons/ionicons-solid/StatsChart';
import { UserCog } from '@styled-icons/fa-solid/UserCog';
import { Barbell } from '@styled-icons/ionicons-solid/Barbell';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(100%)
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const StyledHomeIcon = styled(Home)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;

    @media screen and (max-width: 320px) {
        height: 1.5em;
        width: 1.5em;
    }
`;

const StyledCalendarIcon = styled(Calendar)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;
    @media screen and (min-width: 320px) {
        height: 1.5em;
        width: 1.5em;
    }
`;

const StyledLogOutIcon = styled(LogOut)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;
`;

const StyledStatsIcon = styled(StatsChart)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;
    @media screen and (max-width: 320px) {
        height: 1.5em;
        width: 1.5em;
    }
`;

const StyledUserCogIcon = styled(UserCog)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;
    @media screen and (max-width: 320px) {
        height: 1.5em;
        width: 1.5em;
    }
`;

const StyledBarbellIcon = styled(Barbell)`
    height: 1.8rem;
    width: 1.8rem;
    color: inherit;
    cursor: pointer;
    @media screen and (max-width: 320px) {
        height: 1.5em;
        width: 1.5em;
    }
`;

const BrowserMainContainer = styled.div`
    /* background: ${({ theme }) => theme.background}; */
    overflow: hidden;
    z-index: 100 !important;
    /* box-shadow: rgba(0, 0, 0, 0.2) 10px 0px 6px; */
    /* animation: ${fadeUp} 0.5s ease; */
`;

const MainContainer = styled.div`
    background: ${({ theme }) => theme.NavColor};
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
    z-index: 99999 !important;
    box-shadow: rgba(0, 0, 0, 1) 0px 3px 15px;
    animation: ${fadeUp} 0.5s ease;
`;

const BrowserNavItemContainer = styled.div`
    text-align: left;
    margin-top: 2em;
    padding: 0 1em;
`;

const NavItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.7em 1.2em;
    color: ${({ theme }) => theme.NavIconColor};
`;

const BrowserNavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    margin: 1em 0;
    padding: 1em 1em;
    border-radius: 0.4em;
    transition: 0.1s all linear;
    box-shadow: rgba(0, 0, 0, 0.8) 1px 4px 5px;
    cursor: pointer;
    animation: ${fadeUp} 0.5s ease;
    color: ${({ theme }) => theme.NavIconColor};
    /* background: salmon; */
    /* 
    /* &:hover {
        transform: scale(1.05);
    } */
`;

const BrowserNavSignOut = styled.a`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    margin: 1em 0;
    padding: 1em 1em;
    border-radius: 0.4em;
    transition: 0.1s all linear;
    box-shadow: rgba(0, 0, 0, 0.8) 1px 4px 5px;
    cursor: pointer;
    animation: ${fadeUp} 0.5s ease;
    color: ${({ theme }) => theme.NavIconColor};
`;

const BrowserNavLabel = styled.label`
    font-size: 1.5em;
    font-weight: 900;
    font-family: 'Lato', helvetica;
    color: inherit;
    cursor: pointer;
    margin-left: 1em;
`;

const NavLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 400;
    color: inherit;
`;

//Render:

const DashboardNavbar = ({ userLogout }) => {
    const [stateSignOutModal, setStateSignOutModal] = useState(false);

    //Sign Out Modal handlers:

    const openSignOutModal = () => {
        setStateSignOutModal(true);
    };

    const closeSignOutModal = () => {
        setStateSignOutModal(false);
    };

    const renderDashboardNavbarComponent = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
                    <MainContainer>
                        <NavItemContainer>
                            <NavItem
                                to="/stats"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledStatsIcon />
                                <NavLabel>Stats</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/programs"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledBarbellIcon />
                                <NavLabel>Programs</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/dashboard"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledHomeIcon />
                                <NavLabel>Dashboard</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/settings"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledUserCogIcon />
                                <NavLabel>Settings</NavLabel>
                            </NavItem>
                        </NavItemContainer>
                    </MainContainer>
                </MobileOnlyView>
            );
        } else if (isBrowser) {
            return (
                <BrowserView>
                    <BrowserMainContainer>
                        <BrowserNavItemContainer>
                            <BrowserNavItem
                                to="/dashboard"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledHomeIcon />
                                <BrowserNavLabel>Dashboard</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/stats"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledStatsIcon />
                                <BrowserNavLabel>Stats</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/programs"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledBarbellIcon />
                                <BrowserNavLabel>Programs</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/settings"
                                activeStyle={{
                                    color: '#fdbc3d',
                                }}
                            >
                                <StyledUserCogIcon />
                                <BrowserNavLabel>Settings</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavSignOut onClick={openSignOutModal}>
                                <StyledLogOutIcon />
                                <BrowserNavLabel>Sign Out</BrowserNavLabel>
                            </BrowserNavSignOut>
                        </BrowserNavItemContainer>
                    </BrowserMainContainer>
                    <SettingsModal
                        openBoolean={stateSignOutModal}
                        closeFunction={closeSignOutModal}
                        ariaLabel="Modal for confirming user sign out"
                        ariaDesc="Modal for confirming user sign out"
                        modalHeader="Confirm Sign Out"
                        modalDesc="Are you sure you want to sign out? You will have to sign back in to view your account details."
                        buttonSubmitFunction={userLogout}
                        isSignOutModal="true"
                    />
                </BrowserView>
            );
        }
    };
    return <>{renderDashboardNavbarComponent()}</>;
};

export default connect(null, { userLogout })(DashboardNavbar);
