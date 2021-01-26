import React, { useState } from 'react';

//Components:
import SearchBar from '../statsDashboard/SearchBar';
import CreateProgramButton from './CreateProgramButton';
import CreateProgramModal from './CreateProgramModal';

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
    margin: 1em 0;
`;

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

//Render:
const MainPrograms = () => {
    //This state controls snackbars:
    const [openAddProgramSnackbar, setOpenAddProgramSnackbar] = useState(false);

    //This state controls program open/close:
    const [stateProgramAddModal, setStateProgramAddModal] = useState(false);

    //Add Program modal functions:
    const openAddProgramModal = () => {
        setStateProgramAddModal(true);
    };

    const closeAddProgramModal = () => {
        setStateProgramAddModal(false);
    };

    return (
        <>
            <CreateProgramModal
                openBoolean={stateProgramAddModal}
                closeFunction={closeAddProgramModal}
            />
            <MainContainer>
                <MainHeader>Program Manager</MainHeader>
                <SecondaryProgramHeader>
                    Design and run your lifting programs.
                </SecondaryProgramHeader>
                <SearchBarContainer>
                    <SearchBar placeholder="Total Programs" />
                    <CreateProgramButton clickFunction={openAddProgramModal} />
                </SearchBarContainer>
            </MainContainer>
        </>
    );
};

export default MainPrograms;
