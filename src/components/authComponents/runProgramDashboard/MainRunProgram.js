//This component should be immediately rendered after clicking 'Confirm' on program run.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserFormattedProgram } from '../../../redux/userFormattedPrograms/formattedProgramsActions';
import { LoadingContainer } from '../configureProgram/ConfigureMain';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';
import RunCards from '../runProgramDashboard/RunCards';
import FinishModal from './FinishModal';
import historyObject from '../../../components/historyObject';
import { v4 as uuid } from 'uuid';

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

export const CloseIcon = styled(Close)`
    height: 4em;
    width: 4.5em;
`;

const MainContainer = styled.div`
    position: relative;
    display: block;
    text-align: center;
`;

export const AbortButton = styled(BackButton)`
    display: block;
    background: #90130c;
    padding: 0.5em 0.5em;

    &:hover {
        background: #cb484f;
    }
`;

export const AbortLabel = styled.p`
    font-size: 1.2em;
    color: white;
    text-shadow: 2px 2px 2px #14181f;
`;

const RunCardContainer = styled.div``;

/*
    How will I make this page dynamic and interactive?

    Dynamically pre-render the formatted program exercises, and store completion statuses in state... However there's no way to generate a state for each status, so we can either:

    1. Add a number per each exercise completed, and match the numbers afterward
        ^Benefit of this is that we can see how many exercises were done.
    2. Change it entirely to true when all exercises are done..

    Then there's the problem of rendering out each exercise with the appropriate rest between the exercises...I mean formattedExercises are not exactly 'formatted'. To be actually formatted correctly, I think this would mean something like:

    3 Sets 3 Reps of Bench + RestBetweenSets ===
    [Set1, Rest, Set2, Rest, Set3]...Then we can iterate and work something out.

    **Technique: Perhaps the easiest way of implementing this sort-of 'pagination' (move to the next item in the array upon completion) is to include a queue data structure.

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
    const [userProgramSequence, setUserProgramSequence] = useState(null);
    const [exerciseIterator, setExerciseIterator] = useState(0);

    //CompletionState:
    const [statusCompleted, setStatusCompleted] = useState(false);

    useEffect(() => {
        const loadUserFormattedProgram = async () => {
            const bool = await getUserFormattedProgram(id);
            setIsLoaded(bool);
        };

        loadUserFormattedProgram();
    }, []);

    useEffect(() => {
        //When is Loaded is true, we set the user's program sequence into the state:
        if (
            formattedProgram.formattedProgram !== undefined &&
            formattedProgram.formattedProgram !== null &&
            formattedProgram.formattedProgram.formattedProgram !== undefined
        ) {
            setUserProgramSequence(
                formattedProgram.formattedProgram.formattedProgram
                    .programSequence
            );
        }
    }, [isLoaded]);

    const countProgramExercises = () => {
        //Counts the total programs recieved and returns the length.
        if (
            formattedProgram.formattedProgram !== undefined &&
            formattedProgram.formattedProgram !== null
        ) {
            return formattedProgram.formattedProgram.formattedProgram
                .formattedExercises.length;
        }
    };

    const renderRunCards = () => {
        if (userProgramSequence !== null && exerciseIterator !== null) {
            const firstExercise = [userProgramSequence[exerciseIterator]];
            return firstExercise.map((item) => (
                <RunCards
                    key={uuid()}
                    programExerciseType={item.programExerciseType}
                    exerciseName={item.programExerciseName}
                    exerciseId={item.programExerciseId}
                    reps={item.reps}
                    currentSet={item.currentSet}
                    totalSets={item.totalSets}
                    weight={item.weight}
                    onNext={nextHandler}
                    onPrev={prevHandler}
                    restLengthMinutePerSet={item.restLengthMinutePerSet}
                    restLengthSecondPerSet={item.restLengthSecondPerSet}
                    restNum={item.restNum}
                    restLengthMinute={item.restLengthMinute}
                    restLengthSecond={item.restLengthSecond}
                    cardioMinutes={item.cardioMinutes}
                    cardioSeconds={item.cardioSeconds}
                    restId={item.restId}
                    isFinal={statusCompleted}
                    nextExercise={
                        userProgramSequence[exerciseIterator + 1] !==
                            undefined &&
                        userProgramSequence[exerciseIterator + 1] !== null
                            ? userProgramSequence[exerciseIterator + 1]
                            : 'Last Exercise'
                    }
                    prevExercise={
                        userProgramSequence[exerciseIterator - 1] !==
                            undefined &&
                        userProgramSequence[exerciseIterator + 1] !== null
                            ? userProgramSequence[exerciseIterator - 1]
                            : 'No Previous Exercise'
                    }
                />
            ));
        } else {
            return null;
        }
    };

    const nextHandler = () => {
        if (exerciseIterator < userProgramSequence.length - 1) {
            setExerciseIterator(exerciseIterator + 1);
        } else if (exerciseIterator === userProgramSequence.length - 1) {
            setStatusCompleted(true);
        } else {
            setExerciseIterator(userProgramSequence.length - 1);
        }
    };

    const prevHandler = () => {
        if (exerciseIterator > 0) {
            setExerciseIterator(exerciseIterator - 1);
        } else {
            setExerciseIterator(0);
        }
    };

    //Finish Modal Handler:

    const closeFinishModal = () => {
        setStatusCompleted(false);
    };

    const finishSubmit = () => {
        historyObject.push('/programs');
    };

    return (
        <>
            <FinishModal
                openBoolean={statusCompleted}
                closeFunction={closeFinishModal}
                ariaLabel="Modal for program completion"
                ariaDesc="Modal for program completion"
                modalHeader="Well Done!"
                modalDesc={`Congratulations! You've finished the program: ${name}`}
                buttonSubmitFunction={finishSubmit}
            />
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
                        {isLoaded === true ? (
                            <ExerciseHeader>
                                Complete {countProgramExercises()} Exercises
                            </ExerciseHeader>
                        ) : (
                            <LoadingContainer>
                                <CustomLoadingDots />
                            </LoadingContainer>
                        )}
                    </FlexWrapper>
                </HeaderContainer>
                {isLoaded === true ? (
                    <RunCardContainer>{renderRunCards()}</RunCardContainer>
                ) : (
                    <LoadingContainer>
                        <CustomLoadingDots />
                    </LoadingContainer>
                )}
            </MainContainer>
        </>
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
