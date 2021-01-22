import React, { useState } from 'react';
import dayjs from 'dayjs';

//Redux Actions:
import { connect } from 'react-redux';
import {
    deleteRecord,
    editRecord,
} from '../../../redux/userStats/userStatActions';

//Components:
import StatCardModalDelete from '../statsDashboard/StatCardModalDelete';
import RecordCardEditModal from '../statsDashboard/RecordCardEditModal';

//Styles:
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Cancel } from '@styled-icons/material-rounded/Cancel';
import { Pencil } from '@styled-icons/remix-fill/Pencil';

const MainContainer = styled.div`
    /* display: flex;
    position: relative;
    margin-bottom: 0.5em;
    background: #10122a;
    border-radius: 0.2em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    align-items: center;
    justify-content: space-between; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    margin-bottom: 0.5em;
    background: #10122a;
    border-radius: 0.2em;
    -webkit-box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
`;

const EditIcon = styled(Pencil)`
    width: 1.35em;
    height: 1.35em;
    color: ${({ theme }) => theme.EditIcon};
`;

const DeleteIcon = styled(Cancel)`
    width: 1.35em;
    height: 1.35em;
    color: ${({ theme }) => theme.TrashIcon};
`;

const FlexContainer = styled.div`
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0;
`;

const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 0.5em 0em;
    text-align: left;
`;

const DateContainer = styled.div`
    text-align: left;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 0.5em;
`;

const DateText = styled.h2`
    font-size: 0.7em;
    font-weight: 900;
    color: #e6ac00;
`;

const WeightContainer = styled.div`
    white-space: nowrap;
    margin: 0 1em;
    font-size: 0.7em;
    font-weight: 900;
    color: ${({ theme }) => theme.generalText};
`;

const WeightDivider = styled.div``;

const TechContainer = styled.div`
    white-space: nowrap;
    margin: 0 1em;
    font-size: 0.7em;
    font-weight: 900;
    color: ${({ theme }) => theme.generalText};
`;

const TechDivider = styled.div``;

const EditButton = styled.button`
    background: #1c1e37;
    cursor: pointer;
    border: none;
    padding: 0.5em 0.5em;
    border-top-right-radius: 0.2em;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const DeleteButton = styled.button`
    background: #1c1e37;
    cursor: pointer;
    border: none;
    padding: 0.5em 0.5em;
    border-bottom-right-radius: 0.2em;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const ButtonContainer = styled.div`
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border-bottom-right-radius: 0.2em;
    border-top-right-radius: 0.2em;
`;

//Render:

const RecordCard = ({
    sets,
    reps,
    weight,
    recordId,
    exerciseId,
    dateModified,
    editRecordSnackbar,
    deleteRecordSnackbar,
    deleteRecord,
    editRecord,
}) => {
    //States for showing delete and edit modals for records.

    const [stateDeleteRecordModal, setStateDeleteRecordModal] = useState(false);
    const [stateEditRecordModal, setStateEditRecordModal] = useState(false);

    //States for handling user input for edit modal:

    const [recordWeight, setRecordWeight] = useState(null);
    const [recordSets, setRecordSets] = useState(null);
    const [recordReps, setRecordReps] = useState(null);
    const [recordUnit, setRecordUnit] = useState(null);

    //Controller functions for deletion modal:

    const openDeleteRecordModal = () => {
        setStateDeleteRecordModal(true);
    };

    const closeDeleteRecordModal = () => {
        setStateDeleteRecordModal(false);
    };

    const onDeleteRecordConfirmation = () => {
        deleteRecord(exerciseId, recordId, deleteRecordSnackbar);
        setStateDeleteRecordModal(false);
    };

    //Controller functions for edit modal:

    const openEditRecordModal = () => {
        setStateEditRecordModal(true);
    };

    const closeEditRecordModal = () => {
        setStateEditRecordModal(false);
    };

    //User input handling functions for edit modal:

    const handleEditWeight = (e) => {
        setRecordWeight(e.target.value);
    };

    const handleEditSets = (e) => {
        setRecordSets(e.target.value);
    };

    const handleEditReps = (e) => {
        setRecordReps(e.target.value);
    };

    const handleEditUnit = (e) => {
        console.log(e.target.value + typeof e.target.value);
        setRecordUnit(e.target.value);
    };

    const handleUserEditSubmission = () => {
        //Basic Empty check:
        if (
            recordSets !== null &&
            recordReps !== null &&
            recordWeight !== null
        ) {
            if (
                recordSets.trim() !== '' &&
                recordReps.trim() !== '' &&
                recordWeight.trim() !== ''
            ) {
                editRecord(
                    exerciseId,
                    recordId,
                    recordSets,
                    recordReps,
                    recordWeight,
                    recordUnit,
                    editRecordSnackbar
                );
            } else {
                alert('Please input values, or press cancel to exit.');
            }
        } else {
            alert('Please input values, or press cancel to exit.');
        }
    };

    //Helper Functions:

    const convertWeightToKg = () => {
        return (parseInt(weight) / 2.205).toFixed(0);
    };

    const convertISOToDate = () => {
        return dayjs(dateModified).format('MM/DD/YYYY');
    };

    return (
        <>
            <MainContainer>
                <FlexContainer>
                    <DateContainer>
                        <DateText>Edited on:</DateText>
                        <DateText>{convertISOToDate()}</DateText>
                    </DateContainer>
                    <DetailsContainer>
                        <TechContainer>
                            <TechDivider>Sets: {sets}</TechDivider>
                            <TechDivider>Reps: {reps}</TechDivider>
                        </TechContainer>
                        <WeightContainer>
                            <WeightDivider>{weight} Lbs</WeightDivider>
                            <WeightDivider>
                                {convertWeightToKg()} Kgs
                            </WeightDivider>
                        </WeightContainer>
                    </DetailsContainer>
                </FlexContainer>
                <ButtonContainer>
                    <EditButton onClick={openEditRecordModal}>
                        <EditIcon />
                    </EditButton>
                    <DeleteButton onClick={openDeleteRecordModal}>
                        <DeleteIcon />
                    </DeleteButton>
                </ButtonContainer>
            </MainContainer>
            <StatCardModalDelete
                openBoolean={stateDeleteRecordModal}
                closeFunction={closeDeleteRecordModal}
                buttonSubmitFunction={onDeleteRecordConfirmation}
                modalDesc="Are you sure you want to delete this record?"
                ariaLabel="record delete modal"
                ariaDesc="modal for confirmation of record deletion"
            />
            <RecordCardEditModal
                openBoolean={stateEditRecordModal}
                closeFunction={closeEditRecordModal}
                weightFunction={handleEditWeight}
                setsFunction={handleEditSets}
                repsFunction={handleEditReps}
                unitFunction={handleEditUnit}
                submitHandler={handleUserEditSubmission}
                existingStatSets={`Sets: ${sets}`}
                existingStatReps={`Reps: ${reps}`}
                existingStatWeight={weight}
            />
        </>
    );
};

export default connect(null, { deleteRecord, editRecord })(RecordCard);
