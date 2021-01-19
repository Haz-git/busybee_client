import React from 'react';
import { NavLink } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
//Icons:
import { Home } from '@styled-icons/ionicons-solid/Home';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { StatsChart } from '@styled-icons/ionicons-solid/StatsChart';
import { UserCog } from '@styled-icons/fa-solid/UserCog';
import { Barbell } from '@styled-icons/ionicons-outline/Barbell';

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
`;

const NavItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const NavItem = styled(NavLink)`
    padding: 0.8em 0.8em;
`;

//Render:

const DashboardNavbar = () => {
    return (
        <>
            <MainContainer>
                <NavItemContainer>
                    <NavItem to="/made" activeStyle={{ background: '#101530' }}>
                        <StyledCalendarIcon />
                    </NavItem>
                    <NavItem
                        to="/stats"
                        activeStyle={{ background: '#101530' }}
                    >
                        <StyledStatsIcon />
                    </NavItem>
                    <NavItem
                        to="/dashboard"
                        activeStyle={{ background: '#101530' }}
                    >
                        <StyledHomeIcon />
                    </NavItem>
                    <NavItem
                        to="/programs"
                        activeStyle={{ background: '#101530' }}
                    >
                        <StyledBarbellIcon />
                    </NavItem>
                    <NavItem
                        to="/unmade"
                        activeStyle={{ background: '#101530' }}
                    >
                        <StyledUserCogIcon />
                    </NavItem>
                </NavItemContainer>
            </MainContainer>
        </>
    );
};

export default DashboardNavbar;
