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

const PasswordFieldDivider = styled.div`
    margin: 0.7em 0;
`;

const PasswordFieldLabel = styled.h3`
    font-size: 0.5em;
    font-family: 'Lato';
    color: white;
    font-weight: 700;
`;

const PasswordField = styled.input`
    border: none;
    border-radius: 5em;
    background-color: #111a28;
    color: white;
    padding: 0.3em 1.4em;
    width: 100%;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 0.7em;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.3em;
    }
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
    isPasswordModal,
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
                        <SettingsModalDesc>{modalDesc}</SettingsModalDesc>
                        {isSignOutModal === 'true' ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={buttonSubmitFunction}
                            >
                                Yes, Sign Me Out
                            </Button>
                        ) : null}
                        {isPasswordModal === 'true' ? (
                            <>
                                <PasswordFieldDivider>
                                    <PasswordField type="password" />
                                </PasswordFieldDivider>
                                <PasswordFieldDivider>
                                    <PasswordField type="password" />
                                </PasswordFieldDivider>
                            </>
                        ) : null}
                    </SettingsModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default SettingsModal;
