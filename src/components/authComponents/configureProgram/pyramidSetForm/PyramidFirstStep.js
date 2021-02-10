import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import CustomTextField from '../../dashboardComponents/CustomTextField';

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
    max-width: 100%;
    width: 100%;
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
                                valueName !== undefined && valueName !== null
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
                            placeholder={
                                valueSet !== undefined && valueSet !== null
                                    ? valueSet
                                    : 'Sets'
                            }
                            changeFunc={setHandler}
                        />
                    </FieldContainer>
                </MainContainer>
            )}
        </>
    );
};

/*
    I can't understand this for the life of me. For some reason, React is refusing to render CustomTextField and CustomNumberField although it can render out the text. Absolutely frustrating-- I have no idea what is going on. In a previous version it was working perfectly...

*/

export default PyramidFirstStep;
