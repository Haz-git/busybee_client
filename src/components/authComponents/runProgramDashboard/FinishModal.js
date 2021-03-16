import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';

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

const FinishModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const FinishModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const FinishModalDesc = styled(ModalDesc)`
    margin: 1em 0;
    white-space: normal;
    text-align: center;
`;

const ButtonContainer = styled.div``;

const StyledFinishButton = withStyles({
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

const FinishModal = ({
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
                        <FinishModalContainer>
                            <FinishModalHeader>{modalHeader}</FinishModalHeader>
                            <FinishModalDesc>{modalDesc}</FinishModalDesc>
                            <ButtonContainer>
                                <StyledFinishButton
                                    size="large"
                                    variant="contained"
                                    onClick={buttonSubmitFunction}
                                >
                                    I'm Done
                                </StyledFinishButton>
                            </ButtonContainer>
                        </FinishModalContainer>
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
                            <FinishModalHeader>{modalHeader}</FinishModalHeader>
                            <FinishModalDesc>{modalDesc}</FinishModalDesc>
                            <ButtonContainer>
                                <StyledFinishButton
                                    size="large"
                                    variant="contained"
                                    onClick={buttonSubmitFunction}
                                >
                                    I'm Done
                                </StyledFinishButton>
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default FinishModal;
