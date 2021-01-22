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

//Styles:
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Cancel } from '@styled-icons/material-rounded/Cancel';
import { Pencil } from '@styled-icons/remix-fill/Pencil';

const MainContainer = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 0.5em;
    background: #10122a;
    /* background: #393954; */
    border-radius: 0.2em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    padding: 0.5em 0;
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
    align-items: center;
    display: flex;
`;

const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
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
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 0;
    border-bottom-right-radius: 0.2em;
    border-top-right-radius: 0.2em;
    transform: translate(-0%, -0.5%);
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

    //Controller functions for deletion and edit modals:

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
                        <ButtonContainer>
                            <EditButton>
                                <EditIcon />
                            </EditButton>
                            <DeleteButton onClick={openDeleteRecordModal}>
                                <DeleteIcon />
                            </DeleteButton>
                        </ButtonContainer>
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
            </MainContainer>
            <StatCardModalDelete
                openBoolean={stateDeleteRecordModal}
                closeFunction={closeDeleteRecordModal}
                buttonSubmitFunction={onDeleteRecordConfirmation}
                modalDesc="Are you sure you want to delete this record?"
                ariaLabel="record delete modal"
                ariaDesc="modal for confirmation of record deletion"
            />
        </>
    );
};

export default connect(null, { deleteRecord, editRecord })(RecordCard);
