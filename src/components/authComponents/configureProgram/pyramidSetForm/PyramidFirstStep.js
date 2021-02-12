import React from 'react';
import CustomNumberField from '../../dashboardComponents/CustomNumberField';
import CustomTextField from '../../dashboardComponents/CustomTextField';
import CustomSubmitButton from '../../dashboardComponents/CustomSubmitButton';

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
    margin-top: 2.5em;
    display: block;
    /* max-width: 100%;
    width: 100%; */
    animation: ${carouselMovement} 0.3s linear;
`;

const QuestionContainer = styled.div`
    margin: 2em 0;
`;

const FieldContainer = styled.div`
    margin: 0.8em 0;
`;

const TitleHeader = styled.h1`
    color: white;
    font-size: 1.3em;
    font-family: 'Lato';
    margin: 0;
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
                    <QuestionContainer>
                        <TitleHeader>What's Your Exercise?</TitleHeader>
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
                    </QuestionContainer>
                    <QuestionContainer>
                        <TitleHeader>How Many Sets Do You Have?</TitleHeader>
                        <FieldContainer>
                            <CustomNumberField
                                placeholder={
                                    valueSet !== '' ? valueSet : 'Sets'
                                }
                                changeFunc={setHandler}
                            />
                        </FieldContainer>
                    </QuestionContainer>
                </MainContainer>
            )}
        </>
    );
};

/*
    Unknown invisible textfield and Numfield solved--They need a valid placeholder to show...
*/

export default PyramidFirstStep;
