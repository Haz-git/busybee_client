import React from 'react';

import styled from 'styled-components';

const MainContainer = styled.div`
    text-align: center;
`;

const MainText = styled.h1`
    color: white;
    font-size: 3em;
`;

const TutorialMain = () => {
    return (
        <MainContainer>
            <MainText>Tutorial Page</MainText>
            <MainText>Under Construction~~</MainText>
        </MainContainer>
    );
};

export default TutorialMain;
