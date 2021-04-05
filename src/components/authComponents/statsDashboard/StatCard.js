import React, { useState, useEffect } from 'react';

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
import { Database } from '@styled-icons/remix-line/Database';
import { FilePaper2 } from '@styled-icons/remix-fill/FilePaper2';

const WrapperContainer = styled.div`
    display: block;
    text-align: center;
    width: 100%;
    margin: 1em 0;
    z-index: 10;
    transition: all 0.2s ease;
`;

const BrowserWrapperContainer = styled.div`
    display: block;
    text-align: center;
    margin: 1em 0;
    z-index: 10;
    padding: 0 0;
    transition: all 0.2s ease;
`;

const MainContainer = styled.div`
    position: relative;
    max-width: 100%;
    border-radius: 0.4em;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
    padding-left: 0.5em;
    padding-right: 2.6em;
    z-index: 5;

    background: ${({ theme }) => theme.StatCardBG};
    box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px;
`;

const DropdownContainer = styled.div`
    position: absolute;
    right: -0.2rem;
    top: 0;
    height: 100%;
`;

const NameContainer = styled.div`
    width: 100%;
    max-width: 100%;
    text-align: left;
    white-space: normal;
    word-break: break-word;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    column-gap: 0.2em;
    align-items: center;
    justify-items: center;
    padding: 0 0.2em;
    transition: all 0.25s ease-in-out;
    transform: translateY(-2.5em);
    max-height: 0em; //3em;
`;

const RecordIcon = styled(FilePaper2)`
    height: 1rem;
    width: 1rem;
    color: white;
    margin-right: 0.4rem;
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

const DatabaseIcon = styled(Database)`
    height: 2.7em;
    width: 2.7em;
    color: ${({ theme }) => theme.CaretIcon};

    @media screen and (min-width: 414px) {
        height: 3.2em;
        width: 3.2em;
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
    transition: all 0.25s ease-in-out;

    @media screen and (min-width: 414px) {
        height: 3.5em;
        width: 3.5em;
    }
`;

const StyledButton = styled.button`
    margin: 0 0.2em;
    border: none;
    height: 100%;
    width: 100%;
    padding: 0.5em 0.1em;
    border-radius: 0.5em;
    background: ${({ theme }) => theme.LowerContainerBG};
    color: ${({ theme }) => theme.StatCardHeader};

    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledDropdownButton = styled.button`
    margin: 0 0em;
    border: none;
    height: 100%;
    width: 100%;
    padding: 0.5em 0.1em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    background: ${({ theme }) => theme.ButtonBG};
    color: ${({ theme }) => theme.StatCardHeader};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const RecordNumberContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 0.5rem;
`;

//Render:

const StatCard = ({
    name,
    date,
    exerciseId,
    deleteStat,
    editStat,
    records,
    editSnackbar,
    deleteSnackbar,
}) => {
    //State for dropdown:

    const [stateDropdown, setStateDropdown] = useState(false);
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

    //Controller function for stateDropdown:

    const enableDropdownMenu = () => {
        setStateDropdown(!stateDropdown);
    };

    //Controller Functions for Deletion Modal:

    const openDeleteModal = () => {
        setStateDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setStateDeleteModal(false);
    };

    const onDeleteConfirmation = () => {
        deleteStat(exerciseId, deleteSnackbar);
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
        editStat(exerciseId, userEditInput, editSnackbar);
        setStateEditModal(false);
    };

    //Controller functions for Record Modal:

    const openRecordModal = () => {
        setStateRecordModal(true);
    };

    const closeRecordModal = () => {
        setStateRecordModal(false);
    };

    //Helper function for record amount:

    // const calculateRecordNumber = (length) => {
    //     if (length !== undefined && length !== null) {
    //         return length;
    //     }
    // };

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
                                    {/* <RecordNumberContainer>
                                        <RecordIcon />
                                        <DateText>
                                            {calculateRecordNumber()}
                                        </DateText>
                                    </RecordNumberContainer> */}
                                </DateContainer>
                            </NameContainer>
                            <DropdownContainer>
                                <StyledDropdownButton
                                    onClick={enableDropdownMenu}
                                >
                                    <CaretIcon
                                        style={
                                            stateDropdown === false
                                                ? {
                                                      transformOrigin: 'center',
                                                      transform: 'rotate(0deg)',
                                                  }
                                                : {
                                                      transformOrigin: 'center',
                                                      transform:
                                                          'rotate(180deg)',
                                                  }
                                        }
                                    />
                                </StyledDropdownButton>
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
                            <StyledButton onClick={openDeleteModal}>
                                <TrashIcon />
                            </StyledButton>
                            <StyledButton onClick={openEditModal}>
                                <EditIcon />
                            </StyledButton>
                            <StyledButton>
                                <DatabaseIcon onClick={openRecordModal} />
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
                            <DropdownContainer>
                                <StyledDropdownButton
                                    onClick={enableDropdownMenu}
                                >
                                    <CaretIcon
                                        style={
                                            stateDropdown === false
                                                ? {
                                                      transformOrigin: 'center',
                                                      transform: 'rotate(0deg)',
                                                  }
                                                : {
                                                      transformOrigin: 'center',
                                                      transform:
                                                          'rotate(180deg)',
                                                  }
                                        }
                                    />
                                </StyledDropdownButton>
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
                            <StyledButton onClick={openDeleteModal}>
                                <TrashIcon />
                            </StyledButton>
                            <StyledButton onClick={openEditModal}>
                                <EditIcon />
                            </StyledButton>
                            <StyledButton>
                                <DatabaseIcon onClick={openRecordModal} />
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
                    />
                </>
            )}
        </>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         stats: state.stats,
//     };
// };

export default connect(null, {
    deleteStat,
    editStat,
})(StatCard);
