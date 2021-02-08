import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

//Styles:

const MainContainer = styled.div`
    /* position: fixed; */
    padding: 0.5em 0.5em;
    background: white;
    color: black;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
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
}) => {
    const renderRestOrExercise = () => {
        console.log(isFinal);
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
                    {exerciseName}
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
                //Render to exercises:
                <MainContainer>
                    {exerciseName}
                    <div>{reps}</div>
                    <div>
                        {currentSet}/{totalSets}
                    </div>
                    <div>{weight}</div>
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
        }
    };

    return <>{renderRestOrExercise()}</>;
};

export default RunCards;
