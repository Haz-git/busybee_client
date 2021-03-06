import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
    background: inherit;
    padding: 0.5em 0.5em;
`;

const HeaderContainer = styled.div`
    margin-bottom: 0.5em;
`;

const Header = styled.h1`
    font-family: 'Lato', 'Nunito';
    font-size: 1.3em;
    color: #fdbc3d;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 3px;

    @media screen and (min-width: 1024px) {
        font-size: 2em;
    }
`;

const DescContainer = styled.div``;

const Desc = styled.p`
    font-family: 'Lato';
    font-size: 0.95em;
    color: white;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 3px;
    @media screen and (min-width: 1024px) {
        font-size: 1.3em;
    }
`;
const GuidedTourContainer = ({ header, desc }) => {
    return (
        <MainContainer>
            <HeaderContainer>
                <Header>{header}</Header>
            </HeaderContainer>
            <DescContainer>
                <Desc>{desc}</Desc>
            </DescContainer>
        </MainContainer>
    );
};

export default GuidedTourContainer;
