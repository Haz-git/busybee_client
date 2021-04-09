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
`;

const DescContainer = styled.div``;

const Desc = styled.p`
    font-family: 'Lato';
    font-size: 0.95em;
    color: white;
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
