import React from 'react';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
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
import {
    createMuiTheme,
    withStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

//Styles:
const TimeSelectorModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const InputContainer = styled.div`
    margin: 0.5em 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputDivider = styled.div`
    margin: 0 0.3em;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
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

const TimeSelectModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    modalDesc,
    ariaLabel,
    ariaDesc,
    modalHeader,
    minHandler,
    secHandler,
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
                        <TimeSelectorModalContainer>
                            <ModalHeader>{modalHeader}</ModalHeader>
                            <ModalDesc>{modalDesc}</ModalDesc>
                            <InputContainer>
                                <InputDivider>
                                    <CustomNumberField
                                        placeholder="Minutes"
                                        changeFunc={minHandler}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <CustomNumberField
                                        placeholder="Seconds"
                                        changeFunc={secHandler}
                                    />
                                </InputDivider>
                            </InputContainer>
                            <ButtonContainer>
                                <ThemeProvider theme={theme}>
                                    <StyledButton
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={buttonSubmitFunction}
                                    >
                                        Save
                                    </StyledButton>
                                </ThemeProvider>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    onClick={closeFunction}
                                    color="secondary"
                                >
                                    Cancel
                                </StyledButton>
                            </ButtonContainer>
                        </TimeSelectorModalContainer>
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
                            <ModalHeader>{modalHeader}</ModalHeader>
                            <ModalDesc>{modalDesc}</ModalDesc>
                            <InputContainer>
                                <InputDivider>
                                    <CustomNumberField
                                        placeholder="Minutes"
                                        changeFunc={minHandler}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <CustomNumberField
                                        placeholder="Seconds"
                                        changeFunc={secHandler}
                                    />
                                </InputDivider>
                            </InputContainer>
                            <ButtonContainer>
                                <ThemeProvider theme={theme}>
                                    <StyledButton
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={buttonSubmitFunction}
                                    >
                                        Save
                                    </StyledButton>
                                </ThemeProvider>
                                <StyledButton
                                    size="large"
                                    variant="contained"
                                    onClick={closeFunction}
                                    color="secondary"
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

export default TimeSelectModal;
