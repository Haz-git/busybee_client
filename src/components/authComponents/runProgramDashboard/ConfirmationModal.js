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

const ConfirmationModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const ConfirmationModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const ConfirmationModalDesc = styled(ModalDesc)`
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

const StyledConfirmationButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1em',
        background: '#368f1f',
        color: 'white',

        '&:hover': {
            background: '#6cdc4f',
        },
    },
})(Button);

const StyledDeletionButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1em',
        background: '#272C34',
        color: 'white',

        '&:hover': {
            background: '#454D59',
        },
    },
})(Button);

const ConfirmationModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    modalHeader,
    modalDesc,
    ariaLabel,
    ariaDesc,
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
                    <ConfirmationModalContainer>
                        <ConfirmationModalHeader>
                            {modalHeader}
                        </ConfirmationModalHeader>
                        <ConfirmationModalDesc>
                            {modalDesc}
                        </ConfirmationModalDesc>
                        <ButtonContainer>
                            <StyledConfirmationButton
                                size="large"
                                variant="contained"
                                onClick={buttonSubmitFunction}
                            >
                                I'm Ready
                            </StyledConfirmationButton>
                            <StyledDeletionButton
                                size="large"
                                variant="contained"
                                onClick={closeFunction}
                            >
                                Nevermind
                            </StyledDeletionButton>
                        </ButtonContainer>
                    </ConfirmationModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
