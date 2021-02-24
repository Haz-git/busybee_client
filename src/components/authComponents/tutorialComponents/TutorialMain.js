import React from 'react';
import Button from '@material-ui/core/Button';
import historyObject from '../../historyObject';

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
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => historyObject.push('/')}
            >
                Return to Dashboard
            </Button>
        </MainContainer>
    );
};

export default TutorialMain;
