import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import SetConfig from './SetConfig';

//Styles:
import styled, { keyframes } from 'styled-components';

const carouselMovement = keyframes`
    from {
        opacity: 0;
        transform: translate(2%);
    }

    to {
        opacity: 1;
        transform: translate(0,0);
    }
`;

const MainContainer = styled.div`
    animation: ${carouselMovement} 0.3s linear;
`;
const TitleHeader = styled.h1`
    color: white;
    font-size: 1em;
`;

const PyramidSecondStep = ({ currentStep }) => {
    return (
        <>
            {currentStep !== 2 ? null : (
                <MainContainer>
                    <SetConfig />
                </MainContainer>
            )}
        </>
    );
};

export default PyramidSecondStep;
