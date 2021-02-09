import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

//Styles:
import { Running } from '@styled-icons/fa-solid/Running';

//Icons:
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
    width: 95%;
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
    background: salmon;
    width: 95%;
`;

const RepsColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1em;
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

const RepsValue = styled.h3`
    font-family: 'Lato';
    font-size: 7.5em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const WeightValue = styled.h3`
    font-family: 'Lato';
    font-size: 4em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
`;

const SetsContainer = styled.div`
    margin: 0.5em 0;
`;

const SetsValue = styled.h3`
    font-family: 'Lato';
    font-size: 2.6em;
    font-weight: 900;
    color: #046184;
    text-shadow: rgba(0, 0, 0, 1) 0px 3px 5px;
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
    const renderRestOrExercise = () => {
        if (
            restNum !== undefined &&
            restLengthMinutePerSet !== undefined &&
            restLengthSecondPerSet !== undefined
        ) {
            return (
                //Render for rest between sets
                <MainContainer>
                    Rest Period: {restNum}
                    <div>{restLengthMinutePerSet} Minutes</div>
                    <div>{restLengthSecondPerSet} Seconds</div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onPrev}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onNext}
                        >
                            next
                        </Button>
                        {isFinal === true ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onFinish}
                            >
                                Finish
                            </Button>
                        ) : null}
                    </div>
                </MainContainer>
            );
        } else if (restId !== undefined && exerciseId === undefined) {
            return (
                //Render for rest period (larger)
                <MainContainer>
                    <ExerciseContainer>
                        <ItemLabel>Current Exercise</ItemLabel>
                        <ExerciseValue>{exerciseName}</ExerciseValue>
                    </ExerciseContainer>
                    <div>{restLengthMinute} Minutes</div>
                    <div>{restLengthSecond} Seconds</div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onPrev}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onNext}
                        >
                            next
                        </Button>
                        {isFinal === true ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onFinish}
                            >
                                Finish
                            </Button>
                        ) : null}
                    </div>
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
                                <RepsValue>{reps}</RepsValue>
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
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onPrev}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onNext}
                            >
                                next
                            </Button>
                            {isFinal === true ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onFinish}
                                >
                                    Finish
                                </Button>
                            ) : null}
                        </div>
                    </CardContainer>
                </MainContainer>
            );
        }
    };

    return <>{renderRestOrExercise()}</>;
};

export default RunCards;
