import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
    /* background: ${({ theme }) => theme.background}; */
    background: salmon;
    /* overflow: hidden; */
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    height: 100%;
    /* padding-left: 8em; */
    z-index: 100 !important;
    box-shadow: rgba(0, 0, 0, 0.2) 10px 0px 6px;
`;

const TestStyle = styled.h1`
    margin: 0;
    color: white;
`;

const MainNewsBoard = () => {
    return (
        <MainContainer>{/* <TestStyle>News Board</TestStyle> */}</MainContainer>
    );
};

export default MainNewsBoard;
