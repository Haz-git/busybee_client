import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

//Styles:
import styled, { keyframes } from 'styled-components';
//Icons:
import { Home } from '@styled-icons/ionicons-solid/Home';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { StatsChart } from '@styled-icons/ionicons-solid/StatsChart';
import { UserCog } from '@styled-icons/fa-solid/UserCog';
import { Barbell } from '@styled-icons/ionicons-solid/Barbell';

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
    height: 2.2em;
    width: 2.2em;
    margin-right: 1em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledCalendarIcon = styled(Calendar)`
    height: 2.2em;
    width: 2.2em;
    margin-right: 1em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledStatsIcon = styled(StatsChart)`
    height: 2.2em;
    width: 2.2em;
    margin-right: 1em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledUserCogIcon = styled(UserCog)`
    height: 2.2em;
    width: 2.2em;
    margin-right: 1em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledBarbellIcon = styled(Barbell)`
    height: 2.2em;
    width: 2.2em;
    margin-right: 1em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const BrowserMainContainer = styled.div`
    background: ${({ theme }) => theme.background};
    overflow: hidden;
    position: fixed;
    /* left: 0; */
    height: 100%;
    padding-left: 8em;
    z-index: 1 !important;
    box-shadow: rgba(0, 0, 0, 0.5) 4px 3px 3px;
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
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; */
    text-align: left;
    margin-top: 1em;
    padding: 0 1em;
    /* background: salmon; */
`;

const NavItemContainer = styled.div`
    display: flex;
    align-items: center;
    /* align-content: stretch; */
    /* justify-content: space-between; */
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.7em 1.2em;
`;

const BrowserNavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    padding: 1em 0em;
    /* transition: 0.1s all linear; */
    cursor: pointer;
    /* background: salmon; */
    /* 
    &:hover {
        transform: scale(1.05);
    } */
`;

const BrowserNavLabel = styled.label`
    font-size: 1.5em;
    font-weight: 900;
    font-family: 'Lato', helvetica;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const NavLabel = styled.label`
    font-size: 0.75em;
    font-weight: 400;
    color: ${({ theme }) => theme.NavIconColor};
`;

//Render:

const DashboardNavbar = () => {
    const renderDashboardNavbarComponent = () => {
        if (isMobileOnly) {
            return (
                <MobileOnlyView>
                    <MainContainer>
                        <NavItemContainer>
                            <NavItem
                                to="/stats"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledStatsIcon />
                                <NavLabel>Stats</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/programs"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledBarbellIcon />
                                <NavLabel>Programs</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/dashboard"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledHomeIcon />
                                <NavLabel>Dashboard</NavLabel>
                            </NavItem>
                            <NavItem
                                to="/settings"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
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
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledHomeIcon />
                                <BrowserNavLabel>Dashboard</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/stats"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledStatsIcon />
                                <BrowserNavLabel>Stats</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/programs"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledBarbellIcon />
                                <BrowserNavLabel>Programs</BrowserNavLabel>
                            </BrowserNavItem>
                            <BrowserNavItem
                                to="/settings"
                                activeStyle={{
                                    filter:
                                        'invert(20%) sepia(90%) saturate(4000%) hue-rotate(20deg) brightness(190%) contrast(95%)',
                                }}
                            >
                                <StyledUserCogIcon />
                                <BrowserNavLabel>Settings</BrowserNavLabel>
                            </BrowserNavItem>
                        </BrowserNavItemContainer>
                    </BrowserMainContainer>
                </BrowserView>
            );
        }
    };
    return <>{renderDashboardNavbarComponent()}</>;
};

export default DashboardNavbar;
