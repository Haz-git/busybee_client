import React from 'react';

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5em 0.5em;
    /* overflow-y: scroll; */
`;

const SecondaryProgramHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 400;
    white-space: nowrap;
    margin: 0.7em 0;
`;

//Render:
const MainPrograms = () => {
    return (
        <>
            <MainContainer>
                <MainHeader>Program Manager</MainHeader>
                <SecondaryProgramHeader>
                    Design and run your lifting programs.
                </SecondaryProgramHeader>
            </MainContainer>
        </>
    );
};

export default MainPrograms;
