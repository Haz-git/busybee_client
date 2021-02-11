import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import CustomTextField from '../../dashboardComponents/CustomTextField';
import CustomSelector from '../../dashboardComponents/CustomSelector';

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
    display: block;
    /* max-width: 100%;
    width: 100%; */
    animation: ${carouselMovement} 0.3s linear;
`;

const FieldContainer = styled.div``;

const TitleHeader = styled.h1`
    color: white;
    font-size: 1.2em;
`;

//Render:
const PyramidFirstStep = ({
    currentStep,
    nameHandler,
    setHandler,
    valueName,
    valueSet,
}) => {
    return (
        <>
            {currentStep !== 1 ? null : (
                <MainContainer>
                    <TitleHeader>Exercise Name</TitleHeader>
                    <FieldContainer>
                        <CustomTextField
                            type="text"
                            placeholder={
                                valueName !== ''
                                    ? valueName
                                    : 'Exercise name...'
                            }
                            maxlength={17}
                            changeFunc={nameHandler}
                        />
                    </FieldContainer>
                    <TitleHeader>How many sets do you have?</TitleHeader>
                    <FieldContainer>
                        <CustomNumberField
                            placeholder={valueSet !== '' ? valueSet : 'Sets'}
                            changeFunc={setHandler}
                        />
                    </FieldContainer>
                </MainContainer>
            )}
        </>
    );
};

/*
    Unknown invisible textfield and Numfield solved--They need a valid placeholder to show...
*/

export default PyramidFirstStep;
