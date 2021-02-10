import React from 'react';

//Styles:
import styled from 'styled-components';

const TitleHeader = styled.h1`
    color: white;
`;

//Render:
const PyramidFirstStep = ({ currentStep }) => {
    return (
        <>
            {currentStep !== 2 ? null : (
                <TitleHeader>
                    This is the Pyramid's first step, this should include # of
                    sets type of exercise
                </TitleHeader>
            )}
        </>
    );
};

export default PyramidFirstStep;
