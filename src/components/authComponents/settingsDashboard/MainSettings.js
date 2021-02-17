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

const MainSettings = () => {
    return (
        <MainContainer>
            <MainHeader>Settings Manager</MainHeader>
            <SecondarySettingsHeader>
                Change your user preferences.
            </SecondarySettingsHeader>
        </MainContainer>
    );
};

export default MainSettings;
