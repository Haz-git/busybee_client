import React, { useState } from 'react';
import TimeSelectModal from './TimeSelectModal';

//Constants:
import {
    NEW_PROGRAM_EXERCISE,
    MAIN_LIFT_PROGRAM_EXERCISE,
    EXISTING_STAT_PROGRAM_EXERCISE,
    PYRAMID_PROGRAM_EXERCISE,
    CARDIO_PROGRAM_EXERCISE,
} from './programExerciseConstants';

//Redux:
import { connect } from 'react-redux';
import {
    deleteProgramExercise,
    deleteRestPeriod,
    addNewRestPeriodBetweenSets,
} from '../../../redux/userProgramExercises/programExerciseActions';

//styles:
import styled, { keyframes } from 'styled-components';
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';
import { Remove } from '@styled-icons/material/Remove';
import StatCardModalDelete from '../statsDashboard/StatCardModalDelete';
import { Zzz } from '@styled-icons/remix-line/Zzz';
import { ChevronRight } from '@styled-icons/entypo/ChevronRight';

import { NewReleases } from '@styled-icons/material-sharp/NewReleases';
import { Notepad } from '@styled-icons/boxicons-solid/Notepad';
import { Columns } from '@styled-icons/boxicons-regular/Columns';
import { Pyramid } from '@styled-icons/boxicons-solid/Pyramid';
import { Run } from '@styled-icons/boxicons-regular/Run';

//Keyframes:

const appearLeft = keyframes`
    from {
        translateX(-1rem);
    }

    to {
        translateX(0);
    }
`;

//Icons:

const MiniPyramidIcon = styled(Pyramid)`
    height: 1.5em;
    width: 1.6em;
    color: white;
    @media screen and (min-width: 414px) {
        height: 1.8em;
        width: 1.9em;
    }
`;

const MiniNewIcon = styled(NewReleases)`
    height: 1.5em;
    width: 1.6em;
    color: white;
    @media screen and (min-width: 414px) {
        height: 1.8em;
        width: 1.9em;
    }
`;

const MiniRunIcon = styled(Run)`
    height: 1.5em;
    width: 1.6em;
    color: white;
    @media screen and (min-width: 414px) {
        height: 1.8em;
        width: 1.9em;
    }
`;

const MiniLogIcon = styled(Notepad)`
    height: 1.5em;
    width: 1.6em;
    color: white;
    @media screen and (min-width: 414px) {
        height: 1.8em;
        width: 1.9em;
    }
`;

const MiniMainLiftIcon = styled(Columns)`
    height: 1.5em;
    width: 1.6em;
    color: white;
    @media screen and (min-width: 414px) {
        height: 1.8em;
        width: 1.9em;
    }
`;

const EditIcon = styled(EditOutline)`
    height: 1.5em;
    width: 1.6em;
`;

const RestIcon = styled(Zzz)`
    height: 1.4rem;
    width: 1.4rem;
    transition: all 0.3s ease-in-out;
`;

const DelIcon = styled(Remove)`
    height: 1.4rem;
    width: 1.4rem;
    transition: all 0.3s ease-in-out;
`;

const RightIcon = styled(ChevronRight)`
    height: 1.5em;
    width: 1.5em;
    color: #fdbc3d;

    transition: all 0.3s ease-in-out;
`;

const WrapperContainer = styled.div`
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 90% 10%;
    margin: 1.2em 0;
    transition: all 0.3s ease-in-out;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    background: #27303f;
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    transition: all 0.3s ease-in-out;
    z-index: 20;
    max-width: 100%;
`;

const PushoverContainer = styled.div`
    max-width: 4rem;
    width: 4rem;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    max-height: 100%;
    z-index: 2;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PushoverButton = styled.button`
    height: 100%;
    border: none;
    /* border-radius: 50%; */
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #1a222f;
    font-size: 1em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    /* margin: 0.3em 0.3em; */
    color: white;
    cursor: pointer;
    z-index: 1;
    width: 100%;

    &:focus {
        outline: none;
        background: #1a222f;
    }

    &:hover {
        outline: none;
        background: #1a222f;
    }
`;

const HeaderBlock = styled.div`
    position: relative;
    background: #081120;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    padding: 0.6em 1.8em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: all 0.3s ease-in-out;
    border-bottom: 1px solid #1a222f;
`;

const HeaderText = styled.h2`
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #fcac49;
    font-size: 1.2em;
    margin-left: 0.4rem;
    /* max-width: 80%; */
    word-break: break-word;
    @media screen and (min-width: 414px) {
        font-size: 1.35em;
    }
`;

const InfoBlock = styled.div`
    padding: 0.3em 0.8em;
    background: #081120;
`;

const InfoText = styled.h3`
    padding: 0.2em 0.2em;
    color: white;
    font-size: 1.025em;
    /* white-space: nowrap; */
    @media screen and (min-width: 414px) {
        font-size: 1.1em;
    }
`;

const DetailContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    justify-content: space-between;
`;

const TimeContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const RestPerSetContainer = styled.div`
    display: block;
    background: #121e31;
    border-radius: 0.5em;
    margin: 0.3em 0;
    padding: 0.2em 0.4em;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 4px;
`;

const DeleteButton = styled.button`
    border: none;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #90130c;
    font-size: 1em;
    color: white;
    cursor: pointer;
    height: 100%;
    width: 100%;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    transition: all 0.3s ease-in-out;

    &:focus {
        outline: none;
        background: #cb484f;
    }

    &:hover {
        outline: none;
        background: #cb484f;
    }
`;

const EditButton = styled.button`
    border: none;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #3041ad;
    font-size: 1em;
    color: white;
    cursor: pointer;
    height: 100%;
    width: 100%;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    transition: all 0.3s ease-in-out;

    &:focus {
        outline: none;
        background: #346d98;
    }

    &:hover {
        outline: none;
        background: #346d98;
    }
`;

const ButtonContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* max-width: 0; */
    background: #1a222f;
    z-index: 1;
    transition: all 0.3s ease-in-out;
`;

const ObjectArrayContainer = styled.div`
    display: block;
`;

const ObjectArrayItem = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    margin: 0.1em 0;
`;

const ObjectArrayText = styled.h3`
    padding: 0.2em 0.2em;
    color: white;
    font-size: 1.025em;
    @media screen and (min-width: 414px) {
        font-size: 1.1em;
    }
`;

const IconDiv = styled.div`
    position: absolute;
    top: 0.6rem;
    left: 0.2rem;
`;

//Render:

const ProgramExerciseCard = ({
    number,
    name,
    sets,
    reps,
    weight,
    deleteSnackBar,
    deleteRestSnackBar,
    exerciseId,
    restId,
    programId,
    deleteProgramExercise,
    minutes,
    seconds,
    deleteRestPeriod,
    addNewRestPeriodBetweenSets,
    restMinutesPerSet,
    restSecondsPerSet,
    restNum,
    programExerciseType,
    setObjectsArray,
    cardioMinutes,
    cardioSeconds,
}) => {
    //State for controlling button expanse:

    const [stateButtonExpand, setStateButtonExpand] = useState(false);

    const [stateRestTimeSelectModal, setStateRestTimeSelectModal] = useState(
        false
    );
    const [userMin, setUserMin] = useState(null);
    const [userSec, setUserSec] = useState(null);

    const [
        stateDeleteProgramExerciseModal,
        setStateDeleteProgramExerciseModal,
    ] = useState(false);

    //Controller functions for deletion modal:

    const openDeleteProgramExerciseModal = () => {
        setStateDeleteProgramExerciseModal(true);
    };

    const closeDeleteProgramExerciseModal = () => {
        setStateDeleteProgramExerciseModal(false);
    };

    const onDeleteProgramExerciseConfirmation = () => {
        deleteProgramExercise(programId, exerciseId, deleteSnackBar);
        setStateDeleteProgramExerciseModal(false);
    };

    const onDeleteProgramRestConfirmation = () => {
        deleteRestPeriod(programId, restId, deleteRestSnackBar);
        setStateDeleteProgramExerciseModal(false);
    };

    //Controller functions for rest period modal:

    const openRestModal = () => {
        if (parseInt(sets) > 1) {
            setStateRestTimeSelectModal(true);
        } else if (
            setObjectsArray !== undefined &&
            setObjectsArray.length > 1 &&
            sets === undefined
        ) {
            //This conditional checks for a pyramid set.
            setStateRestTimeSelectModal(true);
        } else if (
            setObjectsArray !== undefined &&
            setObjectsArray.length <= 1 &&
            sets === undefined
        ) {
            //This conditional checks for a pyramid set with a single set.
            setStateRestTimeSelectModal(false);
            alert(
                'You cannot place rest periods between a single set. Please add a rest block!'
            );
        } else if (parseInt(sets) <= 1) {
            setStateRestTimeSelectModal(false);
            alert(
                'You cannot place rest periods between a single set. Please add a rest block!'
            );
        } else if (restId !== undefined && sets === undefined) {
            setStateRestTimeSelectModal(false);
            alert(
                `We're sorry, you can't place rest periods inside of a rest block.`
            );
        } else if (programExerciseType === 'CARDIO_PROGRAM_EXERCISE') {
            setStateRestTimeSelectModal(false);
            alert(
                `We're sorry, you can't place rest periods inside of a cardio block.`
            );
        }
    };

    const closeRestModal = () => {
        setStateRestTimeSelectModal(false);
    };

    const handleUserMins = (e) => {
        setUserMin(e.target.value);
    };

    const handleUserSec = (e) => {
        setUserSec(e.target.value);
        console.log(typeof e.target.value);
    };

    const handleUserSubmit = () => {
        //Check if userMin or userSec is empty:
        if (
            (userMin === null && userSec === null) ||
            (userMin === '' && userSec === '')
        ) {
            alert('Please input desired values for rest between sets!');
        } else {
            addNewRestPeriodBetweenSets(
                programId,
                exerciseId,
                userMin,
                userSec
            );
        }
    };

    //Render Set Object Array if the exercise is a Pyramid Set:

    const renderSetObjectArrayDetails = () => {
        if (setObjectsArray !== undefined && setObjectsArray.length !== 0) {
            return setObjectsArray.map((set) => (
                <ObjectArrayItem>
                    <ObjectArrayText>Set: {set.setId}</ObjectArrayText>
                    <ObjectArrayText>Reps: {set.reps}</ObjectArrayText>
                    <ObjectArrayText>
                        {set.weight}{' '}
                        {set.unit !== undefined && set.unit !== null
                            ? set.unit
                            : 'Lbs'}
                    </ObjectArrayText>
                </ObjectArrayItem>
            ));
        }
    };

    //Renders the mini card icon:
    const renderMiniCardIcon = () => {
        switch (programExerciseType) {
            case NEW_PROGRAM_EXERCISE:
                return <MiniNewIcon />;
                break;

            case EXISTING_STAT_PROGRAM_EXERCISE:
                return <MiniLogIcon />;
                break;

            case PYRAMID_PROGRAM_EXERCISE:
                return <MiniPyramidIcon />;
                break;

            case MAIN_LIFT_PROGRAM_EXERCISE:
                return <MiniMainLiftIcon />;
                break;
            case CARDIO_PROGRAM_EXERCISE:
                return <MiniRunIcon />;
                break;
            default:
                return null;
        }
    };

    //Controls button expanding and retracting:

    const toggleOptionsContainer = () => {
        setStateButtonExpand(!stateButtonExpand);
    };

    return (
        <>
            <WrapperContainer
                style={
                    stateButtonExpand === false
                        ? {
                              maxWidth: '100%',
                          }
                        : {
                              maxWidth: '90%',
                          }
                }
            >
                <MainContainer
                    style={
                        stateButtonExpand === false
                            ? {
                                  borderBottomRightRadius: '.5em',
                                  borderTopRightRadius: '.5em',
                              }
                            : {
                                  borderBottomRightRadius: '0',
                                  borderTopRightRadius: '0',
                              }
                    }
                >
                    <HeaderBlock
                        style={
                            stateButtonExpand === false
                                ? {
                                      borderTopLeftRadius: '.5em',
                                      borderTopRightRadius: '.5em',
                                  }
                                : {
                                      borderTopLeftRadius: '0',
                                      borderTopRightRadius: '0',
                                  }
                        }
                    >
                        <IconDiv>{renderMiniCardIcon()}</IconDiv>
                        <HeaderText>{name}</HeaderText>
                    </HeaderBlock>
                    <InfoBlock>
                        <DetailContainer>
                            {sets && <InfoText>Sets: {sets}</InfoText>}
                            {reps && <InfoText>Reps: {reps}</InfoText>}
                            {weight && <InfoText>Weight: {weight}</InfoText>}
                        </DetailContainer>
                        <ObjectArrayContainer>
                            {renderSetObjectArrayDetails()}
                        </ObjectArrayContainer>
                        {restMinutesPerSet && restNum && restSecondsPerSet && (
                            <RestPerSetContainer>
                                <InfoText>
                                    Total Rest Periods: {restNum}
                                </InfoText>
                                <InfoText>
                                    Rest Length: {restMinutesPerSet}m{' '}
                                    {restSecondsPerSet}s
                                </InfoText>
                            </RestPerSetContainer>
                        )}
                        <TimeContainer>
                            {minutes && <InfoText>Minutes: {minutes}</InfoText>}
                            {seconds && <InfoText>Seconds: {seconds}</InfoText>}
                            {cardioMinutes && (
                                <InfoText>Minutes: {cardioMinutes}</InfoText>
                            )}
                            {cardioSeconds && (
                                <InfoText>Seconds: {cardioSeconds}</InfoText>
                            )}
                        </TimeContainer>
                    </InfoBlock>
                </MainContainer>
                <PushoverContainer
                    style={
                        stateButtonExpand === false
                            ? {
                                  transform: 'translateX(-60%)',
                                  visibility: 'visible',
                              }
                            : {
                                  transform: 'translateX(0)',
                                  maxHeight: '100%',
                                  visibility: 'visible',
                              }
                    }
                >
                    <ButtonContainer>
                        <EditButton
                            onClick={openRestModal}
                            style={
                                stateButtonExpand === false
                                    ? {
                                          borderTopRightRadius: '.5em',
                                          borderBottomRightRadius: '.5em',
                                      }
                                    : {
                                          borderTopRightRadius: '0',
                                          borderBottomRightRadius: '0',
                                      }
                            }
                        >
                            <RestIcon />
                        </EditButton>
                        <DeleteButton
                            onClick={openDeleteProgramExerciseModal}
                            style={
                                stateButtonExpand === false
                                    ? {
                                          borderTopRightRadius: '.5em',
                                          borderBottomRightRadius: '.5em',
                                      }
                                    : {
                                          borderTopRightRadius: '0',
                                          borderBottomRightRadius: '0',
                                      }
                            }
                        >
                            <DelIcon />
                        </DeleteButton>
                    </ButtonContainer>
                    <PushoverButton onClick={toggleOptionsContainer}>
                        <RightIcon
                            style={
                                stateButtonExpand === false
                                    ? {
                                          transformOrigin: 'center',
                                          transform: 'rotateZ(0deg)',
                                      }
                                    : {
                                          transformOrigin: 'center',
                                          transform: 'rotateZ(180deg)',
                                      }
                            }
                        />
                    </PushoverButton>
                </PushoverContainer>
            </WrapperContainer>
            {exerciseId && (
                <StatCardModalDelete
                    openBoolean={stateDeleteProgramExerciseModal}
                    closeFunction={closeDeleteProgramExerciseModal}
                    buttonSubmitFunction={onDeleteProgramExerciseConfirmation}
                    modalDesc="Confirm deletion of exercise"
                    ariaLabel="program exercise delete modal"
                    ariaDesc="program exercise delete modal"
                />
            )}
            {exerciseId && (
                <TimeSelectModal
                    openBoolean={stateRestTimeSelectModal}
                    closeFunction={closeRestModal}
                    ariaLabel="Modal for adding a rest period between sets"
                    ariaDesc="Modal for adding a rest period between sets"
                    modalHeader="Rest Between Sets"
                    modalDesc="Add a rest period between your sets!"
                    minHandler={handleUserMins}
                    secHandler={handleUserSec}
                    buttonSubmitFunction={handleUserSubmit}
                />
            )}

            {restId && (
                <StatCardModalDelete
                    openBoolean={stateDeleteProgramExerciseModal}
                    closeFunction={closeDeleteProgramExerciseModal}
                    buttonSubmitFunction={onDeleteProgramRestConfirmation}
                    modalDesc="Confirm deletion of Rest Period"
                    ariaLabel="program Rest delete modal"
                    ariaDesc="program Rest delete modal"
                />
            )}
        </>
    );
};

export default connect(null, {
    deleteProgramExercise,
    deleteRestPeriod,
    addNewRestPeriodBetweenSets,
})(ProgramExerciseCard);
