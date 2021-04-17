import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomDeleteButton from '../dashboardComponents/CustomDeleteButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const DeleteModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const DeleteModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const DeleteModalDesc = styled(ModalDesc)`
    white-space: normal;
    text-align: center;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const StatCardModalDelete = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    modalDesc,
    ariaLabel,
    ariaDesc,
    buttonDisabledState,
}) => {
    return (
        <>
            {isMobileOnly && (
                <Modal
                    aria-labelledby={ariaLabel}
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
                        <DeleteModalContainer>
                            <DeleteModalHeader>
                                Confirm Deletion
                            </DeleteModalHeader>
                            <DeleteModalDesc>{modalDesc}</DeleteModalDesc>
                            <ButtonContainer>
                                <CustomDeleteButton
                                    buttonLabel={
                                        buttonDisabledState === false
                                            ? 'Delete'
                                            : 'Deleting...'
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
                    aria-labelledby={ariaLabel}
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
                            <DeleteModalHeader>
                                Confirm Deletion
                            </DeleteModalHeader>
                            <DeleteModalDesc>{modalDesc}</DeleteModalDesc>
                            <ButtonContainer>
                                <CustomDeleteButton
                                    buttonLabel={
                                        buttonDisabledState === false
                                            ? 'Delete'
                                            : 'Deleting...'
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

export default StatCardModalDelete;
