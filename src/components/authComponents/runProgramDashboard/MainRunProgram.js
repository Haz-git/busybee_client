//This component should be immediately rendered after clicking 'Confirm' on program run.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserFormattedProgram } from '../../../redux/userFormattedPrograms/formattedProgramsActions';
import { LoadingContainer } from '../configureProgram/ConfigureMain';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';

//Styles:
import styled from 'styled-components';
import {
    HeaderContainer,
    BackButton,
    FlexWrapper,
    MainHeader,
    ExerciseHeader,
} from '../configureProgram/ConfigureMain';

import { Close } from '@styled-icons/ionicons-solid/Close';

const CloseIcon = styled(Close)`
    height: 4em;
    width: 4.5em;
`;

const MainContainer = styled.div`
    position: relative;
    display: block;
    text-align: center;
`;

const AbortButton = styled(BackButton)`
    display: block;
    background: #90130c;
    padding: 0.5em 0.5em;

    &:hover {
        background: #cb484f;
    }
`;

const AbortLabel = styled.p`
    font-size: 1.2em;
    color: white;
    text-shadow: 2px 2px 2px #14181f;
`;

/*
    How will I make this page dynamic and interactive?

    Dynamically pre-render the formatted program exercises, and store completion statuses in state... However there's no way to generate a state for each status, so we can either:

    1. Add a number per each exercise completed, and match the numbers afterward
        ^Benefit of this is that we can see how many exercises were done.
    2. Change it entirely to true when all exercises are done..

    Then there's the problem of rendering out each exercise with the appropriate rest between the exercises...I mean formattedExercises are not exactly 'formatted'. To be actually formatted correctly, I think this would mean something like:

    3 Sets 3 Reps of Bench + RestBetweenSets ===
    [Set1, Rest, Set2, Rest, Set3]...Then we can iterate and work something out.


    ///Features of this page:

    a. Should load how many exercises need to complete OR already completed.
    b. Should load NEXT exercise on display for user.
    c. Should display a timer --> I'm thinking a stopwatch to time yourself through the program. A clock may be redundant because IOS shows the time up top.
    d. A simple 'slide' feature that progresses to the next exercise (or a button)
    e. When performing an exercise:
        1. On existing stats--have an ability to update your record
        2. On new stats--have an ability to add that stat to stat log, along with record
        3. On main lift--have an ability to add a new record to main lift.
    

*/

const MainRunProgram = ({
    match: {
        params: { name, id },
    },
    formattedProgram,
    getUserFormattedProgram,
}) => {
    //LoaderState:
    const [isLoaded, setIsLoaded] = useState(false);

    //CompletionState:
    const [statusCompleted, setStatusCompleted] = useState(0);

    useEffect(() => {
        const loadUserFormattedProgram = async () => {
            const bool = await getUserFormattedProgram(id);
            setIsLoaded(bool);
        };

        loadUserFormattedProgram();
    }, []);

    const countProgramExercises = () => {
        if (
            formattedProgram.formattedProgram !== null &&
            formattedProgram.formattedProgram !== undefined
        ) {
            return formattedProgram.formattedProgram.formattedProgram
                .formattedExercises.length;
        }
    };

    return (
        <MainContainer>
            <HeaderContainer>
                <Link to="/programs">
                    <AbortButton>
                        <CloseIcon />
                        <AbortLabel>Abort</AbortLabel>
                    </AbortButton>
                </Link>
                <FlexWrapper>
                    <MainHeader>{name}</MainHeader>
                    <ExerciseHeader>
                        Complete {countProgramExercises()} Exercises
                    </ExerciseHeader>
                </FlexWrapper>
            </HeaderContainer>
            {isLoaded === true ? (
                <>LOADED</>
            ) : (
                <LoadingContainer>
                    <CustomLoadingDots />
                </LoadingContainer>
            )}
        </MainContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        formattedProgram: state.formattedProgram,
    };
};

export default connect(mapStateToProps, { getUserFormattedProgram })(
    MainRunProgram
);
