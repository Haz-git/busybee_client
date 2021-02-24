import React from 'react';

import styled from 'styled-components';

const MainContainer = styled.div``;

const MainText = styled.h1`
    color: white;
    font-size: 3em;
`;

const TutorialMain = () => {
    return (
        <MainContainer>
            <MainText>Tutorial Page</MainText>
        </MainContainer>
    );
};

export default TutorialMain;
