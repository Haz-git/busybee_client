import React from 'react';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import CustomTextField from '../dashboardComponents/CustomTextField';
import CustomSelector from '../dashboardComponents/CustomSelector';
import {
    createMuiTheme,
    withStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const AddRecordModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const AddRecordModalHeader = styled(ModalHeader)`
    font-size: 1.8em;
    font-weight: 900;
    margin: 0.5em 0;
`;

const InputContainer = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.7em;
`;

const InputDivider = styled.div`
    margin: 0.3em 0.3em;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1.2em',
        padding: '.5em 1em',
        color: 'white',
    },
})(Button);

const StatSelectModal = ({
    ariaLab,
    ariaDesc,
    modalHeader,
    openBoolean,
    closeFunction,
    weightFunction,
    setsFunction,
    repsFunction,
    unitFunction,
    submitHandler,
    needNameHandler,
    nameFunction,
    maxTextLength,
}) => {
    return (
        <>
            <Modal
                aria-labelledby={ariaLab}
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
                    <AddRecordModalContainer>
                        <AddRecordModalHeader>
                            {modalHeader}
                        </AddRecordModalHeader>
                        {needNameHandler && (
                            <CustomTextField
                                type="text"
                                placeholder="Name"
                                changeFunc={nameFunction}
                                maxlength={maxTextLength}
                            />
                        )}
                        <InputContainer>
                            <InputDivider>
                                <CustomNumberField
                                    type="number"
                                    placeholder="Weight"
                                    changeFunc={weightFunction}
                                />
                                <CustomNumberField
                                    type="number"
                                    placeholder="Sets"
                                    changeFunc={setsFunction}
                                />
                            </InputDivider>
                            <InputDivider>
                                <CustomSelector changeFunc={unitFunction} />
                                <CustomNumberField
                                    type="number"
                                    placeholder="Reps"
                                    changeFunc={repsFunction}
                                />
                            </InputDivider>
                        </InputContainer>
                        <ButtonContainer>
                            <ThemeProvider theme={theme}>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // onClick={buttonSubmitFunction}
                                >
                                    Save
                                </StyledButton>
                            </ThemeProvider>
                            <StyledButton
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={closeFunction}
                            >
                                Cancel
                            </StyledButton>
                        </ButtonContainer>
                    </AddRecordModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default StatSelectModal;
