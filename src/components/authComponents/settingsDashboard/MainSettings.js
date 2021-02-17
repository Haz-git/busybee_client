import React from 'react';
import SettingsCard from './SettingsCard';
import { userSignOut } from '../../../utils/signOutHelper';

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

const MainSettings = () => {
    return (
        <MainContainer>
            <MainHeader>Settings Manager</MainHeader>
            <SecondarySettingsHeader>
                Change your user preferences.
            </SecondarySettingsHeader>
            <SettingOptionsContainer>
                <SettingsCard
                    icon={<LogOutIcon />}
                    textLabel="Sign Out"
                    clickFunc={userSignOut}
                />
                <SettingsCard
                    icon={<UserDetailIcon />}
                    textLabel="Edit User Details"
                />
                <SettingsCard icon={<EmailIcon />} textLabel="Edit Email" />
                <SettingsCard
                    icon={<PasswordIcon />}
                    textLabel="Edit Password"
                />
            </SettingOptionsContainer>
        </MainContainer>
    );
};

export default MainSettings;
