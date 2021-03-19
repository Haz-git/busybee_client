import React from 'react';
import CustomSaveButton from '../dashboardComponents/CustomSaveButton';
import CustomCancelButton from '../dashboardComponents/CustomCancelButton';
import CustomDeleteButton from '../dashboardComponents/CustomDeleteButton';

//Styles:
import styled, { keyframes } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { isBrowser, isMobileOnly } from 'react-device-detect';

import {
    BrowserModalContainer,
    ModalContainer,
    ModalHeader,
    ModalDesc,
} from '../dashboardComponents/UserPowerStatCard';

const fadeInError = keyframes`
    from { 
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const SettingsModalContainer = styled(ModalContainer)`
    width: 92.5%;
`;

const SettingsModalHeader = styled(ModalHeader)`
    white-space: normal;
`;

const SettingsModalDesc = styled(ModalDesc)`
    margin: 0.7em 0;
    white-space: normal;
    text-align: center;
`;

export const CustomConfirmButton = styled.button`
    border: none;
    border-radius: 0.5em;
    color: white;
    background: #156711;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 300;
    font-size: 1em;
    letter-spacing: 0.05em;
    padding: 0.8em 1em;
    text-shadow: rgba(0, 0, 0, 1) 0px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px;

    &:hover {
        background: #14a84b;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    grid-column-gap: 0.5em;
`;

export const ButtonDivider = styled.div`
    margin: 0.6em 0;
`;

const ErrorLabel = styled.h3`
    font-size: 0.9em;
    font-family: 'Lato';
    color: red;
    font-weight: 700;
    margin: 0.2em 0;
    opacity: 1;
    animation: ${fadeInError} 0.4s ease-in;
`;

const ErrorLabelInvi = styled.h3`
    font-size: 0.9em;
    font-family: 'Lato';
    color: red;
    font-weight: 700;
    margin: 0.2em 0;
    opacity: 0;
`;

const FieldDivider = styled.div`
    margin: 0.4em 0;
`;

const FieldLabel = styled.h3`
    font-size: 0.9em;
    font-family: 'Lato';
    color: white;
    font-weight: 700;
    text-align: left;
    margin-bottom: 0.5em;
    margin-left: 1em;
`;

const Field = styled.input`
    border: none;
    border-radius: 5em;
    background-color: #111a28;
    color: white;
    padding: 0.3em 1.4em;
    width: 100%;
    font-family: 'Nunito', sans-serif, helvetica;
    font-weight: 900;
    font-size: 0.7em;
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

const SettingsModal = ({
    openBoolean,
    closeFunction,
    buttonSubmitFunction,
    modalHeader,
    modalDesc,
    ariaLabel,
    ariaDesc,
    isSignOutModal,
    isPasswordModal,
    isEmailModal,
    isUserDetailsModal,
    existingUserName,
    existingFirstName,
    existingLastName,
    existingEmail,
    editFirstNameHandler,
    editLastNameHandler,
    editUserNameHandler,
    editEmailHandler,
    editEmailConfirmHandler,
    editCurrentPasswordHandler,
    editNewPasswordHandler,
    editNewPasswordConfirmHandler,
    userDetailSubmissionHandler,
    userEmailSubmissionHandler,
    userPasswordSubmissionHandler,
    hasPasswordError,
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
                        <SettingsModalContainer>
                            <SettingsModalHeader>
                                {modalHeader}
                            </SettingsModalHeader>
                            <SettingsModalDesc>{modalDesc}</SettingsModalDesc>
                            {isSignOutModal === 'true' ? (
                                <>
                                    <CustomDeleteButton
                                        buttonLabel="Yes, Sign Me Out"
                                        onClickFunction={buttonSubmitFunction}
                                    />
                                    <ButtonDivider />
                                    <CustomCancelButton
                                        buttonLabel="No, Keep Me Logged In"
                                        onClickFunction={closeFunction}
                                    />
                                </>
                            ) : null}
                            {isPasswordModal === 'true' ? (
                                <>
                                    {hasPasswordError === true ? (
                                        <ErrorLabel>
                                            Your current password is incorrect.
                                        </ErrorLabel>
                                    ) : (
                                        <ErrorLabelInvi>
                                            Your current password is incorrect.
                                        </ErrorLabelInvi>
                                    )}
                                    <FieldDivider>
                                        <FieldLabel>
                                            Current Password
                                        </FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={
                                                editCurrentPasswordHandler
                                            }
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New Password</FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={editNewPasswordHandler}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>
                                            Confirm New Password
                                        </FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={
                                                editNewPasswordConfirmHandler
                                            }
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userPasswordSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                            {isEmailModal === 'true' ? (
                                <>
                                    <FieldDivider>
                                        <FieldLabel>
                                            New Email Address
                                        </FieldLabel>
                                        <Field
                                            type="email"
                                            placeholder={existingEmail}
                                            onChange={editEmailHandler}
                                            maxLength="20"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>
                                            Confirm New Email Address
                                        </FieldLabel>
                                        <Field
                                            type="email"
                                            onChange={editEmailConfirmHandler}
                                            maxLength="20"
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userEmailSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                            {isUserDetailsModal === 'true' ? (
                                <>
                                    <FieldDivider>
                                        <FieldLabel>New Username</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingUserName}
                                            onChange={editUserNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New First Name</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingFirstName}
                                            onChange={editFirstNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New Last Name</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingLastName}
                                            onChange={editLastNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userDetailSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                        </SettingsModalContainer>
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
                            <SettingsModalHeader>
                                {modalHeader}
                            </SettingsModalHeader>
                            <SettingsModalDesc>{modalDesc}</SettingsModalDesc>
                            {isSignOutModal === 'true' ? (
                                <>
                                    <CustomDeleteButton
                                        buttonLabel="Yes, Sign Me Out"
                                        onClickFunction={buttonSubmitFunction}
                                    />
                                    <ButtonDivider />
                                    <CustomCancelButton
                                        buttonLabel="No, Keep Me Logged In"
                                        onClickFunction={closeFunction}
                                    />
                                </>
                            ) : null}
                            {isPasswordModal === 'true' ? (
                                <>
                                    {hasPasswordError === true ? (
                                        <ErrorLabel>
                                            Your current password is incorrect.
                                        </ErrorLabel>
                                    ) : (
                                        <ErrorLabelInvi>
                                            Your current password is incorrect.
                                        </ErrorLabelInvi>
                                    )}
                                    <FieldDivider>
                                        <FieldLabel>
                                            Current Password
                                        </FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={
                                                editCurrentPasswordHandler
                                            }
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New Password</FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={editNewPasswordHandler}
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>
                                            Confirm New Password
                                        </FieldLabel>
                                        <Field
                                            type="password"
                                            onChange={
                                                editNewPasswordConfirmHandler
                                            }
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userPasswordSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                            {isEmailModal === 'true' ? (
                                <>
                                    <FieldDivider>
                                        <FieldLabel>
                                            New Email Address
                                        </FieldLabel>
                                        <Field
                                            type="email"
                                            placeholder={existingEmail}
                                            onChange={editEmailHandler}
                                            maxLength="20"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>
                                            Confirm New Email Address
                                        </FieldLabel>
                                        <Field
                                            type="email"
                                            onChange={editEmailConfirmHandler}
                                            maxLength="20"
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userEmailSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                            {isUserDetailsModal === 'true' ? (
                                <>
                                    <FieldDivider>
                                        <FieldLabel>New Username</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingUserName}
                                            onChange={editUserNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New First Name</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingFirstName}
                                            onChange={editFirstNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <FieldDivider>
                                        <FieldLabel>New Last Name</FieldLabel>
                                        <Field
                                            type="text"
                                            placeholder={existingLastName}
                                            onChange={editLastNameHandler}
                                            maxLength="15"
                                        />
                                    </FieldDivider>
                                    <ButtonContainer>
                                        <CustomSaveButton
                                            buttonLabel="Save Changes"
                                            onClickFunction={
                                                userDetailSubmissionHandler
                                            }
                                        />
                                        <CustomCancelButton
                                            buttonLabel="Cancel"
                                            onClickFunction={closeFunction}
                                        />
                                    </ButtonContainer>
                                </>
                            ) : null}
                        </BrowserModalContainer>
                    </Fade>
                </Modal>
            )}
        </>
    );
};

export default SettingsModal;
