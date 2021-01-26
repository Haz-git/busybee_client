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

const CreateProgramModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const CreateProgramModalHeader = styled(ModalHeader)`
    font-size: 1.2em;
    font-weight: 900;
    margin: 0.5em 0;
`;

//Render:

const CreateProgramModal = ({
    openBoolean,
    closeFunction,
    titleFunction,
    descFunction,
    submitHandler,
}) => {
    return (
        <>
            <Modal
                aria-labelledby="modal for add new program"
                aria-describedby="modal for adding a new program"
                open={openBoolean}
                onClose={closeFunction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBoolean}>
                    <CreateProgramModalContainer>
                        <CreateProgramModalHeader>
                            Create a new Program
                        </CreateProgramModalHeader>
                    </CreateProgramModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default CreateProgramModal;
