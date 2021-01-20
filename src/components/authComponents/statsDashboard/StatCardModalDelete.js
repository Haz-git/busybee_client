import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const StatCardModalDelete = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
}) => {
    return (
        <>
            <Modal
                aria-labelledby="stat card modal"
                aria-describedby="modal for stat deletion"
                open={openBoolean}
                onClose={closeFunction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBoolean}>
                    <ModalContainer>
                        <ModalHeader>
                            Are you sure you want to delete this stat?
                        </ModalHeader>
                        <ModalDesc>
                            This process is irreversible, and all underlying
                            records will be deleted.
                        </ModalDesc>
                        <ButtonContainer>
                            <Button
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={buttonSubmitFunction}
                            >
                                Delete
                            </Button>
                            <Button
                                size="large"
                                variant="contained"
                                onClick={closeFunction}
                            >
                                Cancel
                            </Button>
                        </ButtonContainer>
                    </ModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default StatCardModalDelete;
