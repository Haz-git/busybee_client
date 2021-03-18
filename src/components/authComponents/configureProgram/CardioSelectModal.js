import React from 'react';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';

//Styles:
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CustomNumberField from '../dashboardComponents/CustomNumberField';
import CustomTextField from '../dashboardComponents/CustomTextField';
import CustomSelector from '../dashboardComponents/CustomSelector';
import { withStyles } from '@material-ui/core/styles';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const CardioModalContainer = styled(ModalContainer)`
    width: 92%;
`;

const CardioModalHeader = styled(ModalHeader)`
    font-size: 1.8em;
    font-weight: 900;
    margin: 0.5em 0;
`;

const TextFieldDivider = styled.div`
    margin-top: 0.5em;
    margin-bottom: 0.8em;
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

const FieldDivider = styled.div`
    margin: 0.8em 0;
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

const StyledButton = withStyles({
    root: {
        textTransform: 'capitalize',
        fontSize: '1.3em',
    },
})(Button);

const CardioSelectModal = ({
    ariaLab,
    ariaDesc,
    modalHeader,
    openBoolean,
    closeFunction,
    submitHandler,
    nameFunction,
    maxTextLength,
    minHandler,
    secHandler,
}) => {
    return (
        <>
            {isMobileOnly && (
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
                        <CardioModalContainer>
                            <CardioModalHeader>{modalHeader}</CardioModalHeader>
                            <TextFieldDivider>
                                <CustomTextField
                                    type="text"
                                    placeholder="Cardio exercise..."
                                    changeFunc={nameFunction}
                                    maxlength={maxTextLength}
                                />
                            </TextFieldDivider>
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
                                    onClickFunction={submitHandler}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </CardioModalContainer>
                    </Fade>
                </Modal>
            )}
            {isBrowser && (
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
                        <BrowserModalContainer>
                            <CardioModalHeader>{modalHeader}</CardioModalHeader>
                            <TextFieldDivider>
                                <CustomTextField
                                    type="text"
                                    placeholder="Cardio exercise..."
                                    changeFunc={nameFunction}
                                    maxlength={maxTextLength}
                                />
                            </TextFieldDivider>
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
                                    onClickFunction={submitHandler}
                                />
                                <CustomCancelButton
                                    buttonLabel="Cancel"
                                    onClickFunction={closeFunction}
                                />
                            </ButtonContainer>
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default CardioSelectModal;
