import React from 'react';
import GeneralSaveButton from './GeneralSaveButton';
import GeneralCancelButton from './GeneralCancelButton';

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
    padding: 0 1em;
`;

const InputDivider = styled.div`
    margin: 0.6em 0;
`;

const TitleInput = styled.input`
    margin: 0 auto;
    /* margin: 0.5em 0.5em; */
    border: 1px solid white;
    border-radius: 0.3em;
    background-color: inherit;
    color: white;
    padding: 0.5em 1em;
    width: 100%;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 1em;

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

const DescLabel = styled.label``;

const DescInput = styled.textarea`
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 0.3em;
    background-color: inherit;
    color: white;
    padding: 0.5em 1em;
    width: 100%;
    height: 10em;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 300;
    font-size: 0.7em;

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
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ButtonMargin = styled.span`
    margin: 0 2em;
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
                        <InputContainer>
                            <InputDivider>
                                <TitleInput
                                    placeholder="Program name..."
                                    onChange={titleFunction}
                                />
                            </InputDivider>
                            <InputDivider>
                                <DescInput
                                    placeholder="Description (optional)..."
                                    onChange={descFunction}
                                />
                            </InputDivider>
                            <ButtonContainer>
                                <ButtonMargin>
                                    <GeneralSaveButton
                                        clickFunction={submitHandler}
                                    />
                                </ButtonMargin>
                                <ButtonMargin>
                                    <GeneralCancelButton
                                        clickFunction={closeFunction}
                                    />
                                </ButtonMargin>
                            </ButtonContainer>
                        </InputContainer>
                    </CreateProgramModalContainer>
                </Fade>
            </Modal>
        </>
    );
};

export default CreateProgramModal;
