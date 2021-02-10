import React from 'react';

//Styles:
import styled from 'styled-components';

const TitleHeader = styled.h1`
    color: white;
`;

const PyramidSecondStep = ({ currentStep }) => {
    return (
        <>
            {currentStep !== 2 ? null : (
                <TitleHeader>
                    This is the pyramid's second step. After filling out # of
                    sets and what exercise in the first form, this should
                    dynamically render selectors for reps and weight for each
                    set (as well as selector for lbs or kg)
                </TitleHeader>
            )}
        </>
    );
};

export default PyramidSecondStep;
