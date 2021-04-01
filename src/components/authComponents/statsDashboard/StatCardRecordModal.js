import React, { useEffect, useState } from 'react';

import { RemoveScroll } from 'react-remove-scroll';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';
import CustomIconButton from '../dashboardComponents/CustomIconButton';
import CustomLoadingDots from '../configureProgram/CustomLoadingDots';
import SortByOptions from '../dashboardComponents/SortByOptions';
import GlobalSnackbar from '../dashboardComponents/GlobalSnackbar';
import { LoadingContainer } from '../configureProgram/ConfigureMain';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RecordCard from './RecordCard';
import RecordCardAddModal from './RecordCardAddModal';
import { connect } from 'react-redux';
import {
    retrieveRecord,
    addRecord,
} from '../../../redux/userStatRecords/recordActions';
import { v4 as uuid } from 'uuid';

import { ModalHeader } from '../dashboardComponents/UserPowerStatCard';

import { PostAdd } from '@styled-icons/material-sharp/PostAdd';
import { BrowserModalContainer } from '../dashboardComponents/UserPowerStatCard';

//Styles:

const RecordModalContainer = styled.div`
    width: 95%;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    position: relative;
    background: ${({ theme }) => theme.ModalBG};
    border: none;
    border-radius: 0.4em;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

const RecordCardContainer = styled.div`
    margin: 1rem 0;
    overflow-y: scroll;
    height: 20rem;
    max-height: 20rem;
    @media only screen and (max-width: 320px) {
        height: 14rem;
        max-height: 14rem;
        margin: 0.7rem 0;
    }
`;

const BrowserRecordModalContainer = styled(BrowserModalContainer)`
    top: 50%;
`;

const BrowserRecordCardContainer = styled.div`
    margin: 1em 0;
    overflow-y: scroll;
    height: 35em;
    max-height: 35em;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 50% 0.5em 50%;
    grid-template-columns: 50% 50%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const AddIcon = styled(PostAdd)`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
`;

//Render:

const StatCardRecordModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    inputFunction,
    recordArray,
    addRecord,
    exerciseId,
    records,
    retrieveRecord,
}) => {
    //Loading State:
    const [isLoaded, setIsLoaded] = useState(false);

    //Use-Effect for matching sorted list with record list:

    useEffect(() => {
        //This useEffect handles a bug where the records do not update after an operation after using a sort feature.
        if (records.stats !== undefined && records.stats !== null) {
            setSortedRecordArray(records.stats);
        }
    }, [records]);

    //State for modified records (under a sort):
    const [sortedRecordArray, setSortedRecordArray] = useState(null);

    //Modal State:

    const [stateAddRecordModal, setStateAddRecordModal] = useState(false);
    const [weightInput, setWeightInput] = useState(null);
    const [setsInput, setSetsInput] = useState(null);
    const [repsInput, setRepsInput] = useState(null);
    const [unitSelect, setUnitSelect] = useState(null);

    //States for SnackBars:
    const [openAddRecordSnackBar, setOpenAddRecordSnackBar] = useState(false);
    const [openEditRecordSnackBar, setOpenEditRecordSnackBar] = useState(false);
    const [openDeleteRecordSnackBar, setOpenDeleteRecordSnackBar] = useState(
        false
    );

    const renderRecordCards = () => {
        if (isLoaded !== false) {
            //Check if sortedRecordArray is not null, then render. Otherwise render the state of the cards....
            if (sortedRecordArray !== undefined && sortedRecordArray !== null) {
                return sortedRecordArray.map((record) => (
                    <RecordCard
                        key={uuid()}
                        sets={record.sets}
                        reps={record.reps}
                        weight={record.weight}
                        recordId={record.recordId}
                        exerciseId={exerciseId}
                        dateModified={record.dateModified}
                        editRecordSnackbar={showEditRecordSnackBar}
                        deleteRecordSnackbar={showDeleteRecordSnackBar}
                    />
                ));
            }
        } else {
            return (
                <LoadingContainer>
                    <CustomLoadingDots />
                </LoadingContainer>
            );
        }
    };

    //Controller functions for modal to add a new record:

    const openAddRecordModal = () => {
        setStateAddRecordModal(true);
    };

    const closeAddRecordModal = () => {
        setStateAddRecordModal(false);
    };

    const handleWeightChange = (e) => {
        setWeightInput(e.target.value);
    };

    const handleRepsChange = (e) => {
        setRepsInput(e.target.value);
    };

    const handleSetsChange = (e) => {
        setSetsInput(e.target.value);
    };

    const handleUnitSelect = (e) => {
        setUnitSelect(e.target.value);
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        addRecord(
            exerciseId,
            setsInput,
            repsInput,
            weightInput,
            unitSelect,
            showNewRecordSnackBar
        );
        setStateAddRecordModal(false);
    };

    //Controller functions for SnackBars:

    //Controls opening the 'new record' snackbar:
    const showNewRecordSnackBar = (bool) => {
        setOpenAddRecordSnackBar(bool);
    };

    //Controls closing the 'New Record' snackbar:
    const closeNewRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddRecordSnackBar(false);
    };

    //Controls opening and closing 'Editing' records snackbar:

    const showEditRecordSnackBar = (bool) => {
        setOpenEditRecordSnackBar(bool);
    };

    const closeEditRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEditRecordSnackBar(false);
    };

    //Controls opening and closing 'Deleting' records snackbar:

    const showDeleteRecordSnackBar = (bool) => {
        setOpenDeleteRecordSnackBar(bool);
    };

    const closeDeleteRecordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteRecordSnackBar(false);
    };

    //Handles sorting of records:

    const handleRecordSortSelector = (e) => {
        //pass e.target.value into switch function ordering array
        //set the new state of records
        const parsedRecordArray = sortRecordSwitchFunction(
            e.target.value,
            sortedRecordArray
        );
        setSortedRecordArray(parsedRecordArray);
    };

    //Switch controller for record re-ordering:
    const sortRecordSwitchFunction = (format, array) => {
        if (array === undefined || array === null) return;

        let sortedArray;

        switch (format) {
            case 'DEFAULT':
                if (records.stats !== undefined && records.stats !== null)
                    return records.stats;
            case 'HIGHWEIGHT':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
                return sortedArray;
            case 'LOWWEIGHT':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
                return sortedArray;
            case 'HIGHSET':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(b.sets) - parseInt(a.sets));
                return sortedArray;
            case 'LOWSET':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(a.sets) - parseInt(b.sets));
                return sortedArray;
            case 'HIGHREP':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(b.reps) - parseInt(a.reps));
                return sortedArray;
            case 'LOWREP':
                sortedArray = array
                    .slice()
                    .sort((a, b) => parseInt(a.reps) - parseInt(b.reps));
                return sortedArray;
            case 'LASTMODIFIED':
                sortedArray = array
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.dateModified) - new Date(a.dateModified)
                    );
                return sortedArray;
            default:
                break;
        }
    };

    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby="stat card edit modal"
                    aria-describedby="modal for stat edit"
                    open={openBoolean}
                    onClose={() => {
                        setIsLoaded(false);
                        setSortedRecordArray(null);
                        closeFunction();
                    }}
                    closeAfterTransition
                    onRendered={async () => {
                        const bool = await retrieveRecord(exerciseId);
                        if (bool === true) setSortedRecordArray(records.stats);
                        setIsLoaded(bool);
                    }}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <RecordModalContainer>
                            <ModalHeader>Records</ModalHeader>
                            <RemoveScroll>
                                <RecordCardContainer>
                                    {renderRecordCards()}
                                </RecordCardContainer>
                            </RemoveScroll>
                            <SortByOptions
                                sortingType="RECORDS"
                                recordSortHandler={handleRecordSortSelector}
                            />
                            <ButtonContainer>
                                <CustomIconButton
                                    buttonIcon={<AddIcon />}
                                    buttonLabel="Record"
                                    onClickFunction={openAddRecordModal}
                                    buttonTextColor="white"
                                    buttonColor="#20861b"
                                    buttonHoverColor="#034500"
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={() => {
                                        setIsLoaded(false);
                                        setSortedRecordArray(null);
                                        closeFunction();
                                    }}
                                />
                            </ButtonContainer>
                        </RecordModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
                <Modal
                    aria-labelledby="stat card edit modal"
                    aria-describedby="modal for stat edit"
                    open={openBoolean}
                    onClose={() => {
                        setIsLoaded(false);
                        setSortedRecordArray(null);
                        closeFunction();
                    }}
                    closeAfterTransition
                    onRendered={async () => {
                        const bool = await retrieveRecord(exerciseId);
                        setIsLoaded(bool);
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <BrowserRecordModalContainer>
                            <ModalHeader>Records</ModalHeader>
                            <BrowserRecordCardContainer>
                                {renderRecordCards()}
                            </BrowserRecordCardContainer>
                            <SortByOptions
                                sortingType="RECORDS"
                                recordSortHandler={handleRecordSortSelector}
                            />
                            <ButtonContainer>
                                <CustomIconButton
                                    buttonIcon={<AddIcon />}
                                    buttonLabel="New Record"
                                    onClickFunction={openAddRecordModal}
                                    buttonTextColor="white"
                                    buttonColor="#20861b"
                                    buttonHoverColor="#034500"
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={() => {
                                        setIsLoaded(false);
                                        setSortedRecordArray(null);
                                        closeFunction();
                                    }}
                                />
                            </ButtonContainer>
                        </BrowserRecordModalContainer>
                    </Fade>
                </Modal>
            )}
            <RecordCardAddModal
                ariaLab="Modal for adding a new record"
                ariaDesc="Modal for adding a new record"
                modalHeader="Add a New Record!"
                openBoolean={stateAddRecordModal}
                closeFunction={closeAddRecordModal}
                weightFunction={handleWeightChange}
                setsFunction={handleSetsChange}
                repsFunction={handleRepsChange}
                unitFunction={handleUnitSelect}
                submitHandler={handleSubmission}
                needNameHandler={false}
            />
            <GlobalSnackbar
                openFunction={openAddRecordSnackBar}
                closeFunction={closeNewRecordSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your record has been added."
            />
            <GlobalSnackbar
                openFunction={openEditRecordSnackBar}
                closeFunction={closeEditRecordSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="info"
                alertMessage="Your edits have been saved."
            />
            <GlobalSnackbar
                openFunction={openDeleteRecordSnackBar}
                closeFunction={closeDeleteRecordSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="error"
                alertMessage="Your record has been removed."
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        records: state.statRecords,
    };
};

export default connect(mapStateToProps, { addRecord, retrieveRecord })(
    StatCardRecordModal
);

// export default StatCardRecordModal;
