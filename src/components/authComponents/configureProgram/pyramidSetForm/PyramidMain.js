import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PyramidFirstStep from './PyramidFirstStep';
import PyramidSecondStep from './PyramidSecondStep';

//Styles:
import styled from 'styled-components';
import {
    HeaderContainer,
    MainHeader,
    ExerciseHeader,
    FlexWrapper,
    BackButton,
    BackIcon,
} from '../ConfigureMain';

const MainContainer = styled.div`
    display: block;
    text-align: center;
`;

const FormContainer = styled.div``;

const ButtonContainer = styled.div``;

const PyramidMain = ({
    match: {
        params: { name, id },
    },
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
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
            <FormContainer></FormContainer>
            <ButtonContainer></ButtonContainer>
        </MainContainer>
    );
};

export default PyramidMain;
