import React, { useState } from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { deleteStat, editStat } from '../../../redux/userStats/userStatActions';

//Components:
import StatCardModalDelete from './StatCardModalDelete';
import StatCardModalEdit from './StatCardModalEdit';
import StatCardRecordModal from './StatCardRecordModal';

//Styles:
import styled from 'styled-components';
import { Trash } from '@styled-icons/typicons/Trash';
import { Pencil } from '@styled-icons/evil/Pencil';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';

const WrapperContainer = styled.div`
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: auto auto;
    grid-template-columns: auto auto;
    justify-items: center;
    margin: 1em 0em;
    /* @media screen and (max-width: 320px) {
        -ms-grid-columns: 60% 40%;
        grid-template-columns: 60% 40%;
    } */
`;

const BrowserWrapperContainer = styled.div`
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 68% 32%;
    grid-template-columns: 68% 32%;
    /* justify-items: center; */
    margin: 1em 0em;
`;

const MainContainer = styled.div`
    max-width: 100%;
    border-radius: 0.4em;
    padding: 0.75em 0.5em;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    background: ${({ theme }) => theme.StatCardBG};
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
`;

const NameContainer = styled.div`
    width: 10.5rem;
    text-align: left;
    white-space: normal;
    word-break: break-word;
    @media screen and (min-width: 320px) {
        width: 9rem;
    }

    @media screen and (min-width: 360px) {
        width: 11.5rem;
    }
    @media screen and (min-width: 411px) {
        width: 13rem;
    }
`;

const BrowserNameContainer = styled.div`
    /* width: 10.5rem; */
    text-align: left;
    white-space: normal;
    word-break: break-word;
`;

const NameHeader = styled.h2`
    color: ${({ theme }) => theme.StatCardHeader};
    font-size: 1.2em;
    font-weight: 400;
    text-shadow: 2px 2px 2px #14181f;

    @media screen and (min-width: 414px) {
        font-size: 1.4em;
        font-weight: 600;
    }
`;

const DateContainer = styled.div`
    text-align: left;
`;

const DateText = styled.h2`
    font-family: 'Lato', 'Nunito';
    color: ${({ theme }) => theme.StatCardTime};
    font-size: 0.9em;
    text-align: left;
    font-weight: 400;
    @media screen and (min-width: 414px) {
        font-size: 1em;
    }
`;

const ButtonContainer = styled.div`
    /* white-space: nowrap; */
`;

const TrashIcon = styled(Trash)`
    height: 3em;
    width: 3em;
    color: ${({ theme }) => theme.TrashIcon};

    @media screen and (min-width: 414px) {
        height: 3.5em;
        width: 3.5em;
    }
    /* @media screen and (max-width: 320px) {
        height: 2.5em;
        width: 2.5em;
    } */
`;

const EditIcon = styled(Pencil)`
    height: 3em;
    width: 3em;
    color: ${({ theme }) => theme.EditIcon};

    @media screen and (min-width: 414px) {
        height: 3.5em;
        width: 3.5em;
    }
    /* @media screen and (max-width: 320px) {
        height: 2.5em;
        width: 2.5em;
    } */
`;

const CaretIcon = styled(ChevronDown)`
    height: 3em;
    width: 3em;
    color: ${({ theme }) => theme.CaretIcon};

    @media screen and (min-width: 414px) {
        height: 3.5em;
        width: 3.5em;
    }
    /* @media screen and (max-width: 320px) {
        height: 2.5em;
        width: 2.5em;
    } */
`;

const StyledButton = styled.button`
    margin: 0 0.2em;
    border: none;
    height: 100%;
    padding: 0.5em 0.1em;
    border-radius: 0.5em;
    background: ${({ theme }) => theme.ButtonBG};
    color: ${({ theme }) => theme.StatCardHeader};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:focus {
        outline: none;
    }
`;

//Render:

const StatCard = ({
    name,
    date,
    exerciseId,
    deleteStat,
    editStat,
    records,
    addRecordSnackbar,
    editRecordSnackbar,
    deleteRecordSnackbar,
}) => {
    //States for modals:

    //Deletion Modal:
    const [stateDeleteModal, setStateDeleteModal] = useState(false);

    //Edit Modal:

    const [stateEditModal, setStateEditModal] = useState(false);
    const [userEditInput, setUserEditInput] = useState(false);

    //Record Modal:

    const [stateRecordModal, setStateRecordModal] = useState(false);

    //Reformats ISO timestamp:
    const reformatDate = () => {
        if (date !== undefined && date !== null) {
            return dayjs(date).format('MM/DD/YYYY');
        } else {
            return null;
        }
    };

    //Controller Functions for Deletion Modal:

    const openDeleteModal = () => {
        setStateDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setStateDeleteModal(false);
    };

    const onDeleteConfirmation = () => {
        deleteStat(exerciseId);
        setStateDeleteModal(false);
    };

    //Controller Functions for Edit Modal:

    const openEditModal = () => {
        setStateEditModal(true);
    };

    const closeEditModal = () => {
        setStateEditModal(false);
    };

    const onEditInput = (e) => {
        setUserEditInput(e.target.value);
    };

    const onEditConfirmation = () => {
        editStat(exerciseId, userEditInput);
        setStateEditModal(false);
    };

    //Controller functions for Record Modal:

    const openRecordModal = () => {
        setStateRecordModal(true);
    };

    const closeRecordModal = () => {
        setStateRecordModal(false);
    };

    return (
        <>
            {isMobileOnly && (
                <>
                    <WrapperContainer>
                        <MainContainer>
                            <NameContainer>
                                <NameHeader>{name}</NameHeader>
                                <DateContainer>
                                    <DateText>{reformatDate()}</DateText>
                                </DateContainer>
                            </NameContainer>
                        </MainContainer>
                        <ButtonContainer>
                            <StyledButton onClick={openDeleteModal}>
                                <TrashIcon />
                            </StyledButton>
                            <StyledButton onClick={openEditModal}>
                                <EditIcon />
                            </StyledButton>
                            <StyledButton>
                                <CaretIcon onClick={openRecordModal} />
                            </StyledButton>
                        </ButtonContainer>
                    </WrapperContainer>
                    <StatCardModalDelete
                        openBoolean={stateDeleteModal}
                        closeFunction={closeDeleteModal}
                        buttonSubmitFunction={onDeleteConfirmation}
                        modalDesc="Are you sure you want to delete this stat? This
                process is irreversible, and all underlying records
                will be deleted."
                        ariaLabel="stat card modal"
                        ariaDesc="modal for stat deletion"
                    />
                    <StatCardModalEdit
                        openBoolean={stateEditModal}
                        closeFunction={closeEditModal}
                        inputFunction={onEditInput}
                        buttonSubmitFunction={onEditConfirmation}
                        existingStatName={name}
                    />
                    <StatCardRecordModal
                        openBoolean={stateRecordModal}
                        closeFunction={closeRecordModal}
                        recordArray={records}
                        exerciseId={exerciseId}
                        addRecordSnackbar={addRecordSnackbar}
                        editRecordSnackbar={editRecordSnackbar}
                        deleteRecordSnackbar={deleteRecordSnackbar}
                    />
                </>
            )}
            {isBrowser && (
                <>
                    <BrowserWrapperContainer>
                        <MainContainer>
                            <BrowserNameContainer>
                                <NameHeader>{name}</NameHeader>
                                <DateContainer>
                                    <DateText>{reformatDate()}</DateText>
                                </DateContainer>
                            </BrowserNameContainer>
                        </MainContainer>
                        <ButtonContainer>
                            <StyledButton onClick={openDeleteModal}>
                                <TrashIcon />
                            </StyledButton>
                            <StyledButton onClick={openEditModal}>
                                <EditIcon />
                            </StyledButton>
                            <StyledButton>
                                <CaretIcon onClick={openRecordModal} />
                            </StyledButton>
                        </ButtonContainer>
                    </BrowserWrapperContainer>
                    <StatCardModalDelete
                        openBoolean={stateDeleteModal}
                        closeFunction={closeDeleteModal}
                        buttonSubmitFunction={onDeleteConfirmation}
                        modalDesc="Are you sure you want to delete this stat? This
                process is irreversible, and all underlying records
                will be deleted."
                        ariaLabel="stat card modal"
                        ariaDesc="modal for stat deletion"
                    />
                    <StatCardModalEdit
                        openBoolean={stateEditModal}
                        closeFunction={closeEditModal}
                        inputFunction={onEditInput}
                        buttonSubmitFunction={onEditConfirmation}
                        existingStatName={name}
                    />
                    <StatCardRecordModal
                        openBoolean={stateRecordModal}
                        closeFunction={closeRecordModal}
                        recordArray={records}
                        exerciseId={exerciseId}
                        addRecordSnackbar={addRecordSnackbar}
                        editRecordSnackbar={editRecordSnackbar}
                        deleteRecordSnackbar={deleteRecordSnackbar}
                    />
                </>
            )}
        </>
    );
};

export default connect(null, { deleteStat, editStat })(StatCard);
