import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import historyObject from '../../historyObject';
import { connect } from 'react-redux';
import { addToUserProgramCount } from '../../../redux/userPrograms/userProgramActions';

//Components:
import CreateProgramModal from './CreateProgramModal';
import StatCardModalDelete from '../statsDashboard/StatCardModalDelete';
import ConfirmationModal from '../runProgramDashboard/ConfirmationModal';

//Styles:
import styled from 'styled-components';
import { PlayCircle } from '@styled-icons/boxicons-regular/PlayCircle';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { Numbers } from '@styled-icons/remix-fill/Numbers';
import { Alarm } from '@styled-icons/boxicons-regular/Alarm';

const PlayIcon = styled(PlayCircle)`
    height: 4em;
    width: 4em;
    color: ${({ theme }) => theme.PlayIcon};

    @media screen and (max-width: 320px) {
        height: 3em;
        width: 3em;
    }
`;

const CalendarIcon = styled(Calendar)`
    height: 1.8em;
    width: 1.8em;
    color: ${({ theme }) => theme.ProgramIcon};
`;

const NumberIcon = styled(Numbers)`
    height: 1.8em;
    width: 1.8em;
    color: ${({ theme }) => theme.ProgramIcon};
`;

const AlarmIcon = styled(Alarm)`
    height: 1.8em;
    width: 1.8em;
    color: ${({ theme }) => theme.ProgramIcon};

    //Filter for gold, kept for reference:
    /* filter: invert(39%) sepia(94%) saturate(4424%) hue-rotate(1deg)
        brightness(170%) contrast(104%); */
`;

const ButtonContainer = styled.div``;

const PlayButton = styled.button`
    height: 100%;
    position: absolute;
    margin: auto;
    border: none;
    right: 0;
    top: 0;
    border-top-right-radius: 0.4em;
    padding: 0em 0.5em;
    box-shadow: rgba(0, 0, 0, 0.2) -10px 0px 5px;
    background: #368f1f;
    cursor: pointer;

    &:focus {
        outline: none;
        background: #6cdc4f;
    }

    &:hover {
        outline: none;
        background: #6cdc4f;
    }
`;

const WrapperContainer = styled.div`
    margin-bottom: 1.5em;
    margin-left: 0.2em;
    margin-right: 0.2em;
    /* margin: 2em 0.2em; */
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    max-width: 28em;
`;

const MainContainer = styled.div`
    position: relative;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.ProgramCardBG};
`;

const HeaderContainer = styled.div`
    text-align: left;
    word-break: break-word;
    max-width: 80%;
`;

const NameHeader = styled.h2`
    text-align: left;
    font-family: 'Lato';
    color: ${({ theme }) => theme.ProgramCardHeader};
    font-size: 1.4em;
    font-weight: 900;
    text-shadow: 2px 2px 2px #14181f;

    @media screen and (min-width: 414px) {
        font-size: 1.6em;
    }
`;

const DescContainer = styled.div`
    width: 80%;
    margin: 0.85em 0;
    text-align: left;
    /* text-justify: distribute;
    word-spacing: -2px; */
    word-break: break-all;
`;

const DescText = styled.h3`
    font-size: 0.95em;
    font-family: 'Lato', 'Nunito';
    font-weight: 600;
    color: ${({ theme }) => theme.ProgramCardDesc};

    @media screen and (min-width: 414px) {
        font-size: 1em;
    }
`;

const DetailLabel = styled.p`
    margin: 0 1em;
    font-size: 0.8em;
    font-weight: 700;
    font-family: 'Lato';
    color: ${({ theme }) => theme.ProgramCardDesc};
    text-shadow: 2px 2px 2px #14181f;

    @media screen and (min-width: 414px) {
        font-size: 0.95em;
    }
`;

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: inherit;
    border: none;
    margin: 0.2em 0;
`;

const ExercisesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: inherit;
    border: none;
    margin: 0.2em 0;
`;

const ButtonPlayContainer = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-content: center;
    align-items: center;
    /* padding: 0.75em 0.8em; */
    background: ${({ theme }) => theme.LowerContainerBG};
    border-bottom-left-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
`;

const StyledHr = styled.hr`
    text-align: left;
    border: 1px solid ${({ theme }) => theme.LowerContainerBG};
    width: 82%;
    max-width: 90%;
    margin-bottom: 0.2em;
`;

const DeleteButton = styled.button`
    border: none;
    padding: 0.8em 1.3em;
    background: inherit;
    font-size: 1em;
    font-family: 'Lato', helvetica;
    font-weight: 700;
    color: white;
    border-right: 2px solid ${({ theme }) => theme.ProgramCardBG};
    border-bottom-left-radius: 0.4em;
    border-top-right-radius: 1em;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &:hover {
        outline: none;
    }
`;

const ConfigureButton = styled(Link)`
    border: none;
    padding: 0.68em 1.3em;
    background: inherit;
    font-size: 1em;
    font-family: 'Lato', helvetica;
    font-weight: 700;
    color: white;
    cursor: pointer;
    border-bottom-right-radius: 0.4em;
    border-top-right-radius: 1em;

    &:focus {
        outline: none;
    }

    &:hover {
        outline: none;
    }
`;

const EditButton = styled.button`
    border: none;
    padding: 0.8em 1.3em;
    background: inherit;
    border-right: 2px solid ${({ theme }) => theme.ProgramCardBG};
    font-size: 1em;
    font-family: 'Lato', helvetica;
    font-weight: 700;
    border-top-right-radius: 1em;
    color: white;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &:hover {
        outline: none;
    }
`;

const ProgramCard = ({
    name,
    desc,
    programId,
    programExercises,
    dateCreated,
    editAction,
    deleteAction,
    editProgramSnackbar,
    deleteProgramSnackbar,
    isFormatted,
    addToUserProgramCount,
}) => {
    //States for button on user request:

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //States:
    const [stateRunProgramModal, setStateRunProgramModal] = useState(false);
    const [stateEditModal, setStateEditModal] = useState(false);
    const [editModalName, setEditModalName] = useState(name);
    const [editModalDesc, setEditModalDesc] = useState(desc);
    const [stateDeleteModal, setStateDeleteModal] = useState(false);

    //Callback functions for button and modal on user request:

    const setButtonState = (bool) => {
        setIsButtonDisabled(bool);
    };

    const setEditModalState = (bool) => {
        setStateEditModal(bool);
    };

    const setDeleteModalState = (bool) => {
        setStateDeleteModal(bool);
    };

    //Edit Modal user input event handlers:

    const editModalOpen = () => {
        setStateEditModal(true);
    };

    const editModalClose = () => {
        setStateEditModal(false);
    };

    const handleEditModalName = (e) => {
        setEditModalName(e.target.value);
    };

    const handleEditModalDesc = (e) => {
        setEditModalDesc(e.target.value);
    };

    const resetEditModalDetails = () => {
        setEditModalName(name);
        setEditModalDesc(desc);
    };

    const handleEditModalSubmit = () => {
        if (
            editModalName !== undefined &&
            editModalName !== null &&
            editModalName.trim() !== ''
        ) {
            setIsButtonDisabled(true);
            editAction(
                programId,
                editModalName,
                editModalDesc,
                editProgramSnackbar,
                setButtonState,
                setEditModalState
            );

            resetEditModalDetails();
        } else {
            alert('The name cannot be an empty value.');
        }
    };

    //Delete Modal Input handlers:

    const openDeleteModal = () => {
        setStateDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setStateDeleteModal(false);
    };

    const deleteModalHandler = () => {
        setIsButtonDisabled(true);
        deleteAction(
            programId,
            deleteProgramSnackbar,
            setButtonState,
            setDeleteModalState
        );
    };

    //Delete Modal Input handlers:

    const openRunProgramModal = () => {
        setStateRunProgramModal(true);
    };

    const closeRunProgramModal = () => {
        setStateRunProgramModal(false);
    };

    const runProgramHandler = () => {
        //Increment or add program count:
        addToUserProgramCount(programId);

        //Push to new page to run program:

        historyObject.push(`/runprogram/${name}/${programId}`);
        setStateDeleteModal(false);
    };

    //Utility Functions:

    const findNumberOfExercises = () => {
        return programExercises.length;
    };

    const convertISOToTimeStamp = () => {
        if (dateCreated !== undefined && dateCreated !== null) {
            return dayjs(dateCreated).format('MM/DD/YYYY');
        } else {
            return null;
        }
    };

    const calculateEstimatedTime = () => {
        let totalTime = [];

        programExercises.forEach((exercise) => {
            if (
                exercise.programExerciseType !== 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.setObjectsArray === undefined &&
                exercise.numRest !== undefined &&
                exercise.numRest !== null &&
                exercise.programExerciseId !== undefined &&
                exercise.programExerciseId !== null
            ) {
                //Handles Multi-Set exercises with rest between sets:

                //Find total rest time without exercises:
                const totalSecsFromMin =
                    parseInt(exercise.restLengthMinutePerSet) *
                    60 *
                    parseInt(exercise.numRest);

                const totalSecs =
                    parseInt(exercise.restLengthSecondPerSet) *
                    parseInt(exercise.numRest);

                //estimate time from sets and reps:

                const secsFromRepsAndSets =
                    parseInt(exercise.reps) * 4 * parseInt(exercise.sets);

                const totalRestTimeCombinedSeconds =
                    totalSecsFromMin + totalSecs + secsFromRepsAndSets;

                totalTime.push(totalRestTimeCombinedSeconds);
            } else if (
                exercise.programExerciseType === 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.cardioMinutes !== undefined &&
                exercise.cardioSeconds !== undefined
            ) {
                let timeFromMin;

                if (exercise.cardioMinutes !== null) {
                    timeFromMin = parseInt(exercise.cardioMinutes) * 60;
                } else {
                    timeFromMin = 0;
                }

                let seconds;

                if (exercise.cardioSeconds !== null) {
                    seconds = parseInt(exercise.cardioSeconds);
                } else {
                    seconds = 0;
                }

                const timeCombined = timeFromMin + seconds;

                totalTime.push(timeCombined);
            } else if (
                exercise.programExerciseType !== 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.setObjectsArray !== undefined &&
                exercise.numRest === undefined &&
                exercise.programExerciseId !== undefined
            ) {
                //This should handle pyramid sets without rest between sets:

                let secondsFromReps = [];

                for (let i = 0; i < exercise.setObjectsArray.length; i++) {
                    secondsFromReps.push(
                        parseInt(exercise.setObjectsArray[i].reps) * 4
                    );
                }

                const totalSecondsFromReps = secondsFromReps.reduce(
                    (a, b) => a + b,
                    0
                );

                totalTime.push(totalSecondsFromReps);
            } else if (
                exercise.programExerciseType !== 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.setObjectsArray !== undefined &&
                exercise.numRest !== undefined &&
                exercise.programExerciseId !== undefined
            ) {
                //Handles pyramid sets:

                const totalSecsFromMin =
                    parseInt(exercise.restLengthMinutePerSet) *
                    60 *
                    parseInt(exercise.numRest);

                const totalSecs =
                    parseInt(exercise.restLengthSecondPerSet) *
                    parseInt(exercise.numRest);

                //Find seconds per rep in each set of pyramid:

                let secondsFromReps = [];

                for (let i = 0; i < exercise.setObjectsArray.length; i++) {
                    secondsFromReps.push(
                        parseInt(exercise.setObjectsArray[i].reps) * 4
                    );
                }

                const totalSecondsFromReps = secondsFromReps.reduce(
                    (a, b) => a + b,
                    0
                );

                const totalPyramidSetSeconds =
                    totalSecsFromMin + totalSecs + totalSecondsFromReps;

                totalTime.push(totalPyramidSetSeconds);

                //Combine seconds within secondsFromReps:
            } else if (
                exercise.programExerciseType !== 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.restId !== undefined &&
                exercise.restId !== null
            ) {
                //Handles Rest periods

                let timeFromMin;

                if (exercise.restLengthMinute !== null) {
                    timeFromMin = parseInt(exercise.restLengthMinute) * 60;
                } else {
                    timeFromMin = 0;
                }

                let seconds;

                if (exercise.restLengthSecond !== null) {
                    seconds = parseInt(exercise.restLengthSecond);
                } else {
                    seconds = 0;
                }

                const timeCombined = timeFromMin + seconds;

                totalTime.push(timeCombined);
            } else if (
                exercise.programExerciseType !== 'CARDIO_PROGRAM_EXERCISE' &&
                exercise.programExerciseId !== undefined &&
                exercise.programExerciseId !== null
            ) {
                //Handles single set exercises, or multi set exercises without rest between sets:
                const secsFromRepsAndSets =
                    parseInt(exercise.reps) * 4 * parseInt(exercise.sets);

                totalTime.push(secsFromRepsAndSets);
            }
        });

        let currentCalculatedTimeInSeconds = totalTime.reduce(
            (a, b) => a + b,
            0
        );

        const totalMinutes = Math.floor(
            totalTime.reduce((a, b) => a + b, 0) / 60
        );
        const totalSeconds = totalTime.reduce((a, b) => a + b, 0) % 60;

        return `${totalMinutes}m ${totalSeconds}s`;
    };

    return (
        <>
            <ConfirmationModal
                openBoolean={stateRunProgramModal}
                closeFunction={closeRunProgramModal}
                buttonSubmitFunction={runProgramHandler}
                modalHeader={`${name}`}
                modalDesc="Remember to stay hydrated."
                ariaDesc="Modal for confirming intent to run selected program"
                ariaLabel="Modal for confirming intent to run selected program"
                isFormatted={isFormatted === 'true' ? 'true' : 'false'}
                hasProgramExercises={
                    programExercises !== undefined &&
                    programExercises.length > 0
                        ? true
                        : false
                }
            />
            <StatCardModalDelete
                openBoolean={stateDeleteModal}
                closeFunction={closeDeleteModal}
                buttonSubmitFunction={deleteModalHandler}
                modalDesc="Are you sure you want to delete this program? This action is irreversible, and all program exercises will be deleted."
                ariaDesc="Modal for deleting a program"
                ariaLabel="Modal for deleting a program"
                buttonDisabledState={isButtonDisabled}
            />
            <CreateProgramModal
                ariaDesc="Modal for editing program"
                ariaLabel="Modal for editing program"
                headerLabel="Edit your program"
                openBoolean={stateEditModal}
                closeFunction={editModalClose}
                titleFunction={handleEditModalName}
                descFunction={handleEditModalDesc}
                submitHandler={handleEditModalSubmit}
                namePlaceholder={name}
                descPlaceholder={desc}
                buttonDisabledState={isButtonDisabled}
            />
            <WrapperContainer>
                <MainContainer className="ProgramCard-MainContainer">
                    <PlayButton
                        className="ProgramCard-PlayButton"
                        onClick={openRunProgramModal}
                    >
                        <PlayIcon />
                    </PlayButton>
                    <HeaderContainer>
                        <NameHeader>{name}</NameHeader>
                    </HeaderContainer>
                    <DescContainer>
                        <DescText>{desc}</DescText>
                    </DescContainer>
                    <StyledHr />
                    <ExercisesContainer>
                        <CalendarIcon />
                        <DetailLabel>
                            Created On: {convertISOToTimeStamp()}
                        </DetailLabel>
                    </ExercisesContainer>
                    <DateContainer>
                        <NumberIcon />
                        <DetailLabel>
                            Total Exercises: {findNumberOfExercises()}
                        </DetailLabel>
                    </DateContainer>
                    <DateContainer>
                        <AlarmIcon />
                        <DetailLabel>
                            Estimated Time: {calculateEstimatedTime()}
                        </DetailLabel>
                    </DateContainer>
                </MainContainer>
                <ButtonPlayContainer>
                    <DeleteButton onClick={openDeleteModal}>
                        Delete
                    </DeleteButton>
                    <EditButton onClick={editModalOpen}>Edit</EditButton>
                    <ConfigureButton
                        className="ProgramCard-ConfigureButton"
                        to={`/programs/configure/${name}/${programId}`}
                    >
                        Configure
                    </ConfigureButton>
                </ButtonPlayContainer>
            </WrapperContainer>
        </>
    );
};

export default connect(null, { addToUserProgramCount })(ProgramCard);

/*
    Current BUgs:
    1. Add a new program, add a couple of exercises --> modal allows start without format (sometimes???)
    2. Configure a blueprint, press back fast, and modal doesn't allow... I think its cause it's still loading. Maybe make the modal look at the state slice???
*/
