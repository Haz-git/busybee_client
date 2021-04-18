import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import CustomTextField from '../dashboardComponents/CustomTextField';
import CustomSelector from '../dashboardComponents/CustomSelector';
import RecordCard from './RecordCard';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const AddRecordModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const AddRecordModalHeader = styled(ModalHeader)`
    font-size: 1.8em;
    font-weight: 900;
    margin: 0.5em 0;
    @media only screen and (max-width: 320px) {
        font-size: 1.4em;
    }
`;

const InputContainer = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.7em;
`;

const InputDivider = styled.div`
    margin: 0.3em 0.3em;
`;

const FieldDivider = styled.div`
    margin: 0.8em 0;
`;

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const RecordCardAddModal = ({
    ariaLab,
    ariaDesc,
    modalHeader,
    openBoolean,
    closeFunction,
    weightFunction,
    setsFunction,
    repsFunction,
    unitFunction,
    submitHandler,
    needNameHandler,
    nameFunction,
    maxTextLength,
    buttonDisabledState = false,
}) => {
    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby={ariaLab}
                    aria-describedby={ariaDesc}
                    open={openBoolean}
                    onClose={closeFunction}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openBoolean}>
                        <AddRecordModalContainer>
                            <AddRecordModalHeader>
                                {modalHeader}
                            </AddRecordModalHeader>
                            {needNameHandler && (
                                <CustomTextField
                                    type="text"
                                    placeholder="Name"
                                    changeFunc={nameFunction}
                                    // maxlength={maxTextLength}
                                />
                            )}
                            <InputContainer>
                                <InputDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Weight"
                                            changeFunc={weightFunction}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Sets"
                                            changeFunc={setsFunction}
                                        />
                                    </FieldDivider>
                                </InputDivider>
                                <InputDivider>
                                    <FieldDivider>
                                        <CustomSelector
                                            changeFunc={unitFunction}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Reps"
                                            changeFunc={repsFunction}
                                        />
                                    </FieldDivider>
                                </InputDivider>
                            </InputContainer>
                            <ButtonContainer>
                                <CustomSaveButton
                                    buttonLabel={
                                        buttonDisabledState === false
                                            ? 'Save'
                                            : 'Saving...'
                                    }
                                    onClickFunction={submitHandler}
                                    isLoaderBtn={true}
                                    disabledState={buttonDisabledState}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </AddRecordModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
                <Modal
                    aria-labelledby={ariaLab}
                    aria-describedby={ariaDesc}
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
                            <AddRecordModalHeader>
                                {modalHeader}
                            </AddRecordModalHeader>
                            {needNameHandler && (
                                <CustomTextField
                                    type="text"
                                    placeholder="Name"
                                    changeFunc={nameFunction}
                                    maxlength={maxTextLength}
                                />
                            )}
                            <InputContainer>
                                <InputDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Weight"
                                            changeFunc={weightFunction}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Sets"
                                            changeFunc={setsFunction}
                                        />
                                    </FieldDivider>
                                </InputDivider>
                                <InputDivider>
                                    <FieldDivider>
                                        <CustomSelector
                                            changeFunc={unitFunction}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <CustomNumberField
                                            type="number"
                                            placeholder="Reps"
                                            changeFunc={repsFunction}
                                        />
                                    </FieldDivider>
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

export default RecordCardAddModal;
