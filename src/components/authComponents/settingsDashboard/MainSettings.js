import React, { useState } from 'react';
import SettingsCard from './SettingsCard';
import SettingsModal from './SettingsModal';
import { connect } from 'react-redux';
import {
    userEditGeneralInfo,
    userEditEmail,
    userEditPassword,
} from '../../../redux/userDetails/detailActions';
import { userLogout } from '../../../redux/userLogout/userLogoutActions';
import ThemeToggler from './ThemeToggler';
import { isBrowser, isMobileOnly } from 'react-device-detect';
import GlobalSnackbar from '../dashboardComponents/GlobalSnackbar';

//Styles:
import styled from 'styled-components';
import {
    BrowserMainHeader,
    MainHeader,
} from '../dashboardComponents/UserGreeting';
import { UserDetail } from '@styled-icons/boxicons-solid/UserDetail';
import { Email } from '@styled-icons/material-outlined/Email';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';

//Initiating constants for edit types:

const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
const EMAIL_CHANGE = 'EMAIL_CHANGE';
const USER_INFO_CHANGE = 'USER_INFO_CHANGE';

//Icons:

const LogOutIcon = styled(LogOut)`
    height: 5em;
    width: 5em;
    margin-right: 0.4em;
    color: white;
    @media screen and (max-width: 320px) {
        height: 4em;
        width: 4em;
    }
`;

const PasswordIcon = styled(LockPassword)`
    height: 5em;
    width: 5em;
    color: white;
    @media screen and (max-width: 320px) {
        height: 4em;
        width: 4em;
    }
`;

const UserDetailIcon = styled(UserDetail)`
    height: 5em;
    width: 5em;
    color: white;
    @media screen and (max-width: 320px) {
        height: 4em;
        width: 4em;
    }
`;

const EmailIcon = styled(Email)`
    height: 5em;
    width: 5em;
    color: white;
    @media screen and (max-width: 320px) {
        height: 4em;
        width: 4em;
    }
`;

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5em 0.5em;
`;

const SecondarySettingsHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 400;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const BrowserSecondarySettingsHeader = styled(MainHeader)`
    text-align: left;
    font-size: 1.2em;
    font-weight: 700;
    white-space: nowrap;
    margin: 0.7em 0;
`;

const SettingOptionsContainer = styled.div`
    width: 100%;
    margin-top: 2.5em;
    margin-bottom: 1.8em;
    display: -ms-grid;
    padding: 1em 1em;
    display: grid;
    /* justify-items: center; */
    justify-content: center;
    -ms-grid-columns: 50% 50%;
    grid-template-columns: 50% 50%;
    /* grid-row: auto auto; */
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`;

const BrowserSettingOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: -1em;
    margin-top: 2em;
    margin-bottom: 2em;
`;
/*
    This settings page should have the following features:
    1. Change first name, last name, user name (minor changes)
    2. Change e-mail (This changes the username, so be sure to let user know about this...)
    3. Change password (Important... we should have an initial check I.E check if the user knows the current password.)
    4. Logout of the app.

    Maybe the formatting could be something like:...

    [] [] 
    [] []
    [themes]

    or 

    [] []
    [] []
      []
*/

const MainSettings = ({
    user,
    userEditGeneralInfo,
    userEditEmail,
    userEditPassword,
    userLogout,
    modeStatus,
}) => {
    //User's auth details should be persisted, and so no need for a loader state..

    //Snackbar open/close state handlers:

    const [stateEditDetailSnackBar, setStateEditDetailSnackBar] = useState(
        false
    );
    const [stateEditPasswordSnackBar, setStateEditPasswordSnackBar] = useState(
        false
    );
    const [stateEditEmailSnackBar, setStateEditEmailSnackBar] = useState(false);

    //Modal open/close state handlers:
    const [stateEditUserDetailsModal, setStateEditUserDetailsModal] = useState(
        false
    );
    const [stateEditEmailModal, setStateEditEmailModal] = useState(false);
    const [stateEditPasswordModal, setStateEditPasswordModal] = useState(false);
    const [stateSignOutModal, setStateSignOutModal] = useState(false);

    //Button state on user request:
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //User text input state handlers:

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newEmailConfirm, setNewEmailConfirm] = useState('');

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newUserName, setNewUserName] = useState('');

    //Button state and modal callback function:

    const setStateButton = (bool) => {
        setIsButtonDisabled(bool);
    };

    const emailModalChange = (bool) => {
        setStateEditEmailModal(bool);
    };

    const passwordModalChange = (bool) => {
        setStateEditPasswordModal(bool);
    };

    const userDetailsModalChange = (bool) => {
        setStateEditUserDetailsModal(bool);
    };

    //EditUserDetailsModal handlers:

    const openEditUserDetailsModal = () => {
        setStateEditUserDetailsModal(true);
    };

    const closeEditUserDetailsModal = () => {
        setStateEditUserDetailsModal(false);
    };

    const handleNewFirstNameChange = (e) => {
        setNewFirstName(e.target.value);
    };

    const handleNewLastNameChange = (e) => {
        setNewLastName(e.target.value);
    };

    const handleNewUserNameChange = (e) => {
        setNewUserName(e.target.value);
    };

    const handleUserDetailSubmission = () => {
        if (newUserName === '' && newFirstName === '' && newLastName === '') {
            alert('Please input a value you want to change.');
        } else {
            setIsButtonDisabled(true);
            userEditGeneralInfo(
                USER_INFO_CHANGE,
                newUserName,
                newFirstName,
                newLastName,
                showEditDetailSnackBar,
                setStateButton,
                userDetailsModalChange
            );
        }
    };

    //EditEmailModal handlers:

    const openEditEmailModal = () => {
        setStateEditEmailModal(true);
    };

    const closeEditEmailModal = () => {
        setStateEditEmailModal(false);
    };

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleNewEmailConfirmChange = (e) => {
        setNewEmailConfirm(e.target.value);
    };

    const handleEmailSubmission = () => {
        if (newEmailConfirm === newEmail) {
            if (
                newEmail !== '' &&
                newEmail !== null &&
                newEmailConfirm !== '' &&
                newEmailConfirm !== null
            ) {
                setIsButtonDisabled(true);
                userEditEmail(
                    EMAIL_CHANGE,
                    newEmail,
                    showEditEmailSnackBar,
                    setStateButton,
                    emailModalChange
                );
            } else {
                alert('Your new email must not be empty values.');
            }
        } else {
            alert('Your emails do not match!');
        }
    };

    //EditPasswordModal handlers:

    const openEditPasswordModal = () => {
        setStateEditPasswordModal(true);
    };

    const closeEditPasswordModal = () => {
        setStateEditPasswordModal(false);

        //Reset the hasPassword state on close.
        setHasPasswordError(false);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleNewPasswordConfirmChange = (e) => {
        setNewPasswordConfirm(e.target.value);
    };

    const handlePasswordError = (bool) => {
        setHasPasswordError(bool);

        //In event of an error, we want to keep modal open and display errorlabel:
        setStateEditPasswordModal(bool);
    };

    const handlePasswordSubmission = () => {
        if (newPassword === newPasswordConfirm) {
            if (
                newPassword !== '' &&
                newPassword !== null &&
                newPasswordConfirm !== '' &&
                newPasswordConfirm !== null
            ) {
                setIsButtonDisabled(true);
                userEditPassword(
                    PASSWORD_CHANGE,
                    newPassword,
                    newPasswordConfirm,
                    currentPassword,
                    handlePasswordError,
                    showEditPasswordSnackBar,
                    setStateButton,
                    passwordModalChange
                );
            } else {
                alert('You cannot save an empty value as your password.');
            }

            //Closing of the modal is handled by handle Password Error currently.
        } else {
            alert('Your passwords do not match!');
        }
    };

    //Sign Out Modal handlers:

    const openSignOutModal = () => {
        setStateSignOutModal(true);
    };

    const closeSignOutModal = () => {
        setStateSignOutModal(false);
    };

    //SnackBar Handlers:

    const showEditDetailSnackBar = (bool) => {
        setStateEditDetailSnackBar(bool);
    };

    const closeEditDetailSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStateEditDetailSnackBar(false);
    };

    const showEditPasswordSnackBar = (bool) => {
        setStateEditPasswordSnackBar(bool);
    };

    const closeEditPasswordSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStateEditPasswordSnackBar(false);
    };

    const showEditEmailSnackBar = (bool) => {
        setStateEditEmailSnackBar(bool);
    };

    const closeEditEmailSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStateEditEmailSnackBar(false);
    };

    //Destructuring variables from store:
    const { firstName, lastName, userName, email } = user.user;

    return (
        <>
            <MainContainer>
                {isMobileOnly && (
                    <>
                        <MainHeader className="MainSettings-MainHeader">
                            Settings Manager
                        </MainHeader>
                        <SecondarySettingsHeader>
                            Change your user preferences.
                        </SecondarySettingsHeader>
                    </>
                )}
                {isBrowser && (
                    <>
                        <BrowserMainHeader>Settings Manager</BrowserMainHeader>
                        <BrowserSecondarySettingsHeader>
                            Change your user preferences.
                        </BrowserSecondarySettingsHeader>
                    </>
                )}
                {isMobileOnly && (
                    <SettingOptionsContainer className="MainSettings-SettingsOptionsContainer">
                        <SettingsCard
                            icon={<LogOutIcon />}
                            textLabel="Sign Out"
                            clickFunc={openSignOutModal}
                        />
                        <SettingsCard
                            icon={<UserDetailIcon />}
                            textLabel="Edit User Details"
                            clickFunc={openEditUserDetailsModal}
                        />
                        <SettingsCard
                            icon={<EmailIcon />}
                            textLabel="Edit Email"
                            clickFunc={openEditEmailModal}
                        />
                        <SettingsCard
                            icon={<PasswordIcon />}
                            textLabel="Edit Password"
                            clickFunc={openEditPasswordModal}
                        />
                    </SettingOptionsContainer>
                )}
                {isBrowser && (
                    <BrowserSettingOptionsContainer className="MainSettings-SettingsOptionsContainer">
                        <SettingsCard
                            icon={<UserDetailIcon />}
                            textLabel="Edit User Details"
                            clickFunc={openEditUserDetailsModal}
                        />
                        <SettingsCard
                            icon={<EmailIcon />}
                            textLabel="Edit Email"
                            clickFunc={openEditEmailModal}
                        />
                        <SettingsCard
                            icon={<PasswordIcon />}
                            textLabel="Edit Password"
                            clickFunc={openEditPasswordModal}
                        />
                    </BrowserSettingOptionsContainer>
                )}
                {isMobileOnly && (
                    <>
                        <MainHeader>Theme</MainHeader>
                        <div>
                            <ThemeToggler modeStatus={modeStatus} />
                        </div>
                    </>
                )}
                {isBrowser && (
                    <>
                        <BrowserMainHeader>Theme</BrowserMainHeader>
                        <BrowserSecondarySettingsHeader>
                            This feature is currently in-the-works.
                        </BrowserSecondarySettingsHeader>
                        {/* <div>
                            <ThemeToggler modeStatus={modeStatus} />
                        </div> */}
                    </>
                )}
            </MainContainer>
            <SettingsModal
                openBoolean={stateEditUserDetailsModal}
                closeFunction={closeEditUserDetailsModal}
                ariaLabel="Modal for editing user details, such as firstname, lastname, username"
                ariaDesc="Modal for editing user details, such as firstname, lastname, username"
                modalHeader="Edit User Details"
                modalDesc="Change your desired user details."
                isUserDetailsModal="true"
                existingUserName={userName}
                existingFirstName={firstName}
                existingLastName={lastName}
                editFirstNameHandler={handleNewFirstNameChange}
                editLastNameHandler={handleNewLastNameChange}
                editUserNameHandler={handleNewUserNameChange}
                userDetailSubmissionHandler={handleUserDetailSubmission}
                buttonDisabledState={isButtonDisabled}
            />
            <SettingsModal
                openBoolean={stateEditEmailModal}
                closeFunction={closeEditEmailModal}
                ariaLabel="Modal for editing user email address used for sign in"
                ariaDesc="Modal for editing user email address used for sign in"
                modalHeader="Edit Email Address"
                modalDesc="Changing your email address will also change your sign in credentials."
                isEmailModal="true"
                existingEmail={email}
                editEmailHandler={handleNewEmailChange}
                editEmailConfirmHandler={handleNewEmailConfirmChange}
                userEmailSubmissionHandler={handleEmailSubmission}
                buttonDisabledState={isButtonDisabled}
            />
            <SettingsModal
                openBoolean={stateEditPasswordModal}
                closeFunction={closeEditPasswordModal}
                ariaLabel="Modal for editing user Password used for sign in"
                ariaDesc="Modal for editing user Password used for sign in"
                modalHeader="Edit Password"
                modalDesc="Please enter your current password and your desired new password."
                isPasswordModal="true"
                editCurrentPasswordHandler={handleCurrentPasswordChange}
                editNewPasswordHandler={handleNewPasswordChange}
                editNewPasswordConfirmHandler={handleNewPasswordConfirmChange}
                userPasswordSubmissionHandler={handlePasswordSubmission}
                hasPasswordError={hasPasswordError}
                buttonDisabledState={isButtonDisabled}
            />
            <SettingsModal
                openBoolean={stateSignOutModal}
                closeFunction={closeSignOutModal}
                ariaLabel="Modal for confirming user sign out"
                ariaDesc="Modal for confirming user sign out"
                modalHeader="Confirm Sign Out"
                modalDesc="Are you sure you want to sign out? You will have to sign back in to view your account details."
                buttonSubmitFunction={userLogout}
                isSignOutModal="true"
            />
            <GlobalSnackbar
                openFunction={stateEditDetailSnackBar}
                closeFunction={closeEditDetailSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your user details have been updated."
            />
            <GlobalSnackbar
                openFunction={stateEditEmailSnackBar}
                closeFunction={closeEditEmailSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your email has been updated."
            />
            <GlobalSnackbar
                openFunction={stateEditPasswordSnackBar}
                closeFunction={closeEditPasswordSnackBar}
                autoHideDuration={3000}
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                alertSeverity="success"
                alertMessage="Your password has been updated."
            />
        </>
    );
};

/*
Todo 2/17/2021

1. Finish creating modal (esp for user details) -- done
2. Create all text handlers -- done
3. Backend -- Create routes for changing user settings -- test via postman -- done
3.5. Switch UserGreeting to depend on a separate reducer other than auth. Currently, upon user detail changes the values do not update. -- done.
4. Create action creators for changing user Settings --done
5. Link all action creators --done
5.5. Include error handler for wrong current password -- done
6. Create snackbars for letting user know that details have been updated. -- done
7. Create Theme switcher using hook.

*/

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, {
    userEditGeneralInfo,
    userEditEmail,
    userEditPassword,
    userLogout,
})(MainSettings);
