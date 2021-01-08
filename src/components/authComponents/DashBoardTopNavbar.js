import React from 'react';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    background-color: salmon;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
`;

const NavItemContainer = styled.div``;

//Render:

const DashboardTopNavbar = () => {
    return (
        <>
            <MainContainer>
                <NavItemContainer>Bottom navbar components</NavItemContainer>
            </MainContainer>
        </>
    );
};

export default DashboardTopNavbar;
