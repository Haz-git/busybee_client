import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const SettingsModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const SettingsModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const SettingsModalDesc = styled(ModalDesc)`
    margin: 1em 0;
    white-space: normal;
    text-align: center;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const SettingsModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    modalHeader,
    modalDesc,
    ariaLabel,
    ariaDesc,
    isSignOutModal,
}) => {
    return (
        <>
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
                    <SettingsModalContainer>
                        <SettingsModalHeader>{modalHeader}</SettingsModalHeader>
                        {isSignOutModal === 'true' ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={buttonSubmitFunction}
                            >
                                Sign Me Out
                            </Button>
                        ) : null}
                    </SettingsModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default SettingsModal;
