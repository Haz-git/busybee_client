import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import Button from '@material-ui/core/Button';
import Countdown from 'react-countdown';

//Styles:
import { Running } from '@styled-icons/fa-solid/Running';
import { ArrowLeftCircle } from '@styled-icons/feather/ArrowLeftCircle';
import { ArrowRightCircle } from '@styled-icons/feather/ArrowRightCircle';
import { Coffee } from '@styled-icons/fa-solid/Coffee';
//Icons:

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const CoffeeIcon = styled(Coffee)`
    height: 3em;
    width: 3em;
    color: white;
    margin-right: 1em;
`;

const ArrowLeft = styled(ArrowLeftCircle)`
    height: 5.5em;
    width: 5.5em;
    color: #fdbc3d;
`;

const ArrowRight = styled(ArrowRightCircle)`
    height: 5.5em;
    width: 5.5em;
    color: #fdbc3d;
`;

const ExerciseIcon = styled(Running)`
    height: 3em;
    width: 3em;
    color: white;
    margin-right: 1em;
`;

const MainContainer = styled.div`
    /* position: fixed; */
    /* background: inherit; */
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8em; */
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1em 1em;
`;

const ExerciseContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #026117;
    padding: 0.7em 0.7em;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    width: 100%;
    /* box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 5px; */
`;

const ItemLabel = styled.h3`
    display: flex;
    justify-content: center;
    /* align-items: baseline; */
    /* justify-content: center; */
    font-family: 'Lato';
    font-size: 1em;
    font-weight: 900;
    color: white;
`;

const ExerciseValue = styled.h3`
    display: flex;
    font-family: 'Lato';
    font-size: 2em;
    font-weight: 900;
    color: white;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const RepsContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-evenly;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 5px;
    background: #080f1a;
    width: 100%;
    padding: 3em 1em;
    border-bottom-left-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
    height: 16em;
`;

const TimerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 5px;
    background: #080f1a;
    width: 100%;
    padding: 3em 1em;
    border-bottom-left-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
    height: 16em;
`;

const RepsColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: baseline; */

    /* margin: 0 1em; */
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DetailsContainer = styled.div`
    text-align: center;
`;

const RepsValueReduced = styled.h3`
    font-family: 'Lato';
    font-size: 4.5em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    margin: -0.175em 0;
    padding: 0;
`;

const RepsValue = styled.h3`
    font-family: 'Lato';
    font-size: 10em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    margin: -0.175em 0;
    padding: 0;
`;

const WeightValue = styled.h3`
    font-family: 'Lato';
    font-size: 3.5em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const SetsValue = styled.h3`
    font-family: 'Lato';
    font-size: 2.6em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: salmon; */
    margin: 1em 0;
    width: 100%;
`;

const ButtonDivider = styled.div`
    width: 100%;
`;

const MoveButton = styled.button`
    background: #27303f;
    border: none;
    border-radius: 50%;
    padding: 0.7em 0.7em;
    box-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const StyledCountdown = styled(Countdown)`
    color: white;
    font-family: 'Lato';
    font-size: 3.5em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const PrevExerciseLabel = styled.h4`
    margin-top: 0.2em;
    font-weight: 900;
    font-size: 1.1em;
    color: red;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    color: ${({ theme }) => theme.AddMoreLabelC};
    white-space: nowrap;
`;

const NextExerciseLabel = styled.h4`
    margin-top: 0.2em;
    font-weight: 900;
    font-size: 1.1em;
    color: green;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    white-space: nowrap;
`;

const BreakLabel = styled.p`
    color: white;
    font-family: 'Lato';
    font-size: 1.4em;
    font-weight: 900;
    margin-bottom: 0.5em;
`;

const EndRestLabel = styled.p`
    margin-top: 0.4em;
    color: red;
    font-size: 1.2em;
    font-weight: 900;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    opacity: 1;
    animation: ${fadeIn} 0.5s ease;
`;

const EndRestLabelInvis = styled.p`
    margin-top: 0.4em;
    color: red;
    font-size: 1.2em;
    font-weight: 900;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
    opacity: 0;
`;

//Render:

const RunCards = ({
    exerciseName,
    exerciseId,
    reps,
    currentSet,
    totalSets,
    weight,
    restNum,
    restLengthMinutePerSet,
    restLengthSecondPerSet,
    onNext,
    restId,
    restLengthMinute,
    restLengthSecond,
    isFinal,
    onPrev,
    onFinish,
    nextExercise,
    prevExercise,
}) => {
    useEffect(() => {
        //Since it appears that renderEndRest's state is conserved because the entire program sequence is mounted, we have to refresh the timer after every next button. In no way is this efficient, but it is progress. The ExerciseID should never be exactly the same, and so we can count on this value changing and causeing the useEffect hook to trigger a reset to the renderEndRest state..
        setRenderEndRest(false);
    }, [exerciseId]);

    //State for timer completion render:
    const [renderEndRest, setRenderEndRest] = useState(false);

    //Utility functions:

    const processPrevExercise = () => {
        if (prevExercise === 'No Previous Exercise') {
            return 'None';
        } else if (
            prevExercise.programExerciseName !== undefined &&
            prevExercise.programExerciseName !== null
        ) {
            return prevExercise.programExerciseName;
        } else if (
            prevExercise.restNum !== undefined &&
            prevExercise.restNum !== null
        ) {
            return 'Rest';
        }
    };

    const processNextExercise = () => {
        if (
            nextExercise.programExerciseName !== undefined &&
            nextExercise.programExerciseName !== null
        ) {
            return nextExercise.programExerciseName;
        } else if (
            nextExercise.restNum !== undefined &&
            nextExercise.restNum !== null
        ) {
            return 'Rest';
        } else if (nextExercise === 'Last Exercise') {
            return 'Finish!';
        }
    };

    //Processes required time in seconds for react-countdown:

    const processTime = () => {
        let totalSeconds;

        const secondsFromMinutes = parseInt(restLengthMinutePerSet) * 60;
        const seconds = parseInt(restLengthSecondPerSet);
        totalSeconds = secondsFromMinutes + seconds;

        return totalSeconds * 1000;
    };

    //Processes time for longer rest periods for react-countdown:

    const processTimeRestPeriod = () => {
        let totalSeconds;

        const secondsFromMinutes = parseInt(restLengthMinute) * 60;
        const seconds = parseInt(restLengthSecond);
        totalSeconds = secondsFromMinutes + seconds;

        return totalSeconds * 1000;
    };

    //Completion render function when timer is finished.

    const onTimerCompletion = () => {
        setRenderEndRest(true);
    };

    //Renders the error label on timer end:

    const renderTimerCompleteLabel = () => {
        if (renderEndRest === false) {
            return (
                <EndRestLabelInvis>
                    Your rest period has ended. Please move on to the next
                    exercise.
                </EndRestLabelInvis>
            );
        } else if (renderEndRest === true) {
            return (
                <EndRestLabel>
                    Your rest period has ended. Please move on to the next
                    exercise.
                </EndRestLabel>
            );
        }
    };

    //Calculates the length of reps --> If the reps exceed double digits, then we change the rendering of the reps container to accomodate font-size:

    const calculateRepsLength = () => {
        if (reps.length >= 2) {
            return <RepsValueReduced>{reps}</RepsValueReduced>;
        } else {
            return <RepsValue>{reps}</RepsValue>;
        }
    };

    const renderRestOrExercise = () => {
        if (
            restNum !== undefined &&
            restLengthMinutePerSet !== undefined &&
            restLengthSecondPerSet !== undefined
        ) {
            return (
                //Render for rest between sets
                <MainContainer>
                    <CardContainer>
                        <ExerciseContainer>
                            <CoffeeIcon />
                            <ExerciseValue>
                                Rest Period - {restNum}
                            </ExerciseValue>
                        </ExerciseContainer>
                        <TimerContainer>
                            <BreakLabel>Remember to stretch!</BreakLabel>
                            <StyledCountdown
                                precision={0}
                                date={Date.now() + processTime()}
                                onComplete={onTimerCompletion}
                            />
                            {renderTimerCompleteLabel()}
                        </TimerContainer>
                        <ButtonContainer>
                            <ButtonDivider>
                                <MoveButton onClick={onPrev}>
                                    <ArrowLeft />
                                </MoveButton>
                                <PrevExerciseLabel>
                                    {processPrevExercise()}
                                </PrevExerciseLabel>
                            </ButtonDivider>
                            <ButtonDivider>
                                <MoveButton onClick={onNext}>
                                    <ArrowRight />
                                </MoveButton>
                                <NextExerciseLabel>
                                    {processNextExercise()}
                                </NextExerciseLabel>
                            </ButtonDivider>
                        </ButtonContainer>
                    </CardContainer>
                </MainContainer>
            );
        } else if (restId !== undefined && exerciseId === undefined) {
            return (
                //Render for rest period (larger)
                <MainContainer>
                    <CardContainer>
                        <ExerciseContainer>
                            <CoffeeIcon />
                            <ExerciseValue>{exerciseName}</ExerciseValue>
                        </ExerciseContainer>
                        <TimerContainer>
                            <BreakLabel>Take a stroll !</BreakLabel>
                            <StyledCountdown
                                precision={0}
                                date={Date.now() + processTimeRestPeriod()}
                                onComplete={onTimerCompletion}
                            />
                            {renderTimerCompleteLabel()}
                        </TimerContainer>
                        <ButtonContainer>
                            <ButtonDivider>
                                <MoveButton onClick={onPrev}>
                                    <ArrowLeft />
                                </MoveButton>
                                <PrevExerciseLabel>
                                    {processPrevExercise()}
                                </PrevExerciseLabel>
                            </ButtonDivider>
                            <ButtonDivider>
                                <MoveButton onClick={onNext}>
                                    <ArrowRight />
                                </MoveButton>
                                <NextExerciseLabel>
                                    {processNextExercise()}
                                </NextExerciseLabel>
                            </ButtonDivider>
                        </ButtonContainer>
                    </CardContainer>
                </MainContainer>
            );
        } else {
            return (
                //Render for exercises:
                <MainContainer>
                    <CardContainer>
                        <ExerciseContainer>
                            <ExerciseIcon />
                            <ExerciseValue>{exerciseName}</ExerciseValue>
                        </ExerciseContainer>
                        <RepsContainer>
                            <RepsColumnContainer>
                                {calculateRepsLength()}
                                <ItemLabel>Reps</ItemLabel>
                            </RepsColumnContainer>
                            <FlexWrapper>
                                <DetailsContainer>
                                    <SetsValue>
                                        {currentSet}/{totalSets}
                                    </SetsValue>
                                    <ItemLabel>Set</ItemLabel>
                                </DetailsContainer>
                                <DetailsContainer>
                                    <WeightValue>{weight}</WeightValue>
                                    <ItemLabel>Weight (Lb)</ItemLabel>
                                </DetailsContainer>
                            </FlexWrapper>
                        </RepsContainer>
                        <ButtonContainer>
                            <ButtonDivider>
                                <MoveButton onClick={onPrev}>
                                    <ArrowLeft />
                                </MoveButton>
                                <PrevExerciseLabel>
                                    {processPrevExercise()}
                                </PrevExerciseLabel>
                            </ButtonDivider>
                            <ButtonDivider>
                                <MoveButton onClick={onNext}>
                                    <ArrowRight />
                                </MoveButton>
                                <NextExerciseLabel>
                                    {processNextExercise()}
                                </NextExerciseLabel>
                            </ButtonDivider>
                        </ButtonContainer>
                    </CardContainer>
                </MainContainer>
            );
        }
    };

    return <>{renderRestOrExercise()}</>;
};

export default RunCards;
