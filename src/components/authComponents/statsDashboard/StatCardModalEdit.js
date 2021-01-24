import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomTextField from '../dashboardComponents/CustomTextField';
import { withStyles } from '@material-ui/core/styles';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

//Styles:

const DeleteModalContainer = styled(ModalContainer)`
    width: 82.5%;
`;

const DeleteModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const InputContainer = styled.div`
    margin: 0.6em 0;
`;

const ButtonContainer = styled.div`
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
    inputFunction,
}) => {
    return (
        <>
            <Modal
                aria-labelledby="stat card edit modal"
                aria-describedby="modal for stat edit"
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
                        <DeleteModalHeader>Edit Stat Name</DeleteModalHeader>
                        <InputContainer>
                            <CustomTextField
                                type="text"
                                placeholder="New name..."
                                changeFunc={inputFunction}
                                maxlength={17}
                            />
                        </InputContainer>
                        <ButtonContainer>
                            <StyledButton
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={buttonSubmitFunction}
                            >
                                Save
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
        </>
    );
};

export default StatCardModalDelete;
