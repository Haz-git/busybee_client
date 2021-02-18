import React, { useState } from 'react';
import SettingsCard from './SettingsCard';
import { userSignOut } from '../../../utils/signOutHelper';
import SettingsModal from './SettingsModal';
import { connect } from 'react-redux';

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';
import { UserDetail } from '@styled-icons/boxicons-solid/UserDetail';
import { Email } from '@styled-icons/material-outlined/Email';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';

//Icons:

const LogOutIcon = styled(LogOut)`
    height: 5em;
    width: 5em;
    margin-right: 0.4em;
    color: white;
`;

const PasswordIcon = styled(LockPassword)`
    height: 5em;
    width: 5em;
    color: white;
`;

const UserDetailIcon = styled(UserDetail)`
    height: 5em;
    width: 5em;
    color: white;
`;

const EmailIcon = styled(Email)`
    height: 5em;
    width: 5em;
    color: white;
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

const SettingOptionsContainer = styled.div`
    width: 19em;
    margin: 0 auto;
    margin-top: 2.5em;
    margin-bottom: 1.8em;
    display: -ms-grid;
    display: grid;
    justify-items: center;
    justify-content: center;
    -ms-grid-columns: 50% 0em 50%;
    grid-template-columns: 50% 50%;
    grid-row: auto auto;
    grid-column-gap: 1em;
    grid-row-gap: 1.4em;
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

const MainSettings = ({ authDetails }) => {
    //User's auth details should be persisted, and so no need for a loader state..

    //Modal open/close state handlers:
    const [stateEditUserDetailsModal, setStateEditUserDetailsModal] = useState(
        false
    );
    const [stateEditEmailModal, setStateEditEmailModal] = useState(false);
    const [stateEditPasswordModal, setStateEditPasswordModal] = useState(false);
    const [stateSignOutModal, setStateSignOutModal] = useState(false);

    //User text input state handlers:

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [newEmail, setNewEmail] = useState('');
    const [newEmailConfirm, setNewEmailConfirm] = useState('');

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newUserName, setNewUserName] = useState('');

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

    //EditPasswordModal handlers:

    const openEditPasswordModal = () => {
        setStateEditPasswordModal(true);
    };

    const closeEditPasswordModal = () => {
        setStateEditPasswordModal(false);
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

    //Sign Out Modal handlers:

    const openSignOutModal = () => {
        setStateSignOutModal(true);
    };

    const closeSignOutModal = () => {
        setStateSignOutModal(false);
    };

    const signOutHandler = () => {
        userSignOut();
    };

    //Destructuring variables from store:
    const { firstName, lastName, userName, email } = authDetails.userLogIn.user;

    return (
        <>
            <MainContainer>
                <MainHeader>Settings Manager</MainHeader>
                <SecondarySettingsHeader>
                    Change your user preferences.
                </SecondarySettingsHeader>
                <SettingOptionsContainer>
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
                <MainHeader>Theme</MainHeader>
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
            />
            <SettingsModal
                openBoolean={stateSignOutModal}
                closeFunction={closeSignOutModal}
                ariaLabel="Modal for confirming user sign out"
                ariaDesc="Modal for confirming user sign out"
                modalHeader="Confirm Sign Out"
                modalDesc="Are you sure you want to sign out? You will have to sign back in to view your account details."
                buttonSubmitFunction={signOutHandler}
                isSignOutModal="true"
            />
        </>
    );
};

/*
Todo 2/17/2021

1. Finish creating modal (esp for user details) -- done
2. Create all text handlers
3. Backend -- Create routes for changing user settings -- test via postman
4. Create action creators for changing user Settings
5. Link all action creators
6. Create snackbars for letting user know that details have been updated.
7. Create Theme switcher using hook.

*/

const mapStateToProps = (state) => {
    return {
        authDetails: state.auth,
    };
};

export default connect(mapStateToProps)(MainSettings);
