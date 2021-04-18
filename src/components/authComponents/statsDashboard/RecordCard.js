import React, { useState } from 'react';
import dayjs from 'dayjs';

//Redux Actions:
import { connect } from 'react-redux';
import {
    deleteRecord,
    editRecord,
} from '../../../redux/userStatRecords/recordActions';

//Components:
import StatCardModalDelete from '../statsDashboard/StatCardModalDelete';
import RecordCardEditModal from '../statsDashboard/RecordCardEditModal';

//Styles:
import styled from 'styled-components';
import { Cancel } from '@styled-icons/material-rounded/Cancel';
import { Pencil } from '@styled-icons/remix-fill/Pencil';
import { ExpandMore } from '@styled-icons/material-rounded/ExpandMore';

const WrapperContainer = styled.div`
    position: relative;
    margin-bottom: 2em;
`;

const MainContainer = styled.div`
    position: relative;
    background: #10122a;
    border-radius: 0.2em;
    -webkit-box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
    z-index: 2;
`;

const DropdownIcon = styled(ExpandMore)`
    width: 2.7rem;
    height: 2.7rem;
    color: ${({ theme }) => theme.CaretIcon};
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 320px) {
        width: 2rem;
        height: 2rem;
    }
`;

const EditIcon = styled(Pencil)`
    width: 2rem;
    height: 2rem;
    color: ${({ theme }) => theme.EditIcon};

    @media screen and (max-width: 320px) {
        width: 1.7rem;
        height: 1.7rem;
    }
`;

const DeleteIcon = styled(Cancel)`
    width: 2rem;
    height: 2rem;
    color: ${({ theme }) => theme.TrashIcon};

    @media screen and (max-width: 320px) {
        width: 1.7rem;
        height: 1.7rem;
    }
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding: 0.5rem 0em;
    text-align: left;
`;

const DateContainer = styled.div`
    text-align: left;
    padding-bottom: 0.3em;
    padding-left: 0.2em;
`;

const DateText = styled.h2`
    font-size: 0.9em;
    font-weight: 900;
    color: #e6ac00;
`;

const WeightContainer = styled.div`
    white-space: nowrap;
    margin: 0 1em;
    font-size: 1.2em;
    font-weight: 500;
    color: ${({ theme }) => theme.generalText};

    @media screen and (max-width: 320px) {
        font-size: 1em;
        font-weight: 600;
    }
`;

const WeightDivider = styled.div``;

const TechContainer = styled.div`
    white-space: nowrap;
    margin: 0 1em;
    font-size: 1.2em;
    font-weight: 500;
    color: ${({ theme }) => theme.generalText};

    @media screen and (max-width: 320px) {
        font-size: 1em;
        font-weight: 600;
    }
`;

const TechDivider = styled.div``;

const DropdownContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;

const DropdownButton = styled.button`
    background: inherit;
    cursor: pointer;
    border: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const EditButton = styled.button`
    background: #1c1e37;
    cursor: pointer;
    border: none;
    padding: 0.5em 0.5em;
    border-bottom-left-radius: 0.8em;

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
    border-bottom-right-radius: 0.8em;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    transition: all 0.2s ease-in-out;
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
    //State for dropdown buttons:
    const [stateDropdown, setStateDropdown] = useState(false);

    //State for disabling button on user request:
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //States for showing delete and edit modals for records.

    const [stateDeleteRecordModal, setStateDeleteRecordModal] = useState(false);
    const [stateEditRecordModal, setStateEditRecordModal] = useState(false);

    //States for handling user input for edit modal:

    const [recordWeight, setRecordWeight] = useState('');
    const [recordSets, setRecordSets] = useState('');
    const [recordReps, setRecordReps] = useState('');
    const [recordUnit, setRecordUnit] = useState('');

    //callback functions for modal state and button state on user request:
    const setButtonState = (bool) => {
        setIsButtonDisabled(bool);
    };

    const setDeleteModalState = (bool) => {
        setStateDeleteRecordModal(bool);
    };

    const setEditModalState = (bool) => {
        setStateEditRecordModal(bool);
    };

    //Controller functions for deletion modal:

    const openDeleteRecordModal = () => {
        setStateDeleteRecordModal(true);
    };

    const closeDeleteRecordModal = () => {
        setStateDeleteRecordModal(false);
    };

    const onDeleteRecordConfirmation = () => {
        setIsButtonDisabled(true);
        deleteRecord(
            exerciseId,
            recordId,
            deleteRecordSnackbar,
            setButtonState,
            setDeleteModalState
        );
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
        if (recordSets !== '' || recordReps !== '' || recordWeight !== '') {
            if (
                recordSets.trim() !== '' ||
                recordReps.trim() !== '' ||
                recordWeight.trim() !== ''
            ) {
                setIsButtonDisabled(true);
                editRecord(
                    exerciseId,
                    recordId,
                    recordSets,
                    recordReps,
                    recordWeight,
                    recordUnit,
                    editRecordSnackbar,
                    setButtonState,
                    setEditModalState
                );
            } else {
                alert(
                    '1Please input atleast one new value, or press cancel to exit.'
                );
            }
        } else {
            alert(
                '2Please input atleast one new value, or press cancel to exit.'
            );
        }
    };

    //Helper Functions:

    const convertWeightToKg = () => {
        return (parseInt(weight) / 2.205).toFixed();
    };

    const convertISOToDate = () => {
        return dayjs(dateModified).format('MM/DD/YYYY');
    };

    //Control dropdown:

    const enableDropdownMenu = () => {
        setStateDropdown(!stateDropdown);
    };

    return (
        <>
            <WrapperContainer>
                <DateContainer className="RecordCard-DateContainer">
                    <DateText>Edited on: {convertISOToDate()}</DateText>
                </DateContainer>
                <MainContainer>
                    <FlexContainer>
                        <DetailsContainer className="RecordCard-DetailsContainer">
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
                    <DropdownContainer>
                        <DropdownButton
                            id="RecordCard-DropdownButton"
                            className="RecordCard-DropdownButton"
                            onClick={enableDropdownMenu}
                        >
                            <DropdownIcon
                                style={
                                    stateDropdown === false
                                        ? {
                                              transformOrigin: 'center',
                                              transform: 'rotate(0deg)',
                                          }
                                        : {
                                              transformOrigin: 'center',
                                              transform: 'rotate(180deg)',
                                          }
                                }
                            />
                        </DropdownButton>
                    </DropdownContainer>
                </MainContainer>
                <ButtonContainer
                    style={
                        stateDropdown === false
                            ? {
                                  transform: 'translateY(-3.5em)',
                                  maxHeight: '0em',
                                  visibility: 'visible',
                                  zIndex: '0',
                              }
                            : {
                                  transform: 'translateY(0)',
                                  maxHeight: '3em',
                                  visibility: 'visible',
                                  zIndex: '0',
                              }
                    }
                >
                    <EditButton onClick={openEditRecordModal}>
                        <EditIcon />
                    </EditButton>
                    <DeleteButton onClick={openDeleteRecordModal}>
                        <DeleteIcon />
                    </DeleteButton>
                </ButtonContainer>
            </WrapperContainer>
            <StatCardModalDelete
                openBoolean={stateDeleteRecordModal}
                closeFunction={closeDeleteRecordModal}
                buttonSubmitFunction={onDeleteRecordConfirmation}
                modalDesc="Are you sure you want to delete this record?"
                ariaLabel="record delete modal"
                ariaDesc="modal for confirmation of record deletion"
                buttonDisabledState={isButtonDisabled}
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
                buttonDisabledState={isButtonDisabled}
            />
        </>
    );
};

export default connect(null, { deleteRecord, editRecord })(RecordCard);
