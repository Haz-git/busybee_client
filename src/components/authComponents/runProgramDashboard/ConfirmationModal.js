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

const ErrorModalHeader = styled(ModalHeader)`
    white-space: normal;
    color: red;
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

const UnformattedErrorLabel = styled.p`
    text-align: left;
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
    isFormatted,
    hasProgramExercises,
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
                        {hasProgramExercises === true ? (
                            <>
                                <ConfirmationModalHeader>
                                    {isFormatted === 'true'
                                        ? modalHeader
                                        : 'Error: Unformatted Program'}
                                </ConfirmationModalHeader>
                                <ConfirmationModalDesc>
                                    {isFormatted === 'true' ? (
                                        modalDesc
                                    ) : (
                                        <>
                                            <UnformattedErrorLabel>
                                                We're Sorry! You can't run this
                                                program yet because it has not
                                                been formatted.
                                            </UnformattedErrorLabel>
                                            <br />
                                            <UnformattedErrorLabel>
                                                Formatting a program lets us
                                                know what order you want to run
                                                the exercises on it.
                                            </UnformattedErrorLabel>
                                            <br />
                                            <UnformattedErrorLabel>
                                                Please format the program, and
                                                try again!
                                            </UnformattedErrorLabel>
                                        </>
                                    )}
                                </ConfirmationModalDesc>
                                <ButtonContainer>
                                    {isFormatted === 'true' ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <StyledDeletionButton
                                            size="large"
                                            variant="contained"
                                            onClick={closeFunction}
                                        >
                                            Return
                                        </StyledDeletionButton>
                                    )}
                                </ButtonContainer>
                            </>
                        ) : (
                            <ErrorModalHeader>
                                You cannot run a program with 0 exercises.
                            </ErrorModalHeader>
                        )}
                    </ConfirmationModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
