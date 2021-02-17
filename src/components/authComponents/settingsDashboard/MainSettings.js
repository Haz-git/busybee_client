import React from 'react';

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';

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

const SettingOptionsContainer = styled.div``;

/*
    This settings page should have the following features:
    1. Change first name, last name, user name (minor changes)
    2. Change e-mail (This changes the username, so be sure to let user know about this...)
    3. Change password (Important... we should have an initial check I.E check if the user knows the current password.)
*/

const MainSettings = () => {
    return (
        <MainContainer>
            <MainHeader>Settings Manager</MainHeader>
            <SecondarySettingsHeader>
                Change your user preferences.
            </SecondarySettingsHeader>
            <SettingOptionsContainer></SettingOptionsContainer>
        </MainContainer>
    );
};

export default MainSettings;
