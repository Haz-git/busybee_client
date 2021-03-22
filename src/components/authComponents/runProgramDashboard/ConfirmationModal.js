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
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
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
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const UnformattedErrorLabel = styled.p`
    text-align: left;
`;

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
    const shortenModalHeaderName = () => {
        if (isMobileOnly) {
            if (modalHeader.length > 13) {
                return `${modalHeader.slice(0, 13)}...`;
            } else {
                return modalHeader;
            }
        } else {
            if (modalHeader.length > 28) {
                return `${modalHeader.slice(0, 28)}...`;
            } else {
                return modalHeader;
            }
        }
    };
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
                        <ConfirmationModalContainer>
                            {hasProgramExercises === true ? (
                                <>
                                    <ConfirmationModalHeader>
                                        {isFormatted === 'true'
                                            ? `Initiate: ${shortenModalHeaderName()}`
                                            : 'Error: Unformatted Program'}
                                    </ConfirmationModalHeader>
                                    <ConfirmationModalDesc>
                                        {isFormatted === 'true' ? (
                                            modalDesc
                                        ) : (
                                            <>
                                                <UnformattedErrorLabel>
                                                    We're Sorry! You can't run
                                                    this program yet because it
                                                    has not been formatted.
                                                </UnformattedErrorLabel>
                                                <br />
                                                <UnformattedErrorLabel>
                                                    Formatting a program lets us
                                                    know what order you want to
                                                    run the exercises on it.
                                                </UnformattedErrorLabel>
                                                <br />
                                                <UnformattedErrorLabel>
                                                    Please format the program,
                                                    and try again!
                                                </UnformattedErrorLabel>
                                            </>
                                        )}
                                    </ConfirmationModalDesc>
                                    <ButtonContainer>
                                        {isFormatted === 'true' ? (
                                            <>
                                                <CustomSaveButton
                                                    buttonLabel="I'm Ready!"
                                                    onClickFunction={
                                                        buttonSubmitFunction
                                                    }
                                                />
                                                <CustomCancelButton
                                                    buttonLabel="Return"
                                                    onClickFunction={
                                                        closeFunction
                                                    }
                                                />
                                            </>
                                        ) : null}
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
                            {hasProgramExercises === true ? (
                                <>
                                    <ConfirmationModalHeader>
                                        {isFormatted === 'true'
                                            ? `Initiate: ${shortenModalHeaderName()}`
                                            : 'Error: Unformatted Program'}
                                    </ConfirmationModalHeader>
                                    <ConfirmationModalDesc>
                                        {isFormatted === 'true' ? (
                                            modalDesc
                                        ) : (
                                            <>
                                                <UnformattedErrorLabel>
                                                    We're Sorry! You can't run
                                                    this program yet because it
                                                    has not been formatted.
                                                </UnformattedErrorLabel>
                                                <br />
                                                <UnformattedErrorLabel>
                                                    Formatting a program lets us
                                                    know what order you want to
                                                    run the exercises on it.
                                                </UnformattedErrorLabel>
                                                <br />
                                                <UnformattedErrorLabel>
                                                    Please format the program,
                                                    and try again!
                                                </UnformattedErrorLabel>
                                            </>
                                        )}
                                    </ConfirmationModalDesc>
                                    <ButtonContainer>
                                        {isFormatted === 'true' ? (
                                            <>
                                                <CustomSaveButton
                                                    buttonLabel="I'm Ready!"
                                                    onClickFunction={
                                                        buttonSubmitFunction
                                                    }
                                                />
                                                <CustomCancelButton
                                                    buttonLabel="Return"
                                                    onClickFunction={
                                                        closeFunction
                                                    }
                                                />
                                            </>
                                        ) : null}
                                    </ButtonContainer>
                                </>
                            ) : (
                                <ErrorModalHeader>
                                    You cannot run a program with 0 exercises.
                                </ErrorModalHeader>
                            )}
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default ConfirmationModal;
