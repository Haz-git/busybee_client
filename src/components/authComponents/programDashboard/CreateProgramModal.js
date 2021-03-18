import React from 'react';
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

const CreateProgramModalContainer = styled(ModalContainer)`
    width: 92%;
    position: absolute;
    left: 50%;
    top: 40%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const CreateProgramModalHeader = styled(ModalHeader)`
    font-size: 1.4em;
    font-weight: 900;
    margin: 0.4em 0;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const InputDivider = styled.div`
    margin: 0.3em 0;
    width: 100%;
`;

const TitleInput = styled.input`
    margin: 0 auto;
    /* margin: 0.5em 0.5em; */
    border: none;
    border-radius: 0.3em;
    background-color: inherit;
    color: white;
    padding: 0.5em 1em;
    width: 100%;
    max-width: 100%;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 1em;
    background-color: #111a28;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.3em;
    }
`;

const DescInput = styled.textarea`
    margin: 0 auto;
    border: none;
    border-radius: 0.3em;
    background-color: inherit;
    color: white;
    width: 100%;
    max-width: 100%;
    padding: 0.5em 1em;
    height: 10em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 300;
    font-size: 1em;
    background-color: #111a28;
    box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 4px;
    resize: none;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;

    &:hover {
        outline: none;
    }

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: 375px) {
        font-size: 1.3em;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

//Render:

const CreateProgramModal = ({
    ariaDesc,
    ariaLabel,
    headerLabel,
    openBoolean,
    closeFunction,
    titleFunction,
    descFunction,
    submitHandler,
    nameValue,
    descValue,
    namePlaceholder,
    descPlaceholder,
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
                        <CreateProgramModalContainer>
                            <CreateProgramModalHeader>
                                {headerLabel}
                            </CreateProgramModalHeader>
                            <InputContainer>
                                <InputDivider>
                                    <TitleInput
                                        placeholder={
                                            namePlaceholder
                                                ? namePlaceholder
                                                : 'Program name...'
                                        }
                                        onChange={titleFunction}
                                        maxLength={20}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <DescInput
                                        placeholder={
                                            descPlaceholder
                                                ? descPlaceholder
                                                : 'Program description (optional)'
                                        }
                                        onChange={descFunction}
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
                        </CreateProgramModalContainer>
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
                            <CreateProgramModalHeader>
                                {headerLabel}
                            </CreateProgramModalHeader>
                            <InputContainer>
                                <InputDivider>
                                    <TitleInput
                                        placeholder={
                                            namePlaceholder
                                                ? namePlaceholder
                                                : 'Program name...'
                                        }
                                        onChange={titleFunction}
                                        maxLength={20}
                                    />
                                </InputDivider>
                                <InputDivider>
                                    <DescInput
                                        placeholder={
                                            descPlaceholder
                                                ? descPlaceholder
                                                : 'Program description (optional)'
                                        }
                                        onChange={descFunction}
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

export default CreateProgramModal;
