import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PyramidFirstStep from './PyramidFirstStep';
import PyramidSecondStep from './PyramidSecondStep';
import Button from '@material-ui/core/Button';
import { v4 as uuid } from 'uuid';

//Styles:
import styled, { keyframes } from 'styled-components';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from '../ConfigureMain';

const carouselMovement = keyframes`
    from {
        opacity: 0;
        transform: translate(20%);
    }

    to {
        opacity: 1;
        transform: translate(0,0);
    }
`;

const MainContainer = styled.div`
    display: block;
    text-align: center;
`;

const FormContainer = styled.div`
    padding: 1em 1em;
    width: 100%;
    max-width: 100%;
    height: 17em;
    animation: ${carouselMovement} 0.5s linear;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PyramidMain = ({
    match: {
        params: { name, id },
    },
}) => {
    //Step Handler:
    const [currentStep, setCurrentStep] = useState(1);

    //FirstStep Handler:
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');

    //SecondStep Handler:
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    //Submission Array handler:
    const [pyramidArray, setPyramidArray] = useState([]);

    /*
        Because the text fields are dynamically rendered, we can set the value onChange to be the "set# rep#", append it to an object such as:
        {
            exerciseId
            exerciseName
            setNum
            totalSets
            reps
            weight
        }

        and add it to an array..

    */

    //Pyramid Sorting Function:

    const sortUserPyramidArray = () => {
        return setPyramidArray.sort((a, b) =>
            parseInt(a.setId) > parseInt(b.setId) ? 1 : -1
        );
    };

    //User Input PyramidSecondStep Handlers:
    //Here, create an algorithm to track user's inputs for each weight and rep. Should have the 'setId value', and so we can split() accordingly to obtain the values.

    const handleUserWeightInput = (e) => {
        setWeight(e.target.value);
    };

    const handleUserRepsInput = (e) => {
        setReps(e.target.value);
    };

    //User Input PyramidFirstStep Handlers:

    const handleUserExerciseName = (e) => {
        setExercise(e.target.value);
    };

    const handleUserSetCount = (e) => {
        setSets(e.target.value);
    };
    //Click functions:

    const nextFunction = () => {
        let tempCurrentStep = currentStep;

        if (tempCurrentStep === 1) {
            setCurrentStep(tempCurrentStep + 1);
        }
    };

    const prevFunction = () => {
        let tempCurrentStep = currentStep;

        if (tempCurrentStep === 2) {
            setCurrentStep(tempCurrentStep - 1);
        }
    };

    //Render Buttons:

    const renderNextButton = () => {
        // if (currentStep === 1 && exercise.trim() !== '' && sets.trim() !== '') {
        if (currentStep === 1) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={nextFunction}
                >
                    Next
                </Button>
            );
        } else {
            return null;
        }
    };

    const renderPreviousButton = () => {
        if (currentStep === 2) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={prevFunction}
                >
                    Previous
                </Button>
            );
        } else {
            return null;
        }
    };

    return (
        <MainContainer>
            <HeaderContainer>
                <Link to={`/programs/configure/select/${name}/${id}`}>
                    <BackButton>
                        <BackIcon />
                    </BackButton>
                </Link>
                <FlexWrapper>
                    <MainHeader>{name}</MainHeader>
                    <ExerciseHeader>Create your Pyramid</ExerciseHeader>
                </FlexWrapper>
            </HeaderContainer>
            <FormContainer>
                <form>
                    <PyramidFirstStep
                        currentStep={currentStep}
                        nameHandler={handleUserExerciseName}
                        setHandler={handleUserSetCount}
                        valueName={exercise}
                        valueSet={sets}
                    />
                    <PyramidSecondStep
                        currentStep={currentStep}
                        valueSet={sets}
                        weightHandler={handleUserWeightInput}
                        repHandler={handleUserRepsInput}
                    />
                </form>
            </FormContainer>
            <ButtonContainer>
                {renderPreviousButton()}
                {renderNextButton()}
            </ButtonContainer>
        </MainContainer>
    );
};

export default PyramidMain;
