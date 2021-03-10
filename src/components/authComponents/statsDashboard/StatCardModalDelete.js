import React from 'react';
import {
    BrowserView,
    MobileOnlyView,
    isBrowser,
    isMobileOnly,
} from 'react-device-detect';

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
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1em',
    },
})(Button);

const StatCardModalDelete = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
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
                        <DeleteModalContainer>
                            <DeleteModalHeader>
                                Confirm Deletion
                            </DeleteModalHeader>
                            <DeleteModalDesc>{modalDesc}</DeleteModalDesc>
                            <ButtonContainer>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    onClick={buttonSubmitFunction}
                                >
                                    Delete
                                </StyledButton>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    onClick={closeFunction}
                                >
                                    Cancel
                                </StyledButton>
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
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    onClick={buttonSubmitFunction}
                                >
                                    Delete
                                </StyledButton>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    onClick={closeFunction}
                                >
                                    Cancel
                                </StyledButton>
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default StatCardModalDelete;
