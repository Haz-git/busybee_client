import React, { useEffect, useState } from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';
import CustomIconButton from '../dashboardComponents/CustomIconButton';

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

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';

import { ModalHeader } from '../dashboardComponents/UserPowerStatCard';

import { PostAdd } from '@styled-icons/material-sharp/PostAdd';
import { BrowserModalContainer } from '../dashboardComponents/UserPowerStatCard';
import { TreasureMap } from '@styled-icons/remix-fill';

//Styles:

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
            ['@media (max-width: 320px)']: {
                fontSize: '1.7em',
            },
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
            ['@media (max-width: 320px)']: {
                fontSize: '1.1em',
            },
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
    filledSuccess: {
        background: '#1A222F',
    },
    filledError: {
        background: '#1A222F',
    },
    filledInfo: {
        background: '#1A222F',
    },
}))(MuiAlert);

const RecordModalContainer = styled.div`
    width: 92%;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    position: relative;
    background: ${({ theme }) => theme.ModalBG};
    border: 1px solid #fdbc3d;
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
    margin: 1em 0;
    overflow-y: scroll;
    height: 20em;
    max-height: 20em;
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

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="down"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

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

    console.log(records);

    const renderRecordCards = () => {
        if (records.stats !== undefined && records.stats !== null) {
            return records.stats.map((record) => (
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

    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
    };

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

    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby="stat card edit modal"
                    aria-describedby="modal for stat edit"
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    onRendered={async () => {
                        const bool = await retrieveRecord(exerciseId);
                    }}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <RecordModalContainer>
                            <ModalHeader>Records</ModalHeader>
                            <RecordCardContainer>
                                {renderRecordCards()}
                            </RecordCardContainer>
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
                                    onClickFunction={closeFunction}
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
                    onClose={closeFunction}
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
                                    onClickFunction={closeFunction}
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
            <Snackbar
                open={openAddRecordSnackBar}
                autoHideDuration={3000}
                onClose={closeNewRecordSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="success">
                            Your record has been added.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openEditRecordSnackBar}
                autoHideDuration={3000}
                onClose={closeEditRecordSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="info">
                            Your edits have been saved.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={openDeleteRecordSnackBar}
                autoHideDuration={3000}
                onClose={closeDeleteRecordSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="error">
                            Your record has been removed.
                        </Alert>
                    }
                />
            </Snackbar>
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
