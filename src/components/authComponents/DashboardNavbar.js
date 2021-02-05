import React from 'react';
import { NavLink } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
//Icons:
import { Home } from '@styled-icons/ionicons-solid/Home';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { StatsChart } from '@styled-icons/ionicons-solid/StatsChart';
import { UserCog } from '@styled-icons/fa-solid/UserCog';
import { Barbell } from '@styled-icons/ionicons-solid/Barbell';

const StyledHomeIcon = styled(Home)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledCalendarIcon = styled(Calendar)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledStatsIcon = styled(StatsChart)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledUserCogIcon = styled(UserCog)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
`;

const StyledBarbellIcon = styled(Barbell)`
    height: 2em;
    width: 2em;
    color: ${({ theme }) => theme.NavIconColor};
    cursor: pointer;
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
`;

const NavItemContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: stretch;
    justify-content: space-between;
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.7em 1.2em;
`;

const NavLabel = styled.label`
    font-size: 0.75em;
    font-weight: 400;
    color: ${({ theme }) => theme.NavIconColor};
`;

//Render:

const DashboardNavbar = () => {
    return (
        <>
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
                        to="/unmade"
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
        </>
    );
};

export default DashboardNavbar;
