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

import { ModalHeader } from '../dashboardComponents/UserPowerStatCard';

import { PostAdd } from '@styled-icons/material-sharp/PostAdd';
import { BrowserModalContainer } from '../dashboardComponents/UserPowerStatCard';

//Styles:

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

//Render:

const StatCardRecordModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    inputFunction,
    recordArray,
    addRecord,
    exerciseId,
    addRecordSnackbar,
    editRecordSnackbar,
    deleteRecordSnackbar,
    retrieveRecord,
}) => {
    useEffect(() => {
        retrieveRecord(exerciseId);

        //Need to figure out a way for only the opened stat to retrieve records. Currently, when user navigates to stat log, react retrieves all records for all stats because technically the modals are all mounted...
    }, []);
    //Controls state of modal to add new record:

    const [stateAddRecordModal, setStateAddRecordModal] = useState(false);
    const [weightInput, setWeightInput] = useState(null);
    const [setsInput, setSetsInput] = useState(null);
    const [repsInput, setRepsInput] = useState(null);
    const [unitSelect, setUnitSelect] = useState(null);

    const renderRecordCards = () => {
        if (recordArray !== undefined && recordArray !== null) {
            return recordArray.map((record) => (
                <RecordCard
                    key={uuid()}
                    sets={record.sets}
                    reps={record.reps}
                    weight={record.weight}
                    recordId={record.recordId}
                    exerciseId={exerciseId}
                    dateModified={record.dateModified}
                    editRecordSnackbar={editRecordSnackbar}
                    deleteRecordSnackbar={deleteRecordSnackbar}
                />
            ));
        } else {
            return <>You don't seem to have any records!</>;
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
            addRecordSnackbar
        );
        setStateAddRecordModal(false);
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
        </>
    );
};

export default connect(null, { retrieveRecord, addRecord })(
    StatCardRecordModal
);

// export default StatCardRecordModal;
