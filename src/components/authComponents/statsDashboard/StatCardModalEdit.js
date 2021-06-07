import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomTextField from '../dashboardComponents/CustomTextField';
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

//Styles:

const DeleteModalContainer = styled(ModalContainer)`
    width: 82.5%;
`;

const DeleteModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const InputContainer = styled.div`
    margin: 0.6em 0;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const StatCardModalEdit = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    inputFunction,
    existingStatName,
    buttonDisabledState,
}) => {
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
                        <DeleteModalContainer>
                            <DeleteModalHeader>
                                Edit Stat Name
                            </DeleteModalHeader>
                            <InputContainer>
                                <CustomTextField
                                    type="text"
                                    placeholder={`${existingStatName}`}
                                    changeFunc={inputFunction}
                                />
                            </InputContainer>
                            <ButtonContainer>
                                <CustomSaveButton
                                    buttonLabel={
                                        buttonDisabledState === false
                                            ? 'Save'
                                            : 'Saving...'
                                    }
                                    onClickFunction={buttonSubmitFunction}
                                    isLoaderBtn={true}
                                    disabledState={buttonDisabledState}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </DeleteModalContainer>
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
                        <BrowserModalContainer>
                            <DeleteModalHeader>
                                Edit Stat Name
                            </DeleteModalHeader>
                            <InputContainer>
                                <CustomTextField
                                    type="text"
                                    placeholder={`${existingStatName}`}
                                    changeFunc={inputFunction}
                                />
                            </InputContainer>
                            <ButtonContainer>
                                <CustomSaveButton
                                    buttonLabel={
                                        buttonDisabledState === false
                                            ? 'Save'
                                            : 'Saving...'
                                    }
                                    onClickFunction={buttonSubmitFunction}
                                    isLoaderBtn={true}
                                    disabledState={buttonDisabledState}
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

export default StatCardModalEdit;
