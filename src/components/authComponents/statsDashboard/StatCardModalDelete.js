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

const DeleteModalContainer = styled(ModalContainer)`
    width: 82.5%;
`;

const DeleteModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const DeleteModalDesc = styled(ModalDesc)`
    white-space: normal;
    text-align: justify;
    text-justify: distribute;
    text-align-last: left;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
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
                    <DeleteModalContainer>
                        <DeleteModalHeader>Confirm Deletion</DeleteModalHeader>
                        <DeleteModalDesc>
                            Are you sure you want to delete this stat? This
                            process is irreversible, and all underlying records
                            will be deleted.
                        </DeleteModalDesc>
                        <ButtonContainer>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={buttonSubmitFunction}
                            >
                                Delete
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={closeFunction}
                            >
                                Cancel
                            </Button>
                        </ButtonContainer>
                    </DeleteModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default StatCardModalDelete;
