import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import CustomSelector from '../dashboardComponents/CustomSelector';
import { withStyles } from '@material-ui/core/styles';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const EditRecordModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const EditRecordModalHeader = styled(ModalHeader)`
    font-size: 1.2em;
    font-weight: 900;
    margin: 0.5em 0;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 0.7em;
`;

const InputDivider = styled.div`
    margin: 0 0.5em;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1.3em',
    },
})(Button);

const RecordCardEditModal = ({
    openBoolean,
    closeFunction,
    weightFunction,
    setsFunction,
    repsFunction,
    unitFunction,
    submitHandler,
    existingStatSets,
    existingStatReps,
    existingStatWeight,
}) => {
    return (
        <>
            <Modal
                aria-labelledby="modal for add record"
                aria-describedby="modal for adding a new record"
                open={openBoolean}
                onClose={closeFunction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBoolean}>
                    <EditRecordModalContainer>
                        <EditRecordModalHeader>
                            Edit your record!
                        </EditRecordModalHeader>
                        <InputContainer>
                            <InputDivider>
                                <CustomNumberField
                                    type="number"
                                    existingStat={existingStatWeight}
                                    changeFunc={weightFunction}
                                />
                                <CustomNumberField
                                    type="number"
                                    existingStat={existingStatSets}
                                    changeFunc={setsFunction}
                                />
                            </InputDivider>
                            <InputDivider>
                                <CustomSelector changeFunc={unitFunction} />
                                <CustomNumberField
                                    type="number"
                                    existingStat={existingStatReps}
                                    changeFunc={repsFunction}
                                />
                            </InputDivider>
                        </InputContainer>
                        <ButtonContainer>
                            <StyledButton
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={submitHandler}
                            >
                                Save
                            </StyledButton>
                            <StyledButton
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={closeFunction}
                            >
                                Cancel
                            </StyledButton>
                        </ButtonContainer>
                    </EditRecordModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default RecordCardEditModal;
