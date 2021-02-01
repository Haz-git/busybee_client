import React, { useState } from 'react';

//Redux:
import { connect } from 'react-redux';
import {
    deleteProgramExercise,
    deleteRestPeriod,
} from '../../../redux/userProgramExercises/programExerciseActions';

//styles:
import styled from 'styled-components';
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';
import { Remove } from '@styled-icons/material/Remove';
import StatCardModalDelete from '../statsDashboard/StatCardModalDelete';

//Icons:

const EditIcon = styled(EditOutline)`
    height: 1.5em;
    width: 1.6em;
`;

const DelIcon = styled(Remove)`
    height: 1.5em;
    width: 1.5em;
`;

const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    background: #27303f;
    border-radius: 0.4em;
    margin: 1.2em 0;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
`;

const HeaderBlock = styled.div`
    background: #081120;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    padding: 0.6em 1em;
`;

const HeaderText = styled.h2`
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #fcac49;
    font-size: 1.2em;
`;

const InfoBlock = styled.div`
    padding: 0.3em 0.8em;
`;

const InfoText = styled.h3`
    padding: 0.2em 0.2em;
    color: white;
    font-size: 1.025em;
    /* white-space: nowrap; */
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

const DeleteButton = styled.button`
    border: none;
    border-radius: 50%;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #90130c;
    font-size: 1em;
    margin: 0.3em 0.3em;
    color: white;
    cursor: pointer;

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
    border-radius: 50%;
    padding: 0.2em 0.2em;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
    background: #3041ad;
    font-size: 1em;
    margin: 0.3em 0.3em;
    color: white;
    cursor: pointer;

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
    left: 0;
    top: 0;
    position: absolute;
    display: flex;
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
}) => {
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
        console.log(restId);
        deleteRestPeriod(programId, restId, deleteRestSnackBar);
        setStateDeleteProgramExerciseModal(false);
    };

    return (
        <>
            <MainContainer>
                <HeaderBlock>
                    <HeaderText>{name}</HeaderText>
                </HeaderBlock>
                <InfoBlock>
                    <DetailContainer>
                        {sets && <InfoText>Sets: {sets}</InfoText>}
                        {reps && <InfoText>Reps: {reps}</InfoText>}
                        {weight && <InfoText>Weight: {weight}</InfoText>}
                    </DetailContainer>
                    <TimeContainer>
                        {minutes && <InfoText>Minutes: {minutes}</InfoText>}
                        {seconds && <InfoText>Seconds: {seconds}</InfoText>}
                    </TimeContainer>
                </InfoBlock>
                <ButtonContainer>
                    <EditButton>
                        <EditIcon />
                    </EditButton>
                    <DeleteButton onClick={openDeleteProgramExerciseModal}>
                        <DelIcon />
                    </DeleteButton>
                </ButtonContainer>
            </MainContainer>
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

export default connect(null, { deleteProgramExercise, deleteRestPeriod })(
    ProgramExerciseCard
);
