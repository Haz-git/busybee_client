import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import CustomSelector from '../dashboardComponents/CustomSelector';
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const EditRecordModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const EditRecordModalHeader = styled(ModalHeader)`
    font-size: 1.2em;
    font-weight: 900;
    margin: 0.5em 0;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 0.7em;
`;

const InputDivider = styled.div`
    margin: 0.5em 0.2em;
    display: grid;
    grid-template-columns: 100%;
    row-gap: 0.8em;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1.3em',
    },
})(Button);

const RecordCardEditModal = ({
    openBoolean,
    closeFunction,
    weightFunction,
    setsFunction,
    repsFunction,
    unitFunction,
    submitHandler,
    existingStatSets,
    existingStatReps,
    existingStatWeight,
}) => {
    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby="modal for add record"
                    aria-describedby="modal for adding a new record"
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <EditRecordModalContainer>
                            <EditRecordModalHeader>
                                Edit your record!
                            </EditRecordModalHeader>
                            <InputContainer>
                                <InputDivider>
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatWeight}
                                        changeFunc={weightFunction}
                                    />
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatSets}
                                        changeFunc={setsFunction}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <CustomSelector changeFunc={unitFunction} />
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatReps}
                                        changeFunc={repsFunction}
                                    />
                                </InputDivider>
                            </InputContainer>
                            <ButtonContainer>
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    onClickFunction={submitHandler}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </EditRecordModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
                <Modal
                    aria-labelledby="modal for add record"
                    aria-describedby="modal for adding a new record"
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <BrowserModalContainer>
                            <EditRecordModalHeader>
                                Edit your record!
                            </EditRecordModalHeader>
                            <InputContainer>
                                <InputDivider>
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatWeight}
                                        changeFunc={weightFunction}
                                    />
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatSets}
                                        changeFunc={setsFunction}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <CustomSelector changeFunc={unitFunction} />
                                    <CustomNumberField
                                        type="number"
                                        existingStat={existingStatReps}
                                        changeFunc={repsFunction}
                                    />
                                </InputDivider>
                            </InputContainer>
                            <ButtonContainer>
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    onClickFunction={submitHandler}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default RecordCardEditModal;
