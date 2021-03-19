import React from 'react';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

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
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    buttonSubmitFunction={buttonSubmitFunction}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    buttonSubmitFunction={closeFunction}
                                />
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
                                <CustomSaveButton
                                    buttonLabel="Save"
                                    buttonSubmitFunction={buttonSubmitFunction}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    buttonSubmitFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default TimeSelectModal;
