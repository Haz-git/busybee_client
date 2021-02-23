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

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';
import { UserDetail } from '@styled-icons/boxicons-solid/UserDetail';
import { Email } from '@styled-icons/material-outlined/Email';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

const CustomMuiAlert = withStyles(() => ({
    root: {
        padding: '.6em .8em',
        '& .MuiAlert-icon': {
            fontSize: '2.2em',
        },
        '& .MuiAlert-message': {
            fontSize: '1.4em',
            whiteSpace: 'nowrap',
        },
        '& .MuiAlert-action': {
            fontSize: '.85em',
        },
    },
    filledSuccess: {
        background: '#156711',
    },
    filledError: {
        background: '#76251F',
    },
    filledInfo: {
        background: '#083768',
    },
}))(MuiAlert);

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

//Slide transition function for MUI:

function slideTransition(props) {
    return (
        <Slide
            {...props}
            direction="down"
            timeout={{
                enter: 400,
                exit: 400,
            }}
        />
    );
}

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
            alert('Please input one value you want to change.');
        } else {
            userEditGeneralInfo(
                USER_INFO_CHANGE,
                newUserName,
                newFirstName,
                newLastName,
                showEditDetailSnackBar
            );

            setStateEditUserDetailsModal(false);
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
            userEditEmail(EMAIL_CHANGE, newEmail, showEditEmailSnackBar);

            setStateEditEmailModal(false);
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
            userEditPassword(
                PASSWORD_CHANGE,
                newPassword,
                newPasswordConfirm,
                currentPassword,
                handlePasswordError,
                showEditPasswordSnackBar
            );

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

    //Alert function for snackbars:
    const Alert = (props) => {
        return <CustomMuiAlert elevation={6} variant="filled" {...props} />;
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
                <div>
                    <ThemeToggler modeStatus={modeStatus} />
                </div>
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
            <Snackbar
                open={stateEditDetailSnackBar}
                autoHideDuration={4000}
                onClose={closeEditDetailSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="success">
                            Your User Edits Are Saved.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={stateEditEmailSnackBar}
                autoHideDuration={4000}
                onClose={closeEditEmailSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="success">
                            Your New Email Has Been Saved.
                        </Alert>
                    }
                />
            </Snackbar>
            <Snackbar
                open={stateEditPasswordSnackBar}
                autoHideDuration={4000}
                onClose={closeEditPasswordSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={slideTransition}
            >
                <SnackbarContent
                    style={{
                        boxShadow: 'none',
                        background: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    message={
                        <Alert severity="success">
                            Your Password Has Been Updated.
                        </Alert>
                    }
                />
            </Snackbar>
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
